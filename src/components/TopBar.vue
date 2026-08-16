<template>
  <header class="top-bar">
    <div class="top-bar__place">
      <span class="top-bar__location">{{ location }}</span>
      <span class="top-bar__dot">·</span>
      <span class="top-bar__period">{{ period }}</span>
    </div>
    <div class="top-bar__progress" aria-label="进度">
      <span
        v-for="i in totalSteps"
        :key="i"
        class="top-bar__dot-item"
        :class="{ active: i <= progress }"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    location: string
    period: string
    progress?: number
  }>(),
  { progress: 0 }
)

const totalSteps = 14
</script>
