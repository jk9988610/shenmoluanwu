<template>
  <aside
    class="inner-voice-panel"
    :class="{ 'inner-voice-panel--crisis': crisis }"
  >
    <div class="inner-voice-panel__header">
      <span class="inner-voice-panel__badge">心声</span>
      <span v-if="crisis" class="inner-voice-panel__crisis-tag">危机</span>
    </div>

  <template v-if="mode === 'awakening' && awakening">
    <p
      v-for="(line, i) in awakening.systemLines"
      :key="`s-${i}`"
      class="inner-voice-panel__system"
    >
      <span class="inner-voice-panel__mark">◈</span>{{ line }}
    </p>
    <p
      v-for="(line, i) in awakening.hostLines"
      :key="`h-${i}`"
      class="inner-voice-panel__host"
    >
      {{ line }}
    </p>
    <button type="button" class="inner-voice-panel__done" @click="emit('awakening-done')">
      继续观察
    </button>
  </template>

  <template v-else-if="mode === 'host_call' && hostCall">
    <p class="inner-voice-panel__host-call">{{ hostCall.hostText }}</p>
    <button
      v-for="response in hostCall.responses"
      :key="response.id"
      type="button"
      class="inner-voice-panel__response"
      @click="emit('host-response', response.id)"
    >
      {{ response.label }}
    </button>
  </template>
  </aside>
</template>

<script setup lang="ts">
import type { AwakeningScript, HostCall } from '../engine/types'

defineProps<{
  mode: 'awakening' | 'host_call'
  awakening?: AwakeningScript
  hostCall?: HostCall
  crisis?: boolean
}>()

const emit = defineEmits<{
  'awakening-done': []
  'host-response': [responseId: string]
}>()
</script>
