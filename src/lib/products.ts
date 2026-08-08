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
  /** Path to the .glb model served from /public */
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

export const products: Product[] = [
  {
    slug: 'cassia-velvet-sofa',
    name: 'Cassia Velvet Sofa',
    tagline: 'A low, generous three-seater in deep velvet.',
    category: 'Sofas',
    price: 2480,
    image: '/products/cassia-sofa.png',
    model: '/models/cassia-sofa.glb',
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
    slug: 'nord-leather-sofa',
    name: 'Nord Leather Sofa',
    tagline: 'Mid-century lines in full-grain cognac leather.',
    category: 'Sofas',
    price: 3150,
    image: '/products/nord-sofa.png',
    model: '/models/nord-sofa.glb',
    modelAlt: 'A leather sofa with a solid oak frame',
    description:
      'A restrained, architectural sofa that pairs an exposed solid-oak frame with full-grain aniline leather. The leather is left largely untreated so it develops a rich patina over years of use — a piece designed to age beautifully.',
    materials: 'Full-grain aniline leather, solid oak frame, high-resilience foam',
    dimensions: { width: '204 cm', depth: '90 cm', height: '74 cm', weight: '61 kg' },
    finishes: [
      { name: 'Cognac', swatch: 'oklch(0.55 0.1 55)' },
      { name: 'Espresso', swatch: 'oklch(0.34 0.03 50)' },
      { name: 'Sand', swatch: 'oklch(0.75 0.05 80)' },
    ],
    features: [
      'Full-grain leather that patinas over time',
      'Exposed FSC-certified oak frame',
      'Individually pocketed seat springs',
    ],
    modelCredit: 'Model: “Sheen Wood Leather Sofa”, Khronos glTF Sample Assets (CC BY 4.0).',
  },
  {
    slug: 'wren-accent-chair',
    name: 'Wren Accent Chair',
    tagline: 'A soft, sculptural lounge chair.',
    category: 'Seating',
    price: 890,
    image: '/products/wren-chair.png',
    model: '/models/wren-chair.glb',
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
    price: 1240,
    image: '/products/verona-armchair.png',
    model: '/models/verona-armchair.glb',
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
    price: 320,
    image: '/products/halden-lamp.png',
    model: '/models/halden-lamp.glb',
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}
