<template>
  <footer
    class="dialog-box"
    :class="{
      'dialog-box--clickable': clickable,
      'dialog-box--crisis': crisis,
      'dialog-box--inner': dialog?.kind === 'inner',
    }"
    :aria-label="clickable ? '点击对话框继续' : '当前对话'"
    @click="onClick"
  >
    <div class="dialog-box__header">
      <span class="dialog-box__speaker dialog-box__speaker--left">
        {{ dialog?.leftSpeaker ?? '…' }}
      </span>
      <span class="dialog-box__speaker dialog-box__speaker--right">
        {{ dialog?.rightSpeaker ?? '…' }}
      </span>
    </div>
    <div class="dialog-box__body">
      <p v-if="dialog" class="dialog-box__text">{{ dialog.text }}</p>
      <p v-else class="dialog-box__text dialog-box__text--muted">……</p>
    </div>
    <p v-if="clickable && hint" class="dialog-box__hint">{{ hint }}</p>
  </footer>
</template>

<script setup lang="ts">
import type { DialogState } from '../composables/storyPresentationTypes'

const props = defineProps<{
  dialog: DialogState | null
  clickable?: boolean
  crisis?: boolean
  hint?: string
}>()

const emit = defineEmits<{
  continue: []
}>()

function onClick() {
  if (props.clickable) {
    emit('continue')
  }
}
</script>
