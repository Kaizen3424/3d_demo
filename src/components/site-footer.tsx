import { Mail, Send } from 'lucide-react'
import { Link } from 'react-router'

const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Sofas', to: '/?cat=Sofas' },
      { label: 'Seating', to: '/?cat=Seating' },
      { label: 'Lighting', to: '/?cat=Lighting' },
      { label: 'New Arrivals', to: '/?cat=All' },
      { label: 'Gift Cards', to: '/about#gift-cards' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Our Story', to: '/about' },
      { label: 'Materials', to: '/about#materials' },
      { label: 'Sustainability', to: '/about#sustainability' },
      { label: 'Trade Program', to: '/about#trade' },
      { label: 'Press', to: '/about#press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Delivery & Setup', to: '/contact#delivery' },
      { label: 'Returns', to: '/contact#returns' },
      { label: 'Care Guide', to: '/contact#care' },
      { label: 'AR & 3D Help', to: '/contact#ar-help' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
                Lume
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Atelier
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Furniture designed to be lived with. See every piece in interactive 3D and place it
              in your own room with augmented reality before you commit.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/contact"
                aria-label="Follow us"
                className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <Send className="size-4" />
              </Link>
              <a
                href="mailto:hello@lume-atelier.example"
                aria-label="Email us"
                className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Lume Atelier. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about#legal" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link to="/about#legal" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link to="/about#legal" className="transition-colors hover:text-foreground">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
