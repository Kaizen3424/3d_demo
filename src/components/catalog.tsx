import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { cn } from '@/lib/utils'
import { categories, products } from '@/lib/products'
import { ProductCard } from '@/components/product-card'

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramCat = searchParams.get('cat')
  const [active, setActive] = useState<(typeof categories)[number]>(
    categories.includes(paramCat as (typeof categories)[number]) ? (paramCat as (typeof categories)[number]) : 'All',
  )

  useEffect(() => {
    const next = searchParams.get('cat')
    if (next && categories.includes(next as (typeof categories)[number])) {
      setActive(next as (typeof categories)[number])
    }
  }, [searchParams])

  useEffect(() => {
    if (!searchParams.has('cat')) return
    const el = document.getElementById('catalog')
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    if (active === 'All') return products
    return products.filter((p) => p.category === active)
  }, [active])

  const selectCategory = (cat: (typeof categories)[number]) => {
    setActive(cat)
    setSearchParams(cat === 'All' ? { cat: 'All' } : { cat }, { replace: true })
  }

  return (
    <section id="catalog" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 md:px-8">
      <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">The Collection</p>
          <h2 className="mt-3 text-balance font-serif text-3xl leading-tight text-foreground md:text-4xl">
            Every piece, viewable in 3D
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Browse the studio catalog. Open any product to rotate it in full 3D and launch an AR
            preview to see it at true scale in your room.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active === cat}
              onClick={() => selectCategory(cat)}
              className={cn(
                'border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                active === cat
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.slug} product={product} priority={i < 4} />
        ))}
      </div>
    </section>
  )
}

export default Catalog
