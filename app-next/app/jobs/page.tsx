'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useJobs, useSavedJobs, useApplications } from '@/hooks/useJobs'
import JobCard from '@/components/jobs/JobCard'
import JobFilters from '@/components/jobs/JobFilters'

export default function JobListings() {
  const { isAuthenticated, profile, isEmployee } = useAuth()

  const {
    jobs,
    loading,
    error,
    filters,
    sortBy,
    updateFilters,
    clearFilters,
    setSortBy,
  } = useJobs()

  const { isSaved, toggleSave } = useSavedJobs(profile?.id)
  const { hasApplied, apply } = useApplications(profile?.id)

  // Get user's tools for matching
  const userTools = profile?.ai_tools || []

  const handleQuickApply = async (jobId: string) => {
    if (!isAuthenticated) return
    try {
      await apply(jobId)
    } catch (err) {
      console.error('Failed to apply:', err)
    }
  }

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href={isAuthenticated ? (isEmployee ? '/dashboard' : '/company') : '/'}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href={isEmployee ? '/dashboard' : '/company'} className="btn btn-ghost">
                Dashboard
              </Link>
              {isEmployee && !profile && (
                <Link href="/dashboard/profile" className="btn btn-primary">
                  Create Profile
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">Log in</Link>
              <Link href="/signup" className="btn btn-primary">Create profile</Link>
            </>
          )}
        </div>
      </nav>

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <JobFilters
              filters={filters}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2>{loading ? 'Loading...' : `${jobs.length} jobs`}</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-muted)]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="salary">Highest salary</option>
                </select>
              </div>
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
                    <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-2/3 mb-4" />
                    <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-4" />
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                      <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-16" />
                    </div>
                    <div className="h-px bg-[var(--color-border)] my-4" />
                    <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    userTools={userTools}
                    isSaved={isSaved(job.id)}
                    hasApplied={hasApplied(job.id)}
                    onSave={isAuthenticated && isEmployee ? toggleSave : undefined}
                    onApply={isAuthenticated && isEmployee ? handleQuickApply : undefined}
                  />
                ))}

                {jobs.length === 0 && !loading && (
                  <div className="card text-center py-12">
                    <p className="text-[var(--color-text-muted)] mb-4">No jobs match your filters</p>
                    <button
                      onClick={clearFilters}
                      className="btn btn-secondary"
                    >
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
