import { Box, Compass, Maximize2, Rotate3D, RotateCcw, Sparkles } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ElementType } from 'react'
import { useModelViewerScript } from '@/hooks/use-model-viewer-script'

const MV = 'model-viewer' as unknown as ElementType

type ModelViewerProps = {
  src: string
  alt: string
  credit?: string
}

type ModelViewerElement = HTMLElement & {
  cameraOrbit?: string
  cameraTarget?: string
  interpolationDecay?: number
  autoRotate?: boolean
  jumpCameraToGoal?: () => void
  canActivateAR?: boolean
}

export function ProductModelViewer({ src, alt, credit }: ModelViewerProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null)
  const interactedRef = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [arSupported, setArSupported] = useState(false)
  const { ready } = useModelViewerScript()

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer) return

    setLoaded(false)
    setError(false)
    setProgress(0)
    setAutoRotate(true)
    setArSupported(false)
    interactedRef.current = false

    const applyInitial = () => {
      viewer.cameraOrbit = '0deg 75deg 105%'
      viewer.cameraTarget = '0m 0.4m 0m'
      viewer.interpolationDecay = 200
      viewer.autoRotate = true
      if (!interactedRef.current) {
        try {
          viewer.jumpCameraToGoal?.()
        } catch {
          // camera not ready yet
        }
      }
    }

    applyInitial()
    if (typeof customElements !== 'undefined' && customElements.whenDefined) {
      customElements.whenDefined('model-viewer').then(applyInitial)
    }

    const onLoad = () => {
      setLoaded(true)
      setProgress(100)
      setArSupported(Boolean(viewer.canActivateAR))
    }
    const onProgress = (e: Event) => {
      const total = (e as CustomEvent).detail?.totalProgress
      if (typeof total === 'number' && total > 0 && total < 1) {
        setProgress(Math.round(total * 100))
      }
    }
    const onError = () => setError(true)
    const onCameraChange = () => {
      interactedRef.current = true
    }

    viewer.addEventListener('load', onLoad)
    viewer.addEventListener('progress', onProgress)
    viewer.addEventListener('error', onError)
    viewer.addEventListener('camera-change', onCameraChange)

    return () => {
      viewer.removeEventListener('load', onLoad)
      viewer.removeEventListener('progress', onProgress)
      viewer.removeEventListener('error', onError)
      viewer.removeEventListener('camera-change', onCameraChange)
    }
  }, [src, ready])

  const toggleRotate = () => {
    const viewer = viewerRef.current
    if (!viewer) return
    const next = !viewer.autoRotate
    viewer.autoRotate = next
    setAutoRotate(next)
  }

  const resetCamera = () => {
    const viewer = viewerRef.current
    if (!viewer) return
    viewer.cameraOrbit = '0deg 75deg 105%'
    viewer.cameraTarget = '0m 0.4m 0m'
  }

  const goFullscreen = () => {
    viewerRef.current?.requestFullscreen?.()
  }

  return (
    <div className="group relative flex h-full min-h-[440px] flex-col overflow-hidden border border-border bg-secondary/50">
      <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <Box className="size-3.5" aria-hidden="true" />
        Interactive 3D
      </div>

      <div className="relative min-h-0 flex-1">
        <MV
          ref={viewerRef}
          src={src}
          alt={alt}
          camera-controls
          disable-pan
          ar
          ar-modes="webxr scene-viewer quick-look"
          ar-scale="fixed"
          loading="eager"
          reveal="auto"
          shadow-intensity="0.6"
          shadow-softness="0.8"
          exposure="1"
          tone-mapping="aces"
          environment-image="neutral"
          background-color="transparent"
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, outline: 'none' }}
        >
          {!loaded && !error && (
            <div slot="poster" className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-secondary/70">
              <div className="size-7 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-accent" />
              <span className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {progress > 0 ? `Loading… ${progress}%` : 'Preparing model'}
              </span>
            </div>
          )}

          {error && (
            <div slot="poster" className="absolute inset-0 z-10 flex items-center justify-center bg-secondary/70 p-6">
              <span className="max-w-md text-center text-xs text-destructive">Failed to load model</span>
            </div>
          )}

          {loaded && arSupported && (
            <button
              type="button"
              slot="ar-button"
              aria-label="View in your space"
              className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              View in your space
            </button>
          )}
        </MV>

        {loaded && (
          <div className="absolute right-5 top-5 z-10 flex flex-col gap-2">
            <button
              type="button"
              onClick={toggleRotate}
              aria-label="Toggle auto rotation"
              aria-pressed={autoRotate}
              className={autoRotate
                ? 'flex size-10 items-center justify-center border border-primary bg-primary text-primary-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                : 'flex size-10 items-center justify-center border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'}
            >
              <RotateCcw className={autoRotate ? 'size-4 animate-spin' : 'size-4'} style={{ animationDuration: '8s' }} />
            </button>
            <button
              type="button"
              onClick={resetCamera}
              aria-label="Reset camera"
              className="flex size-10 items-center justify-center border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Compass className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goFullscreen}
              aria-label="Enter fullscreen 3D view"
              className="flex size-10 items-center justify-center border border-border bg-card/90 text-foreground shadow-sm transition-colors hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Maximize2 className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 text-xs text-muted-foreground">
        <Rotate3D className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Drag to rotate · Scroll to zoom</span>
        <span className="sm:hidden">Drag to rotate</span>
      </div>

      {credit && (
        <p className="absolute bottom-1 left-5 z-10 text-[9px] text-muted-foreground/60">{credit}</p>
      )}
    </div>
  )
}

export default ProductModelViewer
