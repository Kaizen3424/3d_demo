import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router'
import { Drawer } from '@/components/drawer'
import { useStore } from '@/lib/store'
import { cartItemImage, cartItemName, cartItemPrice } from '@/lib/cart-utils'
import { formatPrice } from '@/lib/products'

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    subtotal,
    setCheckoutOpen,
  } = useStore()

  const checkout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  return (
    <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Your bag">
      {cart.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">Your bag is empty.</p>
          <Link
            to="/?cat=All"
            onClick={() => setCartOpen(false)}
            className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-6">
            {cart.map((item) => {
              const price = cartItemPrice(item)
              return (
                <li key={item.key} className="flex gap-4">
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setCartOpen(false)}
                    className="block size-20 shrink-0 border border-border bg-secondary/40"
                  >
                    <img
                      src={cartItemImage(item)}
                      alt={cartItemName(item)}
                      className="size-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{cartItemName(item)}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Finish: {item.finish}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${cartItemName(item)} from bag`}
                        className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex h-8 items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs">{item.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {formatPrice(price * item.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 border-t border-border pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              White-glove delivery and assembly are included, free.
            </p>
            <button
              type="button"
              onClick={checkout}
              className="mt-5 w-full bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="mt-2 w-full border border-border px-5 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              Continue shopping
            </button>
          </div>
        </>
      )}
    </Drawer>
  )
}
