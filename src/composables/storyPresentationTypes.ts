export interface HistoryItem {
  id: string
  type: 'scene' | 'npc' | 'host' | 'system' | 'host_inner'
  speaker?: string
  text: string
}

export interface DialogState {
  leftSpeaker: string
  rightSpeaker: string
  text: string
  kind: 'scene' | 'dialogue' | 'inner' | 'observe'
  archiveType?: HistoryItem['type']
  archiveSpeaker?: string
}

export interface DialogBeat {
  leftSpeaker: string
  rightSpeaker: string
  text: string
  kind: DialogState['kind']
  archiveType: HistoryItem['type']
  archiveSpeaker?: string
}
