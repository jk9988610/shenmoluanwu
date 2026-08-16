<template>
  <div class="game-view">
    <TopBar
      :location="display.location"
      :period="display.period"
      :progress="progress"
    />
    <NarrativeView :node="node" />
    <ChoiceBar
      v-if="choices.length > 0"
      :choices="choices"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventRunner } from '../engine/eventRunner'
import TopBar from './TopBar.vue'
import NarrativeView from './NarrativeView.vue'
import ChoiceBar from './ChoiceBar.vue'

const props = defineProps<{
  runner: EventRunner
}>()

const emit = defineEmits<{
  choice: [choiceId: string]
}>()

const node = computed(() => props.runner.getCurrentNode())
const choices = computed(() => props.runner.getAvailableChoices())

const display = computed(() => {
  const d = node.value.display
  return d ?? { location: '聊斋', period: '…' }
})

const progress = computed(() => {
  const history = props.runner.getSave().history.length
  const total = 14
  return Math.min(history, total)
})

function onSelect(choiceId: string) {
  emit('choice', choiceId)
}
</script>
