const messages = [
  'Free white-glove delivery on every order',
  '100-day returns — try it at home',
  'Interactive 3D & AR on every piece',
  'Made-to-last, made in small batches',
]

export function AnnouncementBar() {
  const items = [...messages, ...messages]
  return (
    <div className="overflow-hidden border-b border-border bg-foreground py-2 text-background">
      <div className="animate-marquee flex w-max items-center">
        {items.map((message, i) => (
          <span
            key={i}
            className="flex items-center text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            <span className="px-6">{message}</span>
            <span className="text-accent" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
