'use client'

import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { Link } from 'react-router'
import { useState } from 'react'
import { useStore } from '@/lib/store'

const navLinks = [
  { label: 'Collections', to: '/?cat=All' },
  { label: 'Sofas', to: '/?cat=Sofas' },
  { label: 'Seating', to: '/?cat=Seating' },
  { label: 'Lighting', to: '/?cat=Lighting' },
  { label: 'Our Story', to: '/about' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { cartCount, favorites, setSearchOpen, setFavoritesOpen, setAccountOpen, setCartOpen } =
    useStore()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <Link to="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Lume
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="hidden size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Search className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label={`Favorites (${favorites.length})`}
            onClick={() => setFavoritesOpen(true)}
            className="relative hidden size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <Heart className="size-[18px]" />
            {favorites.length > 0 && (
              <span className="absolute right-0 top-0 flex size-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-semibold text-accent-foreground">
                {favorites.length}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Account"
            onClick={() => setAccountOpen(true)}
            className="hidden size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <UserRound className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label={`Shopping bag (${cartCount})`}
            onClick={() => setCartOpen(true)}
            className="relative flex size-9 items-center justify-center text-foreground"
          >
            <ShoppingBag className="size-[18px]" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-base text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
            {[
              { icon: Search, label: 'Search', action: () => setSearchOpen(true) },
              { icon: Heart, label: 'Favorites', action: () => setFavoritesOpen(true) },
              { icon: UserRound, label: 'Account', action: () => setAccountOpen(true) },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  setOpen(false)
                  action()
                }}
                className="flex flex-col items-center gap-1.5 border border-border py-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default SiteHeader
