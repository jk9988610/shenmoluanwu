<template>
  <section class="observe-area" aria-label="观察记录">
    <div ref="scrollEl" class="observe-area__scroll">
      <p v-if="items.length === 0" class="observe-area__empty">
        场面与对话记录将显示于此。
      </p>
      <div
        v-for="item in items"
        :key="item.id"
        class="observe-area__item"
        :class="`observe-area__item--${item.type}`"
      >
        <span v-if="item.speaker && item.type !== 'scene'" class="observe-area__speaker">
          {{ item.speaker }}
        </span>
        <p class="observe-area__text">{{ item.text }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { HistoryItem } from '../composables/storyPresentationTypes'

const props = defineProps<{
  items: HistoryItem[]
}>()

const scrollEl = ref<HTMLElement | null>(null)

watch(
  () => props.items.length,
  async () => {
    await nextTick()
    if (scrollEl.value) {
      scrollEl.value.scrollTop = scrollEl.value.scrollHeight
    }
  }
)
</script>
