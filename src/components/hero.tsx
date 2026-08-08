import { ArrowRight, Box, Sparkles } from 'lucide-react'
import { Link } from 'react-router'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-5 md:grid-cols-2 md:px-8">
        <div className="flex flex-col justify-center py-16 md:py-24 md:pr-12">
          <div className="animate-rise flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-4" aria-hidden="true" />
            See it before you buy it
          </div>
          <h1 className="animate-rise mt-6 text-balance font-serif text-4xl leading-[1.05] text-foreground md:text-6xl">
            Furniture you can place in your room, virtually.
          </h1>
          <p className="animate-rise mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Lume Atelier pairs considered, made-to-last design with interactive 3D and augmented
            reality — so you know exactly how a piece looks and fits at home before it ships.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/?cat=All"
              className="group flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Explore the collection
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/product/cassia-velvet-sofa"
              className="flex items-center gap-2 border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              <Box className="size-4" />
              Try a 3D demo
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] md:min-h-[620px]">
          <img
            src="/hero-room.webp"
            alt="A sunlit living room styled with Lume Atelier furniture"
            className="absolute inset-0 size-full object-cover"
            decoding="async"
          />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 bg-background/85 px-4 py-3 backdrop-blur-sm md:left-auto md:right-6 md:w-64">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                In this room
              </p>
              <p className="text-sm font-medium text-foreground">Cassia Velvet Sofa</p>
            </div>
            <Link
              to="/product/cassia-velvet-sofa"
              aria-label="View the Cassia Velvet Sofa"
              className="flex size-9 shrink-0 items-center justify-center bg-accent text-accent-foreground transition-colors hover:bg-accent/90"
            >
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
