import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { getProduct } from '@/lib/products'

export type CartItem = {
  key: string
  slug: string
  finish: string
  qty: number
}

export type Toast = {
  id: number
  message: string
  variant?: 'default' | 'success'
}

type StoreValue = {
  cart: CartItem[]
  cartCount: number
  subtotal: number
  favorites: string[]
  user: { name: string; email: string } | null
  toasts: Toast[]
  cartOpen: boolean
  favoritesOpen: boolean
  searchOpen: boolean
  accountOpen: boolean
  checkoutOpen: boolean
  addToCart: (slug: string, finish: string, qty: number) => void
  updateQty: (key: string, qty: number) => void
  removeFromCart: (key: string) => void
  clearCart: () => void
  toggleFavorite: (slug: string) => void
  signIn: (name: string, email: string) => void
  signOut: () => void
  toast: (message: string, variant?: Toast['variant']) => void
  dismissToast: (id: number) => void
  setCartOpen: (open: boolean) => void
  setFavoritesOpen: (open: boolean) => void
  setSearchOpen: (open: boolean) => void
  setAccountOpen: (open: boolean) => void
  setCheckoutOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreValue | null>(null)

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => readJSON('lume:cart', []))
  const [favorites, setFavorites] = useState<string[]>(() => readJSON('lume:favorites', []))
  const [user, setUser] = useState<{ name: string; email: string } | null>(() =>
    readJSON('lume:user', null),
  )
  const [toasts, setToasts] = useState<Toast[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const toastId = useRef(0)

  useEffect(() => {
    localStorage.setItem('lume:cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('lume:favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (user) localStorage.setItem('lume:user', JSON.stringify(user))
    else localStorage.removeItem('lume:user')
  }, [user])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (message: string, variant: Toast['variant'] = 'default') => {
      const id = ++toastId.current
      setToasts((prev) => [...prev.slice(-2), { id, message, variant }])
      window.setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const addToCart = useCallback(
    (slug: string, finish: string, qty: number) => {
      const key = `${slug}::${finish}`
      setCart((prev) => {
        const existing = prev.find((item) => item.key === key)
        if (existing) {
          return prev.map((item) =>
            item.key === key ? { ...item, qty: Math.min(99, item.qty + qty) } : item,
          )
        }
        return [...prev, { key, slug, finish, qty }]
      })
    },
    [],
  )

  const updateQty = useCallback((key: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => (item.key === key ? { ...item, qty: Math.min(99, qty) } : item)),
    )
  }, [])

  const removeFromCart = useCallback((key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) => {
        const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        return next
      })
    },
    [],
  )

  const signIn = useCallback((name: string, email: string) => {
    setUser({ name, email })
  }, [])

  const signOut = useCallback(() => setUser(null), [])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart])

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProduct(item.slug)
        return sum + (product ? product.price * item.qty : 0)
      }, 0),
    [cart],
  )

  const value: StoreValue = {
    cart,
    cartCount,
    subtotal,
    favorites,
    user,
    toasts,
    cartOpen,
    favoritesOpen,
    searchOpen,
    accountOpen,
    checkoutOpen,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    toggleFavorite,
    signIn,
    signOut,
    toast,
    dismissToast,
    setCartOpen,
    setFavoritesOpen,
    setSearchOpen,
    setAccountOpen,
    setCheckoutOpen,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
