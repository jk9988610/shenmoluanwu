<template>
  <button
    v-if="supported"
    type="button"
    class="fullscreen-btn"
    :aria-label="isFullscreen ? '退出全屏' : '全屏'"
    :title="isFullscreen ? '退出全屏' : '全屏'"
    @click="toggleFullscreen"
  >
    <svg
      v-if="!isFullscreen"
      class="fullscreen-btn__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <svg
      v-else
      class="fullscreen-btn__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M9 4H4v5M20 15h-5v5M15 4h5v5M4 15v5h5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="fullscreen-btn__text">
      {{ isFullscreen ? '退出全屏' : '全屏' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useFullscreen } from '../composables/useFullscreen'

const { isFullscreen, supported, toggleFullscreen } = useFullscreen()
</script>
