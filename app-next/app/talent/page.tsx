'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useTalent } from '@/hooks/useTalent'
import TalentCard from '@/components/talent/TalentCard'
import TalentFilters from '@/components/talent/TalentFilters'

export default function TalentPage() {
  const { isAuthenticated, isEmployer } = useAuth()

  const {
    profiles,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
  } = useTalent()

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href={isAuthenticated ? (isEmployer ? '/company' : '/dashboard') : '/'}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href={isEmployer ? '/company' : '/dashboard'} className="btn btn-ghost">
                Dashboard
              </Link>
              {isEmployer && (
                <Link href="/company/jobs/new" className="btn btn-primary">
                  Post a Job
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Log in</Link>
              <Link href="/signup/employer" className="btn btn-primary">Post a Job</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-display text-2xl mb-2">Browse AI-Native Talent</h1>
          <p className="text-[var(--color-text-muted)]">
            Find candidates who ship fast with AI tools
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <TalentFilters
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Talent Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2>{loading ? 'Loading...' : `${profiles.length} candidates`}</h2>
            </div>

            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}

            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card animate-pulse">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-[var(--color-bg-tertiary)]" />
                      <div className="flex-1">
                        <div className="h-5 bg-[var(--color-bg-tertiary)] rounded w-1/3 mb-2" />
                        <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/2" />
                      </div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {profiles.map(profile => (
                  <TalentCard key={profile.id} profile={profile} />
                ))}

                {profiles.length === 0 && !loading && (
                  <div className="card text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
                    <p className="text-[var(--color-text-muted)] mb-4">
                      Try adjusting your filters to find more candidates
                    </p>
                    <button onClick={clearFilters} className="btn btn-secondary">
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
