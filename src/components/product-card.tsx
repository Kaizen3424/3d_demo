import { Box, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/lib/store'

type ProductCardProps = {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority }: ProductCardProps) {
  const { favorites, toggleFavorite, toast } = useStore()
  const favorite = favorites.includes(product.slug)

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-4/5 overflow-hidden border border-border bg-secondary/40">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 bg-background/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-foreground backdrop-blur-sm">
          <Box className="size-3" aria-hidden="true" />
          3D · AR
        </span>

        <button
          type="button"
          onClick={() => {
            toggleFavorite(product.slug)
            toast(
              favorite ? 'Removed from favorites' : 'Saved to favorites',
              'success',
            )
          }}
          aria-label={
            favorite ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`
          }
          aria-pressed={favorite}
          className="absolute right-3 top-3 flex size-9 items-center justify-center bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart className={cn('size-4', favorite && 'fill-accent text-accent')} />
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-lg leading-tight text-foreground">
            <Link to={`/product/${product.slug}`} className="transition-colors hover:text-accent">
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="shrink-0 pt-1 text-sm font-medium text-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground text-pretty">{product.tagline}</p>
    </article>
  )
}

export default ProductCard
