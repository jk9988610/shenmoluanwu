<template>
  <aside class="host-panel">
    <div class="host-panel__name">宁采臣</div>
    <div class="host-panel__role">赴考书生 · 宿主</div>
    <div class="host-panel__mode" :class="{ 'host-panel__mode--active': isActive }">
      <span class="host-panel__mode-dot" />
      {{ modeLabel }}
    </div>
    <div class="host-panel__goal">
      <span class="host-panel__goal-label">系统目标</span>
      <p class="host-panel__goal-text">{{ goal }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  goal: string
  isObserving: boolean
  isHostCall: boolean
}>()

const isActive = computed(() => props.isHostCall)

const modeLabel = computed(() => {
  if (props.isHostCall) return '宿主求助'
  return '观察中'
})
</script>
