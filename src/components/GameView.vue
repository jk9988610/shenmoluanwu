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
    <div
      class="game-main"
      :class="{
        'game-main--with-voice': showInnerVoice,
        'game-main--with-host': systemAwakeningDone,
      }"
    >
      <HostPanel
        v-if="systemAwakeningDone"
        :goal="goal"
        :is-observing="isObserving"
        :is-host-call="needsHostCall"
      />
      <div class="game-center">
        <NarrativeView :node="node" />
      </div>
      <InnerVoicePanel
        v-if="showInnerVoice"
        :mode="innerVoiceMode"
        :awakening="node.awakeningScript"
        :host-call="node.hostCall"
        :crisis="node.crisis"
        @awakening-done="onAwakeningDone"
        @host-response="onHostResponse"
      />
    </div>
    <ObserveBar v-if="canContinue && isObserving" @continue="onContinue" />
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
import TopBar from './TopBar.vue'
import NarrativeView from './NarrativeView.vue'
import ObserveBar from './ObserveBar.vue'
import HostPanel from './HostPanel.vue'
import InnerVoicePanel from './InnerVoicePanel.vue'
import TianjiDrawer from './TianjiDrawer.vue'
import profile from '../data/hosts/ning_caichen/profile.json'
import timelineData from '../data/hosts/ning_caichen/timeline.json'

const props = defineProps<{
  runner: EventRunner
}>()

const drawerOpen = ref(false)

const node = computed(() => props.runner.getCurrentNode())
const canContinue = computed(() => props.runner.canContinue())
const isObserving = computed(() => props.runner.isObserving())
const systemAwakeningDone = computed(
  () => props.runner.getSave().systemAwakeningDone
)

const needsAwakening = computed(() => props.runner.needsAwakening())
const needsHostCall = computed(() => props.runner.needsHostCall())
const showInnerVoice = computed(
  () => needsAwakening.value || needsHostCall.value
)

const innerVoiceMode = computed(() =>
  needsAwakening.value ? 'awakening' : 'host_call'
)

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

function onContinue() {
  props.runner.continue()
}

function onAwakeningDone() {
  props.runner.completeAwakening()
}

function onHostResponse(responseId: string) {
  props.runner.resolveHostCall(responseId)
}
</script>
