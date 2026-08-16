<template>
  <section class="narrative-view" aria-live="polite">
    <p
      v-for="(line, index) in node.narrative"
      :key="`n-${index}`"
      class="narrative-view__para"
    >
      {{ line }}
    </p>

    <div
      v-for="(line, index) in node.dialogue ?? []"
      :key="`d-${index}`"
      class="dialogue"
      :class="`dialogue--${line.side}`"
    >
      <span class="dialogue__speaker">{{ line.speaker }}</span>
      <p class="dialogue__text">{{ line.text }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EventNode } from '../engine/types'

defineProps<{
  node: EventNode
}>()
</script>
