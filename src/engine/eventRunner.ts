import type {
  EventNode,
  SaveData,
  StoryChoice,
  StoryData,
} from './types'
import {
  applyEffect,
  createInitialSave,
  loadSave,
  persistSave,
} from './gameState'

export class EventRunner {
  private story: StoryData
  private save: SaveData

  constructor(story: StoryData, existingSave?: SaveData | null) {
    this.story = story
    const loaded = existingSave ?? loadSave()
    if (loaded && loaded.hostId === story.hostId) {
      this.save = loaded
    } else {
      this.save = createInitialSave(story)
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

  getAvailableChoices(): StoryChoice[] {
    const node = this.getCurrentNode()
    if (!node.choices) return []

    return node.choices.filter((choice) => this.meetsRequirements(choice.requires))
  }

  private meetsRequirements(requires?: StoryChoice['requires']): boolean {
    if (!requires) return true

    if (requires.flags) {
      for (const [key, value] of Object.entries(requires.flags)) {
        if (this.save.flags[key] !== value) return false
      }
    }

    if (requires.minTrust !== undefined && this.save.trust < requires.minTrust) {
      return false
    }

    return true
  }

  choose(choiceId: string): EventNode {
    const node = this.getCurrentNode()
    const choice = node.choices?.find((c) => c.id === choiceId)
    if (!choice) {
      throw new Error(`Choice not found: ${choiceId}`)
    }

    if (!this.meetsRequirements(choice.requires)) {
      throw new Error(`Requirements not met for choice: ${choiceId}`)
    }

    let save = applyEffect(this.save, choice.sets)
    this.save = save
    persistSave(this.save)

    return this.enterNode(choice.next)
  }

  advanceIfNoChoices(): EventNode | null {
    const node = this.getCurrentNode()
    const choices = this.getAvailableChoices()

    if (choices.length > 0) return null
    if (node.next) {
      return this.enterNode(node.next)
    }
    return node
  }

  reset(): void {
    this.save = createInitialSave(this.story)
    persistSave(this.save)
    this.enterNode(this.story.start)
  }
}
