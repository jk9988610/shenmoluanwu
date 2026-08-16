<template>
  <section class="ending-screen">
    <header class="ending-screen__top">
      <FullscreenButton />
    </header>
    <div class="ending-screen__card">
      <h1 class="ending-screen__title">{{ ending?.title }}</h1>
      <p
        v-for="(line, i) in node.narrative"
        :key="`n-${i}`"
        class="ending-screen__para"
      >
        {{ line }}
      </p>
      <ul v-if="ending?.summary" class="ending-screen__summary">
        <li v-for="(s, i) in ending.summary" :key="`s-${i}`">{{ s }}</li>
      </ul>
      <button type="button" class="ending-screen__btn" @click="emit('restart')">
        重新开始
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EventNode } from '../engine/types'
import FullscreenButton from './FullscreenButton.vue'

const props = defineProps<{
  node: EventNode
}>()

const emit = defineEmits<{
  restart: []
}>()

const ending = computed(() => props.node.ending)
</script>
