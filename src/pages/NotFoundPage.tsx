import { Link } from 'react-router'
import { usePageMeta } from '@/hooks/use-page-meta'

export default function NotFoundPage() {
  usePageMeta('Page not found · Lume Atelier')

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">Error 404</p>
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">This page has left the building.</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist — but the collection does.
      </p>
      <Link
        to="/?cat=All"
        className="bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
      >
        Back to the collection
      </Link>
    </div>
  )
}
