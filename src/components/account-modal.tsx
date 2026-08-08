import { LogOut, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'

export function AccountModal() {
  const { accountOpen, setAccountOpen, user, signIn, signOut, favorites, toast } = useStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  if (!accountOpen) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    signIn(name.trim() || 'Guest', email.trim() || 'guest@example.com')
    toast(`Welcome, ${name.trim() || 'Guest'}`, 'success')
    setAccountOpen(false)
  }

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Account">
      <button
        type="button"
        aria-label="Close"
        onClick={() => setAccountOpen(false)}
        className="absolute inset-0 size-full cursor-default bg-foreground/30 backdrop-blur-[2px]"
      />
      <div className="absolute left-1/2 top-24 w-[min(400px,calc(100%-2rem))] -translate-x-1/2 bg-background p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <UserRound className="size-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="font-serif text-lg text-foreground">
              {user ? `Hi, ${user.name}` : 'Your account'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setAccountOpen(false)}
            aria-label="Close account dialog"
            className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {user ? (
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-2 text-sm text-foreground">
              {favorites.length} saved {favorites.length === 1 ? 'piece' : 'pieces'} in your
              favorites
            </p>
            <button
              type="button"
              onClick={() => {
                signOut()
                toast('Signed out')
                setAccountOpen(false)
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="account-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Name
              </label>
              <input
                id="account-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
              />
            </div>
            <div>
              <label htmlFor="account-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                Email
              </label>
              <input
                id="account-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-foreground/50"
              />
            </div>
            <button
              type="submit"
              className="mt-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Sign in
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Demo store — any name and email work. Nothing is sent anywhere.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
