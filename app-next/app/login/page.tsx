'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import OAuthButtons from '@/components/auth/OAuthButtons'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isEmployee, loading, signInWithEmail, error, clearError } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(isEmployee ? '/dashboard' : '/company')
    }
  }, [isAuthenticated, isEmployee, loading, router])

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    clearError()
    setIsSubmitting(true)

    const { error } = await signInWithEmail(email, password)
    setIsSubmitting(false)

    if (!error) {
      // Redirect handled by useEffect
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-grid flex items-center justify-center">
        <div className="animate-pulse text-[var(--color-text-muted)]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-grid flex flex-col">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <Link href="/signup" className="btn btn-ghost">
          Create account
        </Link>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center pb-20">
        <div className="w-full max-w-md px-4">
          <div className="card">
            <h1 className="text-2xl mb-2">Welcome back</h1>
            <p className="text-[var(--color-text-muted)] mb-8">
              Sign in to continue to your account
            </p>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-full"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in with Email'}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]">
                  or continue with
                </span>
              </div>
            </div>

            <OAuthButtons mode="login" />

            <p className="text-sm text-[var(--color-text-muted)] text-center mt-6">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[var(--color-accent)] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
