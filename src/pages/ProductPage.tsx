import { useParams } from 'react-router'
import { Link } from 'react-router'
import { ProductDetail } from '@/components/product-detail'
import { formatPrice, getProduct, getRelated } from '@/lib/products'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProduct(slug) : undefined

  usePageMeta(
    product ? `${product.name} · Lume Atelier` : 'Product not found · Lume Atelier',
    product?.description,
  )

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-32 text-center">
        <h1 className="font-serif text-3xl text-foreground">We could not find that piece</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          The product you are looking for may have been moved. Browse the full collection instead.
        </p>
        <Link
          to="/?cat=All"
          className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
        >
          Browse the collection
        </Link>
      </div>
    )
  }

  const related = getRelated(product.slug)

  return (
    <>
      <ProductDetail product={product} />

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {related.map((item) => (
              <article key={item.slug} className="group flex flex-col">
                <Link
                  to={`/product/${item.slug}`}
                  className="relative aspect-4/5 overflow-hidden border border-border bg-secondary/40"
                  aria-label={`View ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg leading-tight text-foreground">
                    <Link to={`/product/${item.slug}`} className="transition-colors hover:text-accent">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="shrink-0 pt-1 text-sm font-medium text-foreground">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
