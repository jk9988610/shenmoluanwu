import { onMounted, onUnmounted, ref } from 'vue'

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void>
  webkitFullscreenEnabled?: boolean
}

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void>
}

function getFullscreenElement(): Element | null {
  const doc = document as FullscreenDocument
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

function isFullscreenSupported(): boolean {
  const doc = document as FullscreenDocument
  return Boolean(doc.fullscreenEnabled ?? doc.webkitFullscreenEnabled)
}

export function useFullscreen() {
  const isFullscreen = ref(false)
  const supported = isFullscreenSupported()

  function syncState() {
    isFullscreen.value = getFullscreenElement() !== null
    document.documentElement.classList.toggle('is-fullscreen', isFullscreen.value)
  }

  async function enterFullscreen() {
    const el = document.documentElement as FullscreenElement
    if (el.requestFullscreen) {
      await el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
      await el.webkitRequestFullscreen()
    }
  }

  async function exitFullscreen() {
    const doc = document as FullscreenDocument
    if (doc.exitFullscreen) {
      await doc.exitFullscreen()
    } else if (doc.webkitExitFullscreen) {
      await doc.webkitExitFullscreen()
    }
  }

  async function toggleFullscreen() {
    if (!supported) return
    try {
      if (getFullscreenElement()) {
        await exitFullscreen()
      } else {
        await enterFullscreen()
      }
    } catch {
      // User denied or browser blocked fullscreen
    }
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', syncState)
    document.addEventListener('webkitfullscreenchange', syncState)
    syncState()
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', syncState)
    document.removeEventListener('webkitfullscreenchange', syncState)
    syncState()
  })

  return {
    isFullscreen,
    supported,
    toggleFullscreen,
  }
}
