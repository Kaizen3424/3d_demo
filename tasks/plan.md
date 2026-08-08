# Implementation Plan: Vite migration + full storefront for Lume Atelier demo

## Overview

Turn the demo ecommerce site (`example_website`) into a fast, fully interactive storefront: migrate from Next.js to Vite + React Router for instant client-side navigation and a fast dev server, make every link and button functional (search, favorites, bag/checkout, account, category-filtered nav, real footer destinations), and add About + Contact pages so the demo feels like a real store.

## Architecture Decisions

- **Vite + React Router** (BrowserRouter) replaces Next.js App Router. Routes: `/` (Home), `/product/:slug`, `/about`, `/contact`, `*` (404). Product/About/Contact pages are `React.lazy()` code-split; Vite's SPA fallback covers deep-link refreshes in dev and preview.
- **Tailwind v4 via `@tailwindcss/vite`** plugin; `tw-animate-css` and `shadcn/tailwind.css` imports preserved in `src/globals.css`.
- **Fonts**: `@fontsource-variable/inter` + `@fontsource-variable/fraunces` (self-hosted, unicode-range subsets) replace `next/font`.
- **Images**: original product PNGs restored from `3d_gen/products/images/` (user: "use real images"); hero stays `hero-room.webp` (original PNG unrecoverable — user approved). Unused `ar-scene.png` removed. `<img>` + `loading="lazy"` replaces `next/image`; hero is preloaded in `index.html`.
- **model-viewer 4.2.0** stays on the Google CDN, injected once via `useModelViewerScript()` hook (guarded against double-injection); viewer attributes remain byte-identical to `embed-viewer.html`. GLBs untouched per user decision.
- **Global store** (`StoreProvider`, React context + localStorage): cart line items `{slug, finish, qty}`, persisted favorites, demo user, toasts, and UI flags (cart/favorites drawer, search overlay, account + checkout modals).
- **Category navigation**: header/footer category links → `/?cat=X`; Catalog reads `useSearchParams` to filter + scroll into view. Replaces the old `/#catalog` dumping ground.
- **Dead-link sweep**: footer Shop/Studio/Support columns now point to real destinations (`/?cat=…`, `/about#…`, `/contact#…`, `mailto:`); Privacy/Terms/Accessibility → `/about#legal`.

## Task List

### Phase 0: Scaffold Vite
- [x] Install deps (`vite`, `@vitejs/plugin-react-swc` [avoids Babel 8 peer conflict with shadcn], `@tailwindcss/vite`, `react-router`, fontsource vars, `typescript-eslint`, react-hooks/react-refresh plugins)
- [x] `index.html` (meta, preload hero), `vite.config.ts` (port 3000, `@` → `src/` alias), `tsconfig.json` (bundler mode)
- [x] `src/main.tsx`, `src/App.tsx` (routes + layout + lazy pages + ScrollManager for hash anchors)
- [x] Lint: swap `eslint-config-next` → `typescript-eslint` + react-hooks + react-refresh (allow `buttonVariants`, `useStore`)
- [x] Remove Next files (`app/`, `next.config.mjs`, `postcss.config.mjs`, `next-env.d.ts`, `@vercel/analytics`, `next`)

### Phase 1: Port components
- [x] Move `lib/products.ts`, `lib/utils.ts`, `components/ui/button.tsx` to `src/`
- [x] Port hero, catalog, product-card, product-detail, model-viewer (script hook), site-header, site-footer
- [x] `usePageMeta` hook (per-route title/description)

### Phase 2: Images (user override: real images)
- [x] Restore original product PNGs from `3d_gen/products/images/` (byte-identical), refs → `.png`
- [x] Hero stays `hero-room.webp` (original deleted; user chose to keep the compressed copy)
- [x] Removed `sharp` + optimize script (no longer needed)

### Phase 3: Storefront layer
- [x] `src/lib/store.tsx` (cart, favorites, user, toasts, UI flags, localStorage persistence)
- [x] Cart drawer (qty steppers, remove, subtotal) + checkout modal (demo form, order number, confirmation)
- [x] Favorites drawer (header badge count, shared with catalog + product page)
- [x] Search overlay (live filter, keyboard nav)
- [x] Account modal (demo sign-in, persisted user)
- [x] Announcement bar (marquee trust messages)
- [x] Catalog `?cat=` filtering synced with nav links and tabs

### Phase 4: Pages
- [x] `/about` (story, materials, sustainability, trade, press, gift-cards, legal anchors)
- [x] `/contact` (form + delivery, returns, care, ar-help anchors)
- [x] NotFound page

### Phase 5: Quality gates
- [x] `npm run lint` clean (0 warnings)
- [x] `npm run build` passes (tsc --noEmit + vite build; 97 kB gz main bundle + lazy route chunks)
- [x] Dev server (`npm run dev`, port 3000) ready in ~2 s
- [x] HTTP checks: all routes 200 (incl. deep links), all GLBs/PNGs/hero/CDN script 200
- [x] Headless Chrome render checks: home (announcement bar, real PNGs, functional header/footer links), product (model-viewer + attributes, Add to bag, in-stock), about/contact (all anchor sections, titles), mobile menu markup present
- [x] `vite preview` SPA fallback works for all routes
- [x] Dev server left running at http://localhost:3000

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `@vitejs/plugin-react` Babel 8 peer conflict with shadcn | Build install fails | Used `@vitejs/plugin-react-swc` (no Babel) — installed cleanly |
| `shadcn/tailwind.css` + `tw-animate-css` under Vite | Styling breaks | Tailwind v4 official Vite plugin; verified visually via headless render |
| `@/globals.css` type error | tsc fails | Added `src/vite-env.d.ts` (`vite/client` reference) |
| Double model-viewer script injection (StrictMode) | Duplicate CDN fetch | `ensureScript()` singleton promise + `customElements.get()` guard |
| GLBs (3.4–9.2 MB) dominate product-page load | Slow first paint on product pages | Accepted (user: keep GLBs untouched); SPA nav makes it one-time per visit; progress overlay exists |
| Original hero-room.png deleted | Image lost | Unrecoverable (no backup); user approved keeping the webp copy |

## Open Questions

- None — all resolved with the user (Vite migration yes, full storefront scope, GLBs untouched, real product images restored, hero keeps webp).
