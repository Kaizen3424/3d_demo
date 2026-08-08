# Todo: Fix 3D model loading & viewer parity

## Phase 1: Foundation
- [x] Task 1: Correct model paths in `lib/products.ts` (XS)

### Checkpoint: Paths
- [x] All 5 GLB URLs resolve to existing files

## Phase 2: Viewer parity
- [x] Task 2: Rewrite `components/model-viewer.tsx` to embed-viewer.html config via CDN v4.2.0 (M)
- [x] Task 3: Remove `@google/model-viewer` from `package.json` (XS)

### Checkpoint: Viewer
- [x] `npm install` succeeds (switched from pnpm per user request)
- [x] `npm run lint` passes (added eslint + eslint-config-next, which were missing)
- [x] `next build` passes

## Phase 3: Polish
- [x] Task 4: Remove `typescript.ignoreBuildErrors` from `next.config.mjs` (XS)
- [x] Task 5: Fix "Our Story" anchor link in `site-header.tsx` (XS)

### Checkpoint: Polish
- [x] Lint + build still clean

## Phase 4: End-to-end verification
- [x] Task 6: Verify all 5 product pages in Chrome (S)

## Complete
- [x] All acceptance criteria met
- [x] Ready for review
