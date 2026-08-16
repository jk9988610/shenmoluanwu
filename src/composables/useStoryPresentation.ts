import { ref, watch } from 'vue'
import type {
  DialogBeat,
  DialogState,
  HistoryItem,
} from './storyPresentationTypes'
import type { EventRunner } from '../engine/eventRunner'
import type { HostCallResponse } from '../engine/types'

export function useStoryPresentation(runner: () => EventRunner) {
  const historyItems = ref<HistoryItem[]>([])
  const dialog = ref<DialogState | null>(null)
  const pendingQueue = ref<DialogBeat[]>([])
  const appendedKeys = new Set<string>()
  let itemCounter = 0

  function uid(prefix: string) {
    itemCounter += 1
    return `${prefix}-${itemCounter}`
  }

  function pushHistory(item: Omit<HistoryItem, 'id'>) {
    historyItems.value.push({ ...item, id: uid(item.type) })
  }

  function clear() {
    historyItems.value = []
    pendingQueue.value = []
    dialog.value = null
    appendedKeys.clear()
    itemCounter = 0
  }

  function archiveDialog(state: DialogState) {
    if (state.kind === 'observe') return
    const type = state.archiveType ?? 'scene'
    pushHistory({
      type,
      speaker: state.archiveSpeaker ?? state.leftSpeaker,
      text: state.text,
    })
  }

  function buildAwakeningBeats(): DialogBeat[] {
    const r = runner()
    if (!r.needsAwakening()) return []
    const script = r.getCurrentNode().awakeningScript
    if (!script) return []

    const beats: DialogBeat[] = []
    for (const text of script.systemLines) {
      beats.push({
        leftSpeaker: '系统',
        rightSpeaker: '宁采臣',
        text,
        kind: 'inner',
        archiveType: 'system',
        archiveSpeaker: '系统',
      })
    }
    for (const text of script.hostLines) {
      beats.push({
        leftSpeaker: '宁采臣',
        rightSpeaker: '系统',
        text,
        kind: 'inner',
        archiveType: 'host_inner',
        archiveSpeaker: '宁采臣',
      })
    }
    return beats
  }

  function buildDialogueBeats(): DialogBeat[] {
    const node = runner().getCurrentNode()
    const beats: DialogBeat[] = []

    for (const line of node.dialogue ?? []) {
      if (line.side === 'host') {
        beats.push({
          leftSpeaker: '宁采臣',
          rightSpeaker: line.speaker === '宁采臣' ? '…' : '旁人',
          text: line.text,
          kind: 'dialogue',
          archiveType: 'host',
          archiveSpeaker: '宁采臣',
        })
      } else {
        beats.push({
          leftSpeaker: line.speaker,
          rightSpeaker: '宁采臣',
          text: line.text,
          kind: 'dialogue',
          archiveType: 'npc',
          archiveSpeaker: line.speaker,
        })
      }
    }
    return beats
  }

  function showObservePrompt() {
    dialog.value = {
      leftSpeaker: '宁采臣',
      rightSpeaker: '系统',
      text: '宿主自行行动，你在一旁观察事态发展。',
      kind: 'observe',
    }
  }

  function showHostCallDialog() {
    const call = runner().getCurrentNode().hostCall
    if (!call) return
    dialog.value = {
      leftSpeaker: '宁采臣',
      rightSpeaker: '系统',
      text: call.hostText,
      kind: 'inner',
      archiveType: 'host_inner',
      archiveSpeaker: '宁采臣',
    }
  }

  function popQueueToDialog() {
    if (pendingQueue.value.length > 0) {
      const beat = pendingQueue.value.shift()!
      dialog.value = {
        leftSpeaker: beat.leftSpeaker,
        rightSpeaker: beat.rightSpeaker,
        text: beat.text,
        kind: beat.kind,
        archiveType: beat.archiveType,
        archiveSpeaker: beat.archiveSpeaker,
      }
      return true
    }
    return false
  }

  function prepareNode() {
    const r = runner()
    const node = r.getCurrentNode()
    const key = `node:${node.id}`
    if (appendedKeys.has(key)) return
    appendedKeys.add(key)

    for (const text of node.narrative) {
      pushHistory({ type: 'scene', text })
    }

    pendingQueue.value = [
      ...buildAwakeningBeats(),
      ...buildDialogueBeats(),
    ]

    if (popQueueToDialog()) return

    if (r.needsHostCall()) {
      showHostCallDialog()
      return
    }

    if (r.canContinue() && r.isObserving()) {
      showObservePrompt()
    }
  }

  function sync() {
    prepareNode()
  }

  function advanceDialog() {
    const r = runner()

    if (dialog.value) {
      archiveDialog(dialog.value)
    }

    if (popQueueToDialog()) return

    if (r.needsAwakening()) {
      r.completeAwakening()
      prepareNodeAfterAwakening()
      return
    }

    if (r.needsHostCall()) {
      showHostCallDialog()
      return
    }

    if (r.canContinue() && r.isObserving()) {
      r.continue()
      return
    }
  }

  function prepareNodeAfterAwakening() {
    const r = runner()
    const nodeId = r.getCurrentNode().id
    const key = `node:${nodeId}`
    if (!appendedKeys.has(key)) {
      prepareNode()
      return
    }
    pendingQueue.value = buildDialogueBeats()
    if (popQueueToDialog()) return
    if (r.needsHostCall()) {
      showHostCallDialog()
      return
    }
    if (r.canContinue() && r.isObserving()) {
      showObservePrompt()
    }
  }

  function appendHostResponse(response: HostCallResponse) {
    if (dialog.value?.kind === 'inner') {
      pushHistory({
        type: 'host_inner',
        speaker: '宁采臣',
        text: dialog.value.text,
      })
    }
    pushHistory({
      type: 'system',
      speaker: '系统',
      text: response.systemText,
    })
    if (response.hostReply) {
      pushHistory({
        type: 'host_inner',
        speaker: '宁采臣',
        text: response.hostReply,
      })
    }
    dialog.value = null
  }

  watch(
    () => {
      const save = runner().getSave()
      return [
        save.currentNodeId,
        save.resolvedHostCalls.length,
        save.systemAwakeningDone,
      ]
    },
    () => sync(),
    { immediate: true }
  )

  return {
    historyItems,
    dialog,
    clear,
    advanceDialog,
    appendHostResponse,
    showHostCallDialog,
    showObservePrompt,
  }
}
