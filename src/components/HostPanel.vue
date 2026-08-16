<template>
  <aside class="host-panel">
    <div class="host-panel__name">宁采臣</div>
    <div class="host-panel__role">赴考书生</div>
    <div class="host-panel__trust">
      <span class="host-panel__trust-label">信任</span>
      <span class="host-panel__trust-dots" aria-label="信任度">
        <span
          v-for="i in 5"
          :key="i"
          class="host-panel__trust-dot"
          :class="{ active: i <= trustLevel }"
        />
      </span>
    </div>
    <div class="host-panel__goal">
      <span class="host-panel__goal-label">目标</span>
      <p class="host-panel__goal-text">{{ goal }}</p>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  trust: number
  goal: string
}>()

const trustLevel = computed(() => Math.min(5, Math.max(0, props.trust)))
</script>
