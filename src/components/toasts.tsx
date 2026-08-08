import { Check, X } from 'lucide-react'
import { useStore } from '@/lib/store'

export function Toasts() {
  const { toasts, dismissToast } = useStore()

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-foreground px-4 py-2.5 text-sm text-background shadow-lg"
          role="status"
        >
          {toast.variant === 'success' && <Check className="size-4 text-accent" aria-hidden="true" />}
          <span>{toast.message}</span>
          <button
            type="button"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
            className="text-background/60 transition-colors hover:text-background"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
