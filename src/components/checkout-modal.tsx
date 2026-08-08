import { Check, CreditCard, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { formatPrice } from '@/lib/products'

type FormState = {
  name: string
  email: string
  address: string
  city: string
  zip: string
  card: string
}

const empty: FormState = { name: '', email: '', address: '', city: '', zip: '', card: '' }

export function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, subtotal, clearCart, toast, user } = useStore()
  const [form, setForm] = useState<FormState>(empty)
  const [placed, setPlaced] = useState<string | null>(null)

  const close = () => {
    setCheckoutOpen(false)
    if (placed) {
      setPlaced(null)
      setForm(empty)
    }
  }

  if (!checkoutOpen) return null

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return
    const order = `LUME-${Math.floor(100000 + Math.random() * 900000)}`
    setPlaced(order)
    clearCart()
    toast(`Order ${order} placed`, 'success')
  }

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Checkout">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={close}
        className="absolute inset-0 size-full cursor-default bg-foreground/40 backdrop-blur-[2px]"
      />
      <div className="absolute left-1/2 top-1/2 max-h-[90vh] w-[min(560px,calc(100%-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg text-foreground">
            {placed ? 'Order confirmed' : 'Checkout'}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close checkout"
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {placed ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check className="size-6" aria-hidden="true" />
            </div>
            <p className="font-serif text-xl text-foreground">Thank you for your order</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Order <span className="font-medium text-foreground">{placed}</span> is confirmed. Our
              team will email your delivery window — white-glove delivery and assembly are
              included, free.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-4 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Continue shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">Your bag is empty — add a piece first.</p>
            <button
              type="button"
              onClick={close}
              className="mt-4 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-5 px-6 py-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full name" value={form.name} onChange={set('name')} placeholder="Ada Lovelace" required />
              <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
            </div>
            <Field label="Delivery address" value={form.address} onChange={set('address')} placeholder="12 Studio Lane" required />
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" value={form.city} onChange={set('city')} placeholder="Copenhagen" required />
              <Field label="Postal code" value={form.zip} onChange={set('zip')} placeholder="2100" required />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Payment
              </label>
              <div className="relative mt-2">
                <CreditCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.card}
                  onChange={set('card')}
                  placeholder="4242 4242 4242 4242"
                  required
                  className="h-11 w-full border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal ({cart.reduce((n, i) => n + i.qty, 0)} items)</span>
                <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-muted-foreground">
                <span>White-glove delivery</span>
                <span className="font-medium text-accent">Free</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-3 text-base">
                <span className="text-foreground">Total</span>
                <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-foreground px-5 py-3.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Place order — {formatPrice(subtotal)}
            </button>
            {user && (
              <p className="-mt-3 text-center text-xs text-muted-foreground">
                Ordering as {user.name} · {user.email}
              </p>
            )}
            <p className="-mt-2 text-center text-[11px] text-muted-foreground">
              Demo checkout — no payment is processed and nothing is stored.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: string
}) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
      />
    </label>
  )
}
