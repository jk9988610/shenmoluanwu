<template>
  <div class="game-view">
    <TopBar
      :location="display.location"
      :period="display.period"
      :progress="progress"
      :mode-label="topBarMode"
      :show-system-ui="systemAwakeningDone"
      @open-drawer="drawerOpen = true"
    />
    <div class="game-main" :class="{ 'game-main--with-host': systemAwakeningDone }">
      <HostPanel
        v-if="systemAwakeningDone"
        :goal="goal"
        :is-observing="isObserving"
        :is-host-call="needsHostCall"
      />
      <StoryFeed
        :items="feedItems"
        :clickable="feedClickable"
        :show-observe-hint="showObserveHint"
        :crisis="node.crisis && needsHostCall"
        @continue="onFeedContinue"
      />
    </div>

    <ChoiceModal
      v-if="showModal"
      :options="modalOptions"
      :title="modalTitle"
      :crisis="node.crisis"
      @select="onModalSelect"
    />

    <TianjiDrawer
      :open="drawerOpen"
      :tianji-hints="tianjiHints"
      :timeline="timelineNodes"
      :profile="profileInfo"
      :goal="goal"
      @close="drawerOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { EventRunner } from '../engine/eventRunner'
import { useStoryFeed } from '../composables/useStoryFeed'
import TopBar from './TopBar.vue'
import StoryFeed from './StoryFeed.vue'
import ChoiceModal from './ChoiceModal.vue'
import HostPanel from './HostPanel.vue'
import TianjiDrawer from './TianjiDrawer.vue'
import profile from '../data/hosts/ning_caichen/profile.json'
import timelineData from '../data/hosts/ning_caichen/timeline.json'

const props = defineProps<{
  runner: EventRunner
}>()

const drawerOpen = ref(false)
const { feedItems, clear, appendHostResponse } = useStoryFeed(() => props.runner)

const node = computed(() => props.runner.getCurrentNode())
const canContinue = computed(() => props.runner.canContinue())
const isObserving = computed(() => props.runner.isObserving())
const systemAwakeningDone = computed(
  () => props.runner.getSave().systemAwakeningDone
)

const needsAwakening = computed(() => props.runner.needsAwakening())
const needsHostCall = computed(() => props.runner.needsHostCall())

const showModal = computed(() => needsHostCall.value && Boolean(node.value.hostCall))

const modalOptions = computed(() => {
  const call = node.value.hostCall
  if (!call) return []
  return call.responses.map((r) => ({ id: r.id, label: r.label }))
})

const modalTitle = computed(() =>
  node.value.crisis ? '宿主遭遇危机，你如何相助？' : '宿主向你求助'
)

const showObserveHint = computed(
  () =>
    isObserving.value &&
    !needsHostCall.value &&
    !needsAwakening.value
)

const feedClickable = computed(() => {
  if (showModal.value) return false
  if (needsAwakening.value) return true
  return canContinue.value && isObserving.value
})

const topBarMode = computed(() => {
  if (needsHostCall.value) return '回应宿主'
  if (isObserving.value) return '观察'
  return ''
})

const display = computed(() => {
  const d = node.value.display
  return d ?? { location: '聊斋', period: '…' }
})

const progress = computed(() => {
  const history = props.runner.getSave().history.length
  return Math.min(history, 16)
})

const goal = computed(() => timelineData.goal)
const timelineNodes = computed(() => timelineData.nodes)

const profileInfo = computed(() => ({
  name: profile.name,
  role: profile.role,
  era: profile.era,
  tags: profile.tags,
}))

const tianjiHints = computed(() => {
  const hints: string[] = []
  const current = node.value.tianji
  if (current?.show && current.hints) {
    hints.push(...current.hints)
  }
  if (hints.length === 0) {
    hints.push('寺中夜雨，不宜久留。')
    hints.push('拒金不受，可避夜叉之祸。')
  }
  return hints
})

function onFeedContinue() {
  if (needsAwakening.value) {
    props.runner.completeAwakening()
    return
  }
  if (canContinue.value) {
    props.runner.continue()
  }
}

function onModalSelect(responseId: string) {
  const call = node.value.hostCall
  const response = call?.responses.find((r) => r.id === responseId)
  if (response) {
    appendHostResponse(response)
  }
  props.runner.resolveHostCall(responseId)
}
</script>
