'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import OAuthButtons from '@/components/auth/OAuthButtons'
import { isBlockedDomain } from '@/lib/constants'

type Step = 'role' | 'auth' | 'error'
type Role = 'employee' | 'employer'

interface SignupError {
  email?: string
  message: string
}

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, userRole, isAuthenticated, createUserRecord } = useAuth()

  // Check for blocked domain error from server-side redirect on initial render
  const initialError = useMemo(() => {
    const errorParam = searchParams.get('error')
    const emailParam = searchParams.get('email')

    if (errorParam === 'blocked_domain') {
      return {
        email: emailParam || undefined,
        message: 'Please use your work email to sign up as an employer. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.'
      }
    }
    return null
  }, [searchParams])

  const [step, setStep] = useState<Step>(initialError ? 'error' : 'role')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [error, setError] = useState<SignupError | null>(initialError)
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  // Clear URL params if we had an error
  useEffect(() => {
    if (initialError) {
      router.replace('/signup', { scroll: false })
    }
  }, [initialError, router])

  // Handle post-OAuth user creation
  useEffect(() => {
    async function handlePostAuth() {
      if (user && !userRole && selectedRole && !isCreatingUser) {
        setIsCreatingUser(true)

        // For employers, check if email domain is blocked
        if (selectedRole === 'employer' && user.email && isBlockedDomain(user.email)) {
          setError({
            email: user.email,
            message: 'Please use your work email to sign up as an employer. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.'
          })
          setStep('error')
          setIsCreatingUser(false)
          return
        }

        // Create user record with selected role
        const { error: createError } = await createUserRecord(selectedRole)
        if (createError) {
          setError({ message: createError.message })
          setIsCreatingUser(false)
          return
        }

        // Redirect to profile/company setup
        const redirectPath = selectedRole === 'employer' ? '/company/profile' : '/dashboard/profile'
        router.replace(redirectPath)
      }
    }

    handlePostAuth()
  }, [user, userRole, selectedRole, isCreatingUser, createUserRecord, router])

  // If already authenticated with a role, redirect
  useEffect(() => {
    if (isAuthenticated && userRole) {
      const redirectPath = userRole === 'employer' ? '/company' : '/dashboard'
      router.replace(redirectPath)
    }
  }, [isAuthenticated, userRole, router])

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setStep('auth')
  }

  const handleRetry = () => {
    setStep('role')
    setSelectedRole(null)
    setError(null)
  }

  const handleSwitchToEmployee = () => {
    setSelectedRole('employee')
    setError(null)
    setStep('auth')
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
        <Link href="/login" className="btn btn-ghost">
          Log in
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">

          {/* Step 1: Role Selection */}
          {step === 'role' && (
            <div className="card animate-fade-in">
              <h1 className="text-display text-2xl text-center mb-2">Join Vibe Jobs</h1>
              <p className="text-center text-[var(--color-text-muted)] mb-8">
                How do you want to use Vibe Jobs?
              </p>

              <div className="grid gap-4">
                <button
                  onClick={() => handleRoleSelect('employee')}
                  className="card card-interactive text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="group-hover:text-[var(--color-accent)] transition-colors">I&apos;m looking for work</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Find jobs where AI skills are valued
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('employer')}
                  className="card card-interactive text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="group-hover:text-[var(--color-accent)] transition-colors">I&apos;m hiring</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Find AI-fluent candidates for your team
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Auth Options */}
          {step === 'auth' && (
            <div className="card animate-fade-in">
              <button
                onClick={() => { setStep('role'); setSelectedRole(null); }}
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <h1 className="text-display text-2xl text-center mb-2">
                {selectedRole === 'employee' ? 'Create your profile' : 'Create employer account'}
              </h1>
              <p className="text-center text-[var(--color-text-muted)] mb-8">
                {selectedRole === 'employee'
                  ? 'Sign up to start applying to AI-forward companies'
                  : 'Sign up with your work email to post jobs'
                }
              </p>

              {selectedRole === 'employer' && (
                <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-medium text-[var(--color-text-primary)]">Work email required</p>
                      <p className="text-[var(--color-text-muted)]">
                        Employer accounts require a company email address. Personal emails (Gmail, Yahoo, etc.) are not accepted.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {error?.message && step === 'auth' && (
                <div className="alert alert-error mb-6">
                  {error.message}
                </div>
              )}

              <OAuthButtons mode="signup" role={selectedRole || undefined} />

              <p className="text-xs text-center text-[var(--color-text-muted)] mt-6">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}

          {/* Error State - Personal Email for Employer */}
          {step === 'error' && (
            <div className="card animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h1 className="text-display text-2xl text-center mb-2">Work email required</h1>
              <p className="text-center text-[var(--color-text-muted)] mb-6">
                {error?.message}
              </p>

              {error?.email && (
                <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4 mb-6">
                  <div className="text-sm">
                    <p className="text-[var(--color-text-muted)]">You signed in with:</p>
                    <p className="font-mono text-[var(--color-text-primary)]">{error.email}</p>
                  </div>
                </div>
              )}

              <div className="grid gap-3">
                <button
                  onClick={handleRetry}
                  className="btn btn-primary w-full justify-center"
                >
                  Try with work email
                </button>
                <button
                  onClick={handleSwitchToEmployee}
                  className="btn btn-ghost w-full justify-center"
                >
                  Sign up as job seeker instead
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="container text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-accent)] hover:underline">
            Log in
          </Link>
        </div>
      </footer>
    </div>
  )
}
