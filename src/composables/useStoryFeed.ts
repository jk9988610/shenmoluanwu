import { ref, watch } from 'vue'
import type { FeedItem } from '../components/StoryFeed.vue'
import type { EventRunner } from '../engine/eventRunner'
import type { HostCallResponse } from '../engine/types'

export function useStoryFeed(runner: () => EventRunner) {
  const feedItems = ref<FeedItem[]>([])
  const appendedKeys = new Set<string>()
  let itemCounter = 0

  function uid(prefix: string) {
    itemCounter += 1
    return `${prefix}-${itemCounter}`
  }

  function push(item: Omit<FeedItem, 'id'>) {
    feedItems.value.push({ ...item, id: uid(item.type) })
  }

  function clear() {
    feedItems.value = []
    appendedKeys.clear()
    itemCounter = 0
  }

  function appendNodeBase() {
    const r = runner()
    const node = r.getCurrentNode()
    const key = `base:${node.id}`
    if (appendedKeys.has(key)) return
    appendedKeys.add(key)

    for (const text of node.narrative) {
      push({ type: 'scene', text })
    }

    for (const line of node.dialogue ?? []) {
      push({
        type: line.side === 'host' ? 'host' : 'npc',
        speaker: line.speaker,
        text: line.text,
      })
    }
  }

  function appendAwakening() {
    const r = runner()
    if (!r.needsAwakening()) return
    const node = r.getCurrentNode()
    const script = node.awakeningScript
    if (!script) return
    const key = `awake:${node.id}`
    if (appendedKeys.has(key)) return
    appendedKeys.add(key)

    for (const text of script.systemLines) {
      push({ type: 'system', speaker: '系统', text })
    }
    for (const text of script.hostLines) {
      push({ type: 'host_inner', speaker: '宁采臣', text })
    }
  }

  function appendHostCall() {
    const r = runner()
    if (!r.needsHostCall()) return
    const node = r.getCurrentNode()
    const call = node.hostCall
    if (!call) return
    const key = `call:${node.id}`
    if (appendedKeys.has(key)) return
    appendedKeys.add(key)

    push({ type: 'host_inner', speaker: '宁采臣', text: call.hostText })
  }

  function appendHostResponse(response: HostCallResponse) {
    push({ type: 'system', speaker: '系统', text: response.systemText })
    if (response.hostReply) {
      push({ type: 'host_inner', speaker: '宁采臣', text: response.hostReply })
    }
  }

  function sync() {
    appendNodeBase()
    appendAwakening()
    appendHostCall()
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
    feedItems,
    clear,
    appendHostResponse,
    sync,
  }
}
