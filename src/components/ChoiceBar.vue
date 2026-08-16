<template>
  <footer class="choice-bar">
    <button
      v-for="choice in choices"
      :key="choice.id"
      type="button"
      class="choice-bar__btn"
      @click="emit('select', choice.id)"
    >
      {{ choice.label }}
    </button>
  </footer>
</template>

<script setup lang="ts">
import type { StoryChoice } from '../engine/types'

defineProps<{
  choices: StoryChoice[]
}>()

const emit = defineEmits<{
  select: [choiceId: string]
}>()
</script>
