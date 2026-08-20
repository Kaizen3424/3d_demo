export type Finish = {
  name: string
  /** CSS color used for the swatch */
  swatch: string
}

export type Product = {
  slug: string
  name: string
  tagline: string
  category: string
  price: number
  /** Primary studio image */
  image: string
  /** Path to the .glb model served from raw GitHub */
  model: string
  /** Short alt / accessible label for the model */
  modelAlt: string
  description: string
  materials: string
  dimensions: {
    width: string
    depth: string
    height: string
    weight: string
  }
  finishes: Finish[]
  features: string[]
  /** Attribution for the openly-licensed 3D asset */
  modelCredit: string
}

export const categories = [
  'All',
  'Sofas',
  'Seating',
  'Lighting',
] as const

const MODEL_BASE =
  'https://raw.githubusercontent.com/Kaizen3424/3d_demo/main/public/models'

export const products: Product[] = [
  {
    slug: 'cassia-velvet-sofa',
    name: 'Cassia Velvet Sofa',
    tagline: 'A low, generous three-seater in deep velvet.',
    category: 'Sofas',
    price: 24800,
    image: '/products/cassia-sofa.png',
    model: `${MODEL_BASE}/cassia-sofa.glb`,
    modelAlt: 'A three-seat sofa upholstered in deep green velvet',
    description:
      'The Cassia is built around a kiln-dried hardwood frame and wrapped in a dense cotton-blend velvet that catches the light. Feather-and-foam cushions keep their shape season after season, while slim tapered legs lift the whole piece off the floor for an airy silhouette.',
    materials: 'Cotton-blend velvet, kiln-dried hardwood frame, solid ash legs',
    dimensions: { width: '218 cm', depth: '96 cm', height: '78 cm', weight: '54 kg' },
    finishes: [
      { name: 'Emerald', swatch: 'oklch(0.5 0.09 165)' },
      { name: 'Clay', swatch: 'oklch(0.62 0.09 45)' },
      { name: 'Ink', swatch: 'oklch(0.32 0.03 260)' },
    ],
    features: [
      'Feather-wrapped foam seat cushions',
      'Removable, dry-clean cushion covers',
      'FSC-certified hardwood frame',
    ],
    modelCredit: 'Model: “Glam Velvet Sofa”, Khronos glTF Sample Assets (CC BY 4.0).',
  },
  {
    slug: 'lorenz-sofa',
    name: 'Lorenz Sofa',
    tagline: 'A tufted three-seater in breathable cotton.',
    category: 'Sofas',
    price: 25000,
    image: '/new/lorenz_sofa/sofa.jpg',
    model:
      'https://raw.githubusercontent.com/Kaizen3424/3d_demo/main/public/new/lorenz_sofa/sofa.glb',
    modelAlt: 'A three-seat fabric sofa in jade ivory cotton with a tufted backrest',
    description:
      'The Lorenz is a testament to exquisite design and detailed craftsmanship. Its soft, breathable cotton upholstery offers a calming aura, while the tufted backrest and gracefully curved armrests add classic charm. Sink into generously padded seats and a sturdy solid-wood frame built for years of daily relaxation.',
    materials: 'Cotton upholstery, high-density foam, solid wood frame, metal legs',
    dimensions: { width: '208.3 cm', depth: '83.8 cm', height: '76.2 cm', weight: '55 kg' },
    finishes: [
      { name: 'Jade Ivory', swatch: 'oklch(0.9 0.03 85)' },
      { name: 'Sage Green', swatch: 'oklch(0.75 0.05 140)' },
      { name: 'Sand Brown', swatch: 'oklch(0.7 0.06 55)' },
    ],
    features: [
      'Tufted backrest with gracefully curved armrests',
      'Breathable cotton-blend upholstery',
      'Sturdy solid wood frame',
    ],
    modelCredit: 'Studio 3D model — Lorenz Sofa.',
  },
  {
    slug: 'wren-accent-chair',
    name: 'Wren Accent Chair',
    tagline: 'A soft, sculptural lounge chair.',
    category: 'Seating',
    price: 8900,
    image: '/products/wren-chair.png',
    model: `${MODEL_BASE}/wren-chair.glb`,
    modelAlt: 'A curved accent lounge chair in light sheen fabric',
    description:
      'The Wren wraps a curved shell in a subtle sheen fabric that shifts tone as you move around it. Low and enveloping, it works as easily beside a fireplace as it does in a reading nook. Fine steel legs keep it visually light.',
    materials: 'Sheen upholstery fabric, moulded foam shell, powder-coated steel legs',
    dimensions: { width: '78 cm', depth: '82 cm', height: '74 cm', weight: '16 kg' },
    finishes: [
      { name: 'Champagne', swatch: 'oklch(0.82 0.04 85)' },
      { name: 'Sage', swatch: 'oklch(0.68 0.05 140)' },
      { name: 'Slate', swatch: 'oklch(0.5 0.02 250)' },
    ],
    features: [
      'Iridescent sheen upholstery',
      'One-piece moulded foam shell',
      'Powder-coated steel legs',
    ],
    modelCredit: 'Model: “Sheen Chair”, Khronos glTF Sample Assets (CC BY 4.0).',
  },
  {
    slug: 'verona-armchair',
    name: 'Verona Armchair',
    tagline: 'An ornate armchair with a modern posture.',
    category: 'Seating',
    price: 12400,
    image: '/products/verona-armchair.png',
    model: `${MODEL_BASE}/verona-armchair.glb`,
    modelAlt: 'An ornate armchair in purple damask with gold trim',
    description:
      'The Verona reinterprets a classic form with a plush damask weave and hand-finished carved arms. It is a statement piece — equally at home anchoring a hallway or paired at the head of a dining table.',
    materials: 'Woven damask, carved beech arms, gold-leaf detailing',
    dimensions: { width: '72 cm', depth: '74 cm', height: '104 cm', weight: '19 kg' },
    finishes: [
      { name: 'Plum', swatch: 'oklch(0.42 0.11 320)' },
      { name: 'Emerald', swatch: 'oklch(0.5 0.09 165)' },
      { name: 'Bronze', swatch: 'oklch(0.55 0.07 70)' },
    ],
    features: [
      'Hand-carved beech arms',
      'Woven damask upholstery',
      'Hand-applied gold-leaf trim',
    ],
    modelCredit: 'Model: “Chair Damask Purple Gold”, Khronos glTF Sample Assets (CC BY 4.0).',
  },
  {
    slug: 'halden-lamp',
    name: 'Halden Table Lamp',
    tagline: 'A warm barn-style lamp in brushed metal.',
    category: 'Lighting',
    price: 3200,
    image: '/products/halden-lamp.png',
    model: `${MODEL_BASE}/halden-lamp.glb`,
    modelAlt: 'A barn-style table lamp with a brushed metal shade',
    description:
      'A quiet workhorse of a lamp. The Halden’s spun-metal dome throws a soft, directed pool of warm light — ideal on a console, a desk, or a bedside table. The finish is anisotropic brushed metal that reads differently under changing light.',
    materials: 'Spun aluminium shade, cast base, fabric cord',
    dimensions: { width: '28 cm', depth: '28 cm', height: '46 cm', weight: '3 kg' },
    finishes: [
      { name: 'Brass', swatch: 'oklch(0.7 0.08 85)' },
      { name: 'Graphite', swatch: 'oklch(0.4 0.01 250)' },
      { name: 'Ivory', swatch: 'oklch(0.9 0.02 90)' },
    ],
    features: [
      'Anisotropic brushed-metal shade',
      'Dimmable warm LED (2700K)',
      'Braided fabric cord with inline switch',
    ],
    modelCredit: 'Model: “Anisotropy Barn Lamp”, Khronos glTF Sample Assets (CC BY 4.0).',
  },
  {
    slug: 'sikaar-sofa',
    name: 'Sikaar Sofa',
    tagline: 'A handcrafted sculptural sofa in seasoned teak.',
    category: 'Sofas',
    price: 45000,
    image: '/new/wooden_street_sofa/image.jpg',
    model:
      'https://raw.githubusercontent.com/Kaizen3424/3d_demo/main/public/new/wooden_street_sofa/sofa.glb',
    modelAlt: 'A handcrafted teak wood sofa with an asymmetrical sculptural silhouette',
    description:
      'The Sikaar is where artistry meets functionality. Its asymmetrical form looks different from every angle, and its Mansaar-inspired geometry balances positive and negative space for a look that is both sculptural and practical. Seasoned old teak wood holds the seating together — and tops the armrests with a surface made for afternoon tea cups. Handcrafted in small batches, made in India.',
    materials: 'Seasoned old teak wood, foam, wadding, upholstery fabric',
    dimensions: { width: '206 cm', depth: '81 cm', height: '76 cm', weight: '65 kg' },
    finishes: [
      { name: 'Natural Teak', swatch: 'oklch(0.55 0.09 65)' },
      { name: 'Herringbone Grey', swatch: 'oklch(0.6 0.02 250)' },
    ],
    features: [
      'Asymmetrical, sculptural form',
      'Handcrafted seasoned teak frame',
      'Practical wooden armrest surface',
    ],
    modelCredit: 'Studio 3D model — Sikaar Sofa.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelated(slug: string, limit = 3): Product[] {
  const current = getProduct(slug)
  if (!current) return products.slice(0, limit)
  const sameCategory = products.filter(
    (p) => p.slug !== slug && p.category === current.category,
  )
  const others = products.filter(
    (p) => p.slug !== slug && p.category !== current.category,
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}
