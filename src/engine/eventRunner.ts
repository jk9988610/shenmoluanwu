import type {
  EventNode,
  HostCallResponse,
  SaveData,
  StoryChoice,
  StoryData,
} from './types'
import {
  applyEffect,
  createInitialSave,
  loadSave,
  normalizeSave,
  persistSave,
} from './gameState'

export class EventRunner {
  private story: StoryData
  private save: SaveData

  constructor(story: StoryData, existingSave?: SaveData | null) {
    this.story = story
    const loaded = existingSave ?? loadSave()
    if (
      loaded &&
      loaded.hostId === story.hostId &&
      story.events[loaded.currentNodeId]
    ) {
      this.save = normalizeSave(loaded)
    } else {
      this.save = createInitialSave(story)
      this.enterNode(story.start)
    }
  }

  getSave(): SaveData {
    return this.save
  }

  getCurrentNode(): EventNode {
    const node = this.story.events[this.save.currentNodeId]
    if (!node) {
      throw new Error(`Unknown node: ${this.save.currentNodeId}`)
    }
    return node
  }

  isEnding(): boolean {
    return Boolean(this.getCurrentNode().ending)
  }

  needsAwakening(): boolean {
    const node = this.getCurrentNode()
    return Boolean(
      node.systemAwakening &&
        node.awakeningScript &&
        !this.save.systemAwakeningDone
    )
  }

  needsHostCall(): boolean {
    const node = this.getCurrentNode()
    if (!node.hostCall) return false
    return !this.save.resolvedHostCalls.includes(node.id)
  }

  isObserving(): boolean {
    return this.canShowStoryActions() && !this.needsHostCall()
  }

  canShowStoryActions(): boolean {
    return !this.needsAwakening() && !this.needsHostCall()
  }

  completeAwakening(): EventNode {
    const node = this.getCurrentNode()
    const script = node.awakeningScript
    if (!script) {
      throw new Error('No awakening script on current node')
    }

    this.save = {
      ...this.save,
      systemAwakeningDone: true,
      phase: 'with_system',
      updatedAt: new Date().toISOString(),
    }
    persistSave(this.save)

    if (script.next) {
      return this.enterNode(script.next)
    }
    return node
  }

  resolveHostCall(responseId: string): EventNode {
    const node = this.getCurrentNode()
    const hostCall = node.hostCall
    if (!hostCall) {
      throw new Error('No host call on current node')
    }

    const response = hostCall.responses.find((r) => r.id === responseId)
    if (!response) {
      throw new Error(`Host call response not found: ${responseId}`)
    }

    let save = applyEffect(this.save, response.effects)

    save = {
      ...save,
      resolvedHostCalls: [...save.resolvedHostCalls, node.id],
      updatedAt: new Date().toISOString(),
    }

    this.save = save
    persistSave(this.save)

    if (response.next) {
      return this.enterNode(response.next)
    }

    return node
  }

  enterNode(nodeId: string): EventNode {
    const node = this.story.events[nodeId]
    if (!node) {
      throw new Error(`Unknown node: ${nodeId}`)
    }

    let save = {
      ...this.save,
      currentNodeId: nodeId,
      history: [...this.save.history, nodeId],
      updatedAt: new Date().toISOString(),
    }

    if (node.onEnter) {
      save = applyEffect(save, node.onEnter)
    }

    this.save = save
    persistSave(this.save)
    return node
  }

  canContinue(): boolean {
    if (!this.canShowStoryActions()) return false

    const node = this.getCurrentNode()
    return Boolean(node.next) && !node.ending
  }

  continue(): EventNode {
    const node = this.getCurrentNode()
    if (!node.next) {
      throw new Error(`Node has no next: ${node.id}`)
    }
    return this.enterNode(node.next)
  }

  reset(): void {
    this.save = createInitialSave(this.story)
    persistSave(this.save)
    this.enterNode(this.story.start)
  }
}

// Keep for potential tooling; player no longer selects story choices
export type { StoryChoice, HostCallResponse }
