<template>
  <section
    class="story-feed"
    :class="{
      'story-feed--clickable': clickable,
      'story-feed--crisis': crisis,
    }"
    :aria-label="clickable ? '点击继续观察' : '剧情对话'"
    @click="onClick"
  >
    <div ref="scrollEl" class="story-feed__scroll">
      <div
        v-for="item in items"
        :key="item.id"
        class="story-feed__line"
        :class="`story-feed__line--${item.type}`"
      >
        <span v-if="item.speaker" class="story-feed__speaker">{{ item.speaker }}</span>
        <span v-if="item.type === 'system'" class="story-feed__mark">◈</span>
        <p class="story-feed__text">{{ item.text }}</p>
      </div>

      <p v-if="showObserveHint" class="story-feed__observe-hint">
        宿主自行行动，你在一旁观察事态发展。
        <span v-if="clickable" class="story-feed__tap">点击此处继续</span>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

export interface FeedItem {
  id: string
  type: 'scene' | 'npc' | 'host' | 'system' | 'host_inner'
  speaker?: string
  text: string
}

const props = defineProps<{
  items: FeedItem[]
  clickable?: boolean
  showObserveHint?: boolean
  crisis?: boolean
}>()

const emit = defineEmits<{
  continue: []
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

function onClick() {
  if (props.clickable) {
    emit('continue')
  }
}
</script>
