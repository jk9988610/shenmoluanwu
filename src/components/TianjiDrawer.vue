<template>
  <div v-if="open" class="drawer-backdrop" @click="emit('close')" />
  <aside class="tianji-drawer" :class="{ open }">
    <header class="tianji-drawer__header">
      <div class="tianji-drawer__tabs">
        <button
          type="button"
          :class="{ active: tab === 'tianji' }"
          @click="tab = 'tianji'"
        >
          天机
        </button>
        <button
          type="button"
          :class="{ active: tab === 'timeline' }"
          @click="tab = 'timeline'"
        >
          轨迹
        </button>
        <button
          type="button"
          :class="{ active: tab === 'profile' }"
          @click="tab = 'profile'"
        >
          档案
        </button>
      </div>
      <button type="button" class="tianji-drawer__close" aria-label="关闭" @click="emit('close')">
        ×
      </button>
    </header>

    <div class="tianji-drawer__body">
      <ul v-if="tab === 'tianji'" class="tianji-drawer__list">
        <li v-for="(hint, i) in tianjiHints" :key="i">{{ hint }}</li>
        <li v-if="tianjiHints.length === 0" class="tianji-drawer__empty">暂无天机预览</li>
      </ul>

      <ul v-else-if="tab === 'timeline'" class="tianji-drawer__timeline">
        <li v-for="node in timeline" :key="node.id">
          <span class="tianji-drawer__timeline-dot" />
          {{ node.label }}
        </li>
      </ul>

      <div v-else class="tianji-drawer__profile">
        <p><strong>姓名</strong> {{ profile.name }}</p>
        <p><strong>身份</strong> {{ profile.role }}</p>
        <p><strong>时代</strong> {{ profile.era }}</p>
        <p><strong>标签</strong> {{ profile.tags.join(' · ') }}</p>
        <p><strong>终局目标</strong> {{ goal }}</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimelineNode {
  id: string
  label: string
}

interface ProfileInfo {
  name: string
  role: string
  era: string
  tags: string[]
}

defineProps<{
  open: boolean
  tianjiHints: string[]
  timeline: TimelineNode[]
  profile: ProfileInfo
  goal: string
}>()

const emit = defineEmits<{
  close: []
}>()

const tab = ref<'tianji' | 'timeline' | 'profile'>('tianji')
</script>
