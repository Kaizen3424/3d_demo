import { useCallback, useEffect, useState } from 'react'

const MODEL_VIEWER_SRC =
  'https://ajax.googleapis.com/ajax/libs/model-viewer/4.2.0/model-viewer.min.js'

let scriptPromise: Promise<void> | null = null

function ensureScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    if (typeof customElements !== 'undefined' && customElements.get('model-viewer')) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.type = 'module'
    script.src = MODEL_VIEWER_SRC
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Failed to load model-viewer'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

export function useModelViewerScript() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    ensureScript()
      .then(() => {
        if (!cancelled) setReady(true)
      })
      .catch(() => {
        if (!cancelled) setReady(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const reload = useCallback(() => {
    scriptPromise = null
    setReady(false)
    ensureScript()
      .then(() => setReady(true))
      .catch(() => setReady(false))
  }, [])

  return { ready, reload }
}
