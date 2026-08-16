import type { Effect, SaveData, StoryData } from './types'
import { SAVE_KEY } from './types'

export function createInitialSave(story: StoryData): SaveData {
  return {
    version: 1,
    hostId: story.hostId,
    currentNodeId: story.start,
    flags: {},
    vars: {},
    trust: 0,
    systemAwakeningDone: false,
    phase: 'story_only',
    history: [],
    updatedAt: new Date().toISOString(),
  }
}

export function applyEffect(
  save: SaveData,
  effect?: Effect
): SaveData {
  if (!effect) return save

  const flags = { ...save.flags }
  if (effect.flags) {
    for (const [k, v] of Object.entries(effect.flags)) {
      flags[k] = v
    }
  }

  const vars = { ...save.vars }
  if (effect.vars) {
    for (const [k, v] of Object.entries(effect.vars)) {
      vars[k] = v
    }
  }

  const trust = save.trust + (effect.trust ?? 0)

  return {
    ...save,
    flags,
    vars,
    trust,
    updatedAt: new Date().toISOString(),
  }
}

export function loadSave(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SaveData
  } catch {
    return null
  }
}

export function persistSave(save: SaveData): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save))
}

export function clearSave(): void {
  localStorage.removeItem(SAVE_KEY)
}
