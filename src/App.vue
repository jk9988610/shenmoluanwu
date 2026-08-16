<template>
  <RotateHint />
  <div class="app-shell">
    <EndingScreen
      v-if="runner && runner.isEnding()"
      :node="runner.getCurrentNode()"
      @restart="restart"
    />
    <GameView v-else-if="runner" :runner="runner" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { EventRunner } from './engine/eventRunner'
import { ningCaichenStory } from './data/hosts/ning_caichen/story'
import GameView from './components/GameView.vue'
import EndingScreen from './components/EndingScreen.vue'
import RotateHint from './components/RotateHint.vue'
import { clearSave } from './engine/gameState'

const runner = ref<EventRunner | null>(null)

onMounted(() => {
  runner.value = new EventRunner(ningCaichenStory)
})

function restart() {
  clearSave()
  runner.value = new EventRunner(ningCaichenStory)
}
</script>
