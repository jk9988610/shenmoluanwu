import type { Effect, SaveData, StoryData } from './types'
import { SAVE_KEY } from './types'

export function createInitialSave(story: StoryData): SaveData {
  return {
    version: 3,
    hostId: story.hostId,
    currentNodeId: story.start,
    flags: {},
    vars: {},
    systemAwakeningDone: false,
    phase: 'with_system',
    resolvedHostCalls: [],
    history: [],
    updatedAt: new Date().toISOString(),
  }
}

export function normalizeSave(raw: SaveData): SaveData {
  const phase = raw.phase ?? 'with_system'
  let systemAwakeningDone = raw.systemAwakeningDone ?? false

  if (
    phase === 'story_only' &&
    !systemAwakeningDone &&
    raw.currentNodeId !== 'wake_on_road'
  ) {
    systemAwakeningDone = true
  }

  return {
    ...raw,
    version: 3,
    phase: 'with_system',
    resolvedHostCalls: raw.resolvedHostCalls ?? [],
    systemAwakeningDone,
  }
}

export function applyEffect(save: SaveData, effect?: Effect): SaveData {
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

  return {
    ...save,
    flags,
    vars,
    updatedAt: new Date().toISOString(),
  }
}

export function loadSave(): SaveData | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    return normalizeSave(JSON.parse(raw) as SaveData)
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
