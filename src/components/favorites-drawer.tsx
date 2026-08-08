import { Heart, X } from 'lucide-react'
import { Link } from 'react-router'
import { Drawer } from '@/components/drawer'
import { useStore } from '@/lib/store'
import { getProduct, formatPrice } from '@/lib/products'

export function FavoritesDrawer() {
  const { favorites, favoritesOpen, setFavoritesOpen, toggleFavorite, toast } = useStore()
  const items = favorites
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <Drawer open={favoritesOpen} onClose={() => setFavoritesOpen(false)} title="Favorites">
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <Heart className="size-8 text-muted-foreground/40" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Nothing saved yet. Tap the heart on any piece to keep it here.
          </p>
          <Link
            to="/?cat=All"
            onClick={() => setFavoritesOpen(false)}
            className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {items.map((product) => (
            <li key={product.slug} className="flex gap-4">
              <Link
                to={`/product/${product.slug}`}
                onClick={() => setFavoritesOpen(false)}
                className="block size-20 shrink-0 border border-border bg-secondary/40"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleFavorite(product.slug)
                      toast('Removed from favorites')
                    }}
                    aria-label={`Remove ${product.name} from favorites`}
                    className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <p className="text-sm font-medium text-foreground">{formatPrice(product.price)}</p>
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setFavoritesOpen(false)}
                    className="border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-foreground/40"
                  >
                    View
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}
