import { useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { useStore } from '@/lib/store'
import { usePageMeta } from '@/hooks/use-page-meta'

const cares = [
  { name: 'Velvet & upholstery', body: 'Vacuum weekly with a soft brush head. Spot-clean with a damp cloth and mild soap — never rub.' },
  { name: 'Leather', body: 'Wipe with a dry cloth. Condition twice a year; the patina that develops is the piece ageing well.' },
  { name: 'Metal shades', body: 'Dust with a dry microfiber cloth. Brushed finishes develop character over time — that is on purpose.' },
  { name: 'Hardwood frames', body: 'Keep out of direct sun for long periods and re-oil with hardwax once a year.' },
]

export default function ContactPage() {
  usePageMeta(
    'Contact · Lume Atelier',
    'Contact the Lume Atelier studio about orders, delivery, returns, and AR & 3D help.',
  )

  const { toast, user } = useStore()
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    toast('Message sent — we reply within one working day', 'success')
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <section id="contact" className="scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Talk to a human, not a bot.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Questions about a piece, an order, or your delivery window? The studio answers within
          one working day.
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  defaultValue={user?.name ?? ''}
                  placeholder="Ada Lovelace"
                  className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  defaultValue={user?.email ?? ''}
                  placeholder="you@example.com"
                  className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Tell us about the piece, the room, or the delivery question…"
                className="mt-2 w-full resize-y border border-border bg-background px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
              />
            </div>
            <button
              type="submit"
              className="flex w-fit items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              <Send className="size-4" aria-hidden="true" />
              {sent ? 'Message sent' : 'Send message'}
            </button>
            {sent && (
              <p className="text-sm text-accent" role="status">
                Thanks — your message is on its way. We reply within one working day.
              </p>
            )}
          </form>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Email</p>
                <a href="mailto:hello@lume-atelier.example" className="text-muted-foreground hover:text-foreground">
                  hello@lume-atelier.example
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Phone</p>
                <p className="text-muted-foreground">+45 31 00 00 00 · Tue–Fri, 9–17 CET</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-accent" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Studio</p>
                <p className="text-muted-foreground">Gammel Kongevej 12, 1610 København V, Denmark</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Delivery & setup</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Every order ships with white-glove delivery — free. Two technicians bring the piece
          inside, assemble it where you want it, and take all packaging away. Most orders arrive
          within 2–4 weeks, and you will receive a delivery-window email once the piece leaves our
          workshop.
        </p>
      </section>

      <section id="returns" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">100-day returns</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Try the piece at home for up to 100 days. If it is not right, we collect it — no
          questions, no restocking fee, and a full refund within 10 working days of pickup. With
          3D and AR previews, most customers know the fit before the truck arrives.
        </p>
      </section>

      <section id="care" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Care guide</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cares.map((item) => (
            <div key={item.name} className="border border-border bg-secondary/40 p-5">
              <h3 className="font-serif text-lg text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ar-help" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">AR & 3D help</h2>
        <ol className="mt-6 max-w-2xl list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <li>Open any product page — the piece loads in full 3D automatically.</li>
          <li>Drag to rotate, pinch or scroll to zoom. Use the controls to pause rotation or reset the camera.</li>
          <li>On a compatible phone or tablet, tap “View in your space” to place the piece at true scale on your floor and walk around it.</li>
          <li>The model is shown in its real dimensions, so what you see is what will arrive.</li>
        </ol>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          AR requires a WebXR-capable device (most recent Android and iPhone models). If the AR
          button does not appear, your device is not AR-capable — the 3D view still works
          everywhere.
        </p>
      </section>
    </div>
  )
}
