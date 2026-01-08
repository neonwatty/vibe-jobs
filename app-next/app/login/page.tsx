'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import OAuthButtons from '@/components/auth/OAuthButtons'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, isEmployee, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push(isEmployee ? '/dashboard' : '/company')
    }
  }, [isAuthenticated, isEmployee, loading, router])

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
