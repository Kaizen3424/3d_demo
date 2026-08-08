import { useState } from 'react'
import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { Link } from 'react-router'
import { ProductModelViewer } from '@/components/model-viewer'
import { formatPrice, type Product } from '@/lib/products'
import { useStore } from '@/lib/store'

export function ProductDetail({ product }: { product: Product }) {
  const [finish, setFinish] = useState(product.finishes[0])
  const [quantity, setQuantity] = useState(1)
  const { favorites, toggleFavorite, addToCart, setCartOpen, toast } = useStore()
  const saved = favorites.includes(product.slug)

  const addToBag = () => {
    addToCart(product.slug, finish.name, quantity)
    toast('Added to bag', 'success')
    setCartOpen(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
      <Link to="/?cat=All" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to collection
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <div className="flex min-h-[520px] flex-col gap-4">
          <ProductModelViewer src={product.model} alt={product.modelAlt} credit={product.modelCredit} />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Drag to rotate the model. Pinch or scroll to zoom. On compatible phones, choose “View in your space” to launch AR.
          </p>
        </div>

        <div className="lg:pt-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{product.category}</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-accent align-middle" aria-hidden="true" /> In stock — ships in 2–4 weeks
            </p>
          </div>
          <div className="mt-3 flex items-start justify-between gap-5">
            <h1 className="max-w-md text-balance font-serif text-4xl leading-[1.05] text-foreground md:text-5xl">{product.name}</h1>
            <button type="button" onClick={() => toggleFavorite(product.slug)} aria-label={saved ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={saved} className="flex size-11 shrink-0 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground/40">
              <Heart className={saved ? 'size-5 fill-accent text-accent' : 'size-5'} />
            </button>
          </div>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.tagline}</p>
          <p className="mt-6 text-2xl font-medium text-foreground">{formatPrice(product.price)}</p>
          <div className="my-8 border-y border-border py-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">Choose a finish</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.finishes.map((item) => (
                <button key={item.name} type="button" onClick={() => setFinish(item)} aria-label={`Choose ${item.name} finish`} aria-pressed={finish.name === item.name} className="flex items-center gap-2 border px-3 py-2 text-sm transition-colors hover:border-foreground/50" style={{ borderColor: finish.name === item.name ? 'var(--foreground)' : undefined }}>
                  <span className="size-4 rounded-full border border-foreground/10" style={{ backgroundColor: item.swatch }} />
                  {item.name}
                  {finish.name === item.name && <Check className="size-3.5" aria-hidden="true" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-12 items-center border border-border">
              <button type="button" className="flex size-11 items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity"><Minus className="size-4" /></button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button type="button" className="flex size-11 items-center justify-center text-muted-foreground hover:text-foreground" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity"><Plus className="size-4" /></button>
            </div>
            <button type="button" onClick={addToBag} className="flex h-12 flex-1 items-center justify-center gap-2 bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
              <ShoppingBag className="size-4" aria-hidden="true" />
              Add to bag — {formatPrice(product.price * quantity)}
            </button>
          </div>
          <div className="mt-8 grid gap-4 border-b border-border pb-8 text-sm">
            <div className="flex items-start gap-3"><Truck className="mt-0.5 size-4 text-accent" /><span><strong className="font-medium text-foreground">White-glove delivery</strong><br /><span className="text-muted-foreground">Free delivery and assembly, usually within 2–4 weeks.</span></span></div>
            <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-4 text-accent" /><span><strong className="font-medium text-foreground">100-day returns</strong><br /><span className="text-muted-foreground">Try it at home. We collect it if it is not right.</span></span></div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
            <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Materials</p><p className="mt-2 leading-relaxed text-foreground">{product.materials}</p></div>
            <div><p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Dimensions</p><p className="mt-2 leading-relaxed text-foreground">{product.dimensions.width} W × {product.dimensions.depth} D × {product.dimensions.height} H</p></div>
          </div>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
