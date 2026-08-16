<template>
  <header class="top-bar">
    <div class="top-bar__brand">
      <span class="top-bar__system-mark">◈</span>
      <span class="top-bar__system-name">系统</span>
      <span class="top-bar__divider">|</span>
      <span class="top-bar__location">{{ location }}</span>
      <span class="top-bar__dot">·</span>
      <span class="top-bar__period">{{ period }}</span>
    </div>
    <div class="top-bar__actions">
      <button
        v-if="showSystemUi"
        type="button"
        class="top-bar__info-btn"
        @click="emit('open-drawer')"
      >
        天机
      </button>
      <div class="top-bar__progress" aria-label="进度">
        <span
          v-for="i in totalSteps"
          :key="i"
          class="top-bar__dot-item"
          :class="{ active: i <= progress }"
        />
      </div>
      <FullscreenButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import FullscreenButton from './FullscreenButton.vue'

withDefaults(
  defineProps<{
    location: string
    period: string
    progress?: number
    showSystemUi?: boolean
  }>(),
  { progress: 0, showSystemUi: true }
)

const emit = defineEmits<{
  'open-drawer': []
}>()

const totalSteps = 14
</script>
