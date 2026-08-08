import { X } from 'lucide-react'
import type { ReactNode } from 'react'

type DrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default bg-foreground/30 backdrop-blur-[2px]"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-serif text-lg text-foreground">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">{children}</div>
      </div>
    </div>
  )
}
