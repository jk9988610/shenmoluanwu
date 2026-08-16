<template>
  <div class="choice-modal-backdrop" @click.self="() => {}">
    <div
      class="choice-modal"
      :class="{ 'choice-modal--crisis': crisis }"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
    >
      <header v-if="title" class="choice-modal__header">
        <span v-if="crisis" class="choice-modal__crisis-tag">危机</span>
        <h2 class="choice-modal__title">{{ title }}</h2>
      </header>
      <div class="choice-modal__options">
        <button
          v-for="opt in options"
          :key="opt.id"
          type="button"
          class="choice-modal__btn"
          @click="emit('select', opt.id)"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ModalOption {
  id: string
  label: string
}

defineProps<{
  options: ModalOption[]
  title?: string
  crisis?: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>
