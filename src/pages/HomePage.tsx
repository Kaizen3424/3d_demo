import { Box, RotateCcw, Sparkles, Truck } from 'lucide-react'
import { Hero } from '@/components/hero'
import { Catalog } from '@/components/catalog'
import { usePageMeta } from '@/hooks/use-page-meta'

const steps = [
  {
    icon: Box,
    title: 'Open any product in 3D',
    body: 'Rotate, zoom, and inspect every piece from all angles right in your browser — no app to install.',
  },
  {
    icon: Sparkles,
    title: 'Launch AR in your room',
    body: 'On a phone or tablet, place the piece at true scale on your floor and walk around it.',
  },
  {
    icon: RotateCcw,
    title: 'Buy with confidence',
    body: 'Knowing exactly how a piece fits means fewer surprises — and far fewer returns.',
  },
]

export function HomePage() {
  usePageMeta(
    'Lume Atelier — Furniture you can see before you buy',
    'Lume Atelier is a modern furniture studio. Explore every piece in interactive 3D and place it in your own room with augmented reality before you buy.',
  )

  return (
    <>
      <Hero />

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3 md:px-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center bg-accent text-accent-foreground">
                <step.icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 font-serif text-lg text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Catalog />

      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="max-w-lg">
            <h2 className="text-balance font-serif text-3xl leading-tight md:text-4xl">
              Free shipping and 100-day returns on every order.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
              Made-to-last pieces, delivered and assembled in your home. If it is not right, we
              will collect it — no questions asked.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/80">
            <Truck className="size-5" aria-hidden="true" />
            White-glove delivery included
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
