<template>
  <footer class="observe-bar">
    <p class="observe-bar__hint">宿主自行行动，你在一旁观察事态发展。</p>
    <button type="button" class="observe-bar__btn" @click="emit('continue')">
      继续观察
    </button>
  </footer>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  continue: []
}>()
</script>
