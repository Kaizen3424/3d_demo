import { lazy, Suspense } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router'
import { useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'
import { CartDrawer } from '@/components/cart-drawer'
import { FavoritesDrawer } from '@/components/favorites-drawer'
import { SearchOverlay } from '@/components/search-overlay'
import { AccountModal } from '@/components/account-modal'
import { CheckoutModal } from '@/components/checkout-modal'
import { Toasts } from '@/components/toasts'
import { HomePage } from '@/pages/HomePage'

const ProductPage = lazy(() => import('@/pages/ProductPage'))
const AboutPage = lazy(() => import('@/pages/AboutPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route
          element={
            <div className="flex min-h-screen flex-col">
              <AnnouncementBar />
              <SiteHeader />
              <main className="flex-1">
                <Outlet />
              </main>
              <SiteFooter />
            </div>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path="product/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <ProductPage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
      <CartDrawer />
      <FavoritesDrawer />
      <SearchOverlay />
      <AccountModal />
      <CheckoutModal />
      <Toasts />
    </>
  )
}

function PageFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-5">
      <div className="size-7 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-accent" />
    </div>
  )
}
