export interface Effect {
  flags?: Record<string, boolean>
  trust?: number
  vars?: Record<string, number>
}

export interface ChoiceRequires {
  flags?: Record<string, boolean>
  minTrust?: number
}

export interface StoryChoice {
  id: string
  label: string
  next: string
  requires?: ChoiceRequires
  sets?: Effect
}

export interface DialogueLine {
  speaker: string
  text: string
  side: 'npc' | 'host'
}

export interface HostCallResponse {
  id: string
  label: string
  systemText: string
  hostReply?: string
  effects?: Effect
  unlockChoices?: string[]
}

export interface HostCall {
  trigger: 'auto' | 'manual'
  hostText: string
  responses: HostCallResponse[]
}

export interface Tianji {
  show: boolean
  hints: string[]
}

export interface AwakeningScript {
  systemLines: string[]
  hostLines: string[]
  next: string
}

export interface NodeDisplay {
  location: string
  period: string
}

export interface EventNode {
  id: string
  narrative: string[]
  dialogue?: DialogueLine[]
  choices?: StoryChoice[]
  next?: string
  systemAwakening?: boolean
  awakeningScript?: AwakeningScript
  hostCall?: HostCall | null
  crisis?: boolean
  tianji?: Tianji | null
  onEnter?: Effect
  notes?: string
  display?: NodeDisplay
  ending?: {
    id: string
    title: string
    summary: string[]
  }
}

export interface StoryData {
  hostId: string
  version: number
  start: string
  events: Record<string, EventNode>
}

export interface SaveData {
  version: number
  hostId: string
  currentNodeId: string
  flags: Record<string, boolean>
  vars: Record<string, number>
  trust: number
  systemAwakeningDone: boolean
  phase: 'story_only' | 'with_system'
  resolvedHostCalls: string[]
  history: string[]
  updatedAt: string
}

export const SAVE_KEY = 'liaozhai_system_save_v1'
