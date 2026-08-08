import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { products, formatPrice } from '@/lib/products'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products.slice(0, 6)
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q),
      )
      .slice(0, 6)
  }, [query])

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [searchOpen])

  useEffect(() => {
    setActive(0)
  }, [query])

  if (!searchOpen) return null

  const openProduct = (slug: string) => {
    setSearchOpen(false)
    navigate(`/product/${slug}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchOpen(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      openProduct(results[active].slug)
    }
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
      <button
        type="button"
        aria-label="Close search"
        onClick={() => setSearchOpen(false)}
        className="absolute inset-0 size-full cursor-default bg-foreground/30 backdrop-blur-[2px]"
      />
      <div className="relative mx-auto mt-24 w-[min(640px,calc(100%-2rem))] bg-background shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search sofas, chairs, lighting…"
            aria-label="Search products"
            className="h-14 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.map((product, i) => (
            <li key={product.slug}>
              <button
                type="button"
                onClick={() => openProduct(product.slug)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  'flex w-full items-center gap-4 px-3 py-2.5 text-left',
                  i === active && 'bg-secondary',
                )}
              >
                <img
                  src={product.image}
                  alt=""
                  className="size-12 shrink-0 border border-border object-cover"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-foreground">{formatPrice(product.price)}</p>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted-foreground">
              No pieces match “{query}”. Try “sofa”, “chair” or “lamp”.
            </li>
          )}
        </ul>
        <p className="border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
          {query ? 'Press Enter to open the highlighted piece' : 'Showing the latest arrivals — type to filter'}
        </p>
      </div>
    </div>
  )
}
