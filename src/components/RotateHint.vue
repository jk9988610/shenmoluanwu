<template>
  <div
    v-if="showPortraitHint"
    class="rotate-hint"
    role="dialog"
    aria-label="请旋转设备"
  >
    <div class="rotate-hint__box">
      <div class="rotate-hint__icon" aria-hidden="true">↻</div>
      <p>请将设备旋转至横屏以获得最佳体验</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const showPortraitHint = ref(false)

function checkOrientation() {
  const portrait =
    window.matchMedia('(orientation: portrait)').matches &&
    window.innerHeight > window.innerWidth
  showPortraitHint.value = portrait
}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
})
</script>
