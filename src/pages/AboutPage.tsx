import { Link } from 'react-router'
import { usePageMeta } from '@/hooks/use-page-meta'

const materials = [
  { name: 'Solid oak & beech', body: 'FSC-certified hardwoods, kiln-dried and hand-finished with hardwax oil.' },
  { name: 'Full-grain leather', body: 'Aniline-dyed hides that develop a rich patina over years of use.' },
  { name: 'Cotton-blend velvet', body: 'Dense, light-catching weave with removable dry-clean covers.' },
  { name: 'Spun aluminium', body: 'Precision-spun shades with an anisotropic brushed finish.' },
]

const press = [
  { quote: '“The kind of demo that makes you believe furniture e-commerce can work.”', source: 'Studio Weekly' },
  { quote: '“Every piece viewable in true-to-scale AR before you commit — a no-brainer.”', source: 'The Interior Post' },
  { quote: '“Considered silhouettes, honest materials, and a 100-day return promise.”', source: 'Design Notes' },
]

export default function AboutPage() {
  usePageMeta(
    'About · Lume Atelier',
    'The story, materials, and craft behind Lume Atelier — furniture designed to be lived with.',
  )

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
      <section id="story" className="scroll-mt-28">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Our Story</p>
        <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Furniture designed to be lived with — and seen before you buy it.
        </h1>
        <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            Lume Atelier began with a simple frustration: buying furniture online meant buying on
            faith. Photos flatter, dimensions lie, and a sofa that looked perfect in a showroom
            can dwarf a hallway. So we set out to build a studio where every piece can be
            inspected in true-to-scale 3D, and placed in your own room with augmented reality,
            before you commit a single cent.
          </p>
          <p>
            Today we design and produce a small, considered collection — a handful of sofas,
            chairs, and lamps built from honest materials: kiln-dried hardwoods, full-grain
            leather, dense velvet, and spun metal. Each piece is made in small batches, delivered
            and assembled in your home, and covered by a 100-day return promise.
          </p>
        </div>
      </section>

      <section id="materials" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Materials</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          We work with a short list of materials we trust to age beautifully — and we are happy to
          show our work.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {materials.map((item) => (
            <div key={item.name} className="border border-border bg-secondary/40 p-5">
              <h3 className="font-serif text-lg text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sustainability" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Sustainability</h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            Every hardwood we use is FSC-certified, our velvet is a cotton-blend woven to order,
            and our leather is a by-product of the food industry — not bred for upholstery.
          </p>
          <p>
            Because you can preview every piece in 3D and AR before buying, our return rate stays
            low, which means fewer journeys, fewer re-shipments, and less waste. Made-to-last
            design is the most sustainable design there is.
          </p>
        </div>
      </section>

      <section id="trade" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Trade program</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Interior designers and architects get net-30 terms, project pricing, and access to our
          ​3D model library for their own visualisations. Write to{' '}
          <a href="mailto:trade@lume-atelier.example" className="text-foreground underline underline-offset-4">
            trade@lume-atelier.example
          </a>{' '}
          and our studio team will set up your account within two working days.
        </p>
      </section>

      <section id="press" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Press</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {press.map((item) => (
            <blockquote key={item.source} className="border border-border bg-secondary/40 p-5">
              <p className="font-serif text-base leading-relaxed text-foreground">“{item.quote}”</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                — {item.source}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="gift-cards" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Gift cards</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Lume gift cards are delivered by email and never expire. The recipient can use the
          balance on any piece in the collection — or on a delivery-slot upgrade if they are
          already a regular.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-block bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Request a gift card
        </Link>
      </section>

      <section id="legal" className="mt-20 scroll-mt-28 border-t border-border pt-14">
        <h2 className="font-serif text-2xl text-foreground md:text-3xl">Privacy, terms & accessibility</h2>
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Privacy</h3>
            <p className="mt-2">
              This is a demonstration store. We do not collect, store, or share any personal data.
              Anything you type into the demo forms stays in your browser only.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Terms</h3>
            <p className="mt-2">
              All products, prices, and copy are fictional and shown for demonstration purposes.
              3D models are Khronos glTF sample assets (CC BY 4.0) used with attribution.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Accessibility</h3>
            <p className="mt-2">
              The store is built with semantic HTML, keyboard-navigable controls, and ARIA labels
              throughout. If anything is hard to use, tell us via the contact page — we treat
              accessibility feedback as urgent.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
