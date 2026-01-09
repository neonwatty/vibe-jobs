'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useJob, useSavedJobs, useApplications } from '@/hooks/useJobs'
import { formatSalary, formatRelativeDate, calculateToolMatch, getMatchLevel } from '@/lib/utils'

interface Job {
  id: string
  title: string
  description?: string
  requirements?: string[]
  nice_to_have?: string[]
  benefits?: string[]
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  location_type?: string
  location_details?: string | null
  experience_level?: string
  employment_type?: string
  ai_tools_required?: string[]
  ai_proficiency?: string
  how_youll_be_tested?: string
  created_at?: string
  company?: {
    id: string
    name?: string
    description?: string | null
    website?: string | null
    logo_url?: string | null
    company_size?: string | null
    industry?: string | null
    headquarters?: string | null
    remote_policy?: string | null
    ai_culture?: string | null
    ai_tools_used?: string[]
    domain_verified?: boolean
  } | null
}

interface JobDetailClientProps {
  jobId: string
  initialJob: Job | null
}

export default function JobDetailClient({ jobId, initialJob }: JobDetailClientProps) {
  const router = useRouter()
  const { isAuthenticated, profile, isEmployee } = useAuth()

  // Use the hook but fall back to initial data for immediate render
  const { job: fetchedJob, loading, error } = useJob(jobId)
  const job = fetchedJob || initialJob

  const { isSaved, toggleSave } = useSavedJobs(profile?.id)
  const { hasApplied, apply } = useApplications(profile?.id)

  const [showApplyModal, setShowApplyModal] = useState(false)
  const [coverMessage, setCoverMessage] = useState('')
  const [applying, setApplying] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)

  // Get user's tools for matching
  const userTools = profile?.ai_tools || []

  if (loading && !initialJob) {
    return (
      <div className="min-h-screen bg-grid flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" style={{ width: 40, height: 40 }} />
          <p className="text-[var(--color-text-muted)]">Loading job...</p>
        </div>
      </div>
    )
  }

  if ((error || !job) && !loading) {
    return (
      <div className="min-h-screen bg-grid flex items-center justify-center">
        <div className="card text-center max-w-md">
          <h2 className="text-xl mb-4">Job not found</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            This job may have been removed or is no longer available.
          </p>
          <Link href="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
        </div>
      </div>
    )
  }

  if (!job) return null

  const {
    title,
    description,
    requirements = [],
    nice_to_have = [],
    benefits = [],
    salary_min,
    salary_max,
    location_type,
    location_details,
    experience_level,
    employment_type,
    ai_tools_required = [],
    ai_proficiency,
    how_youll_be_tested,
    created_at,
    company,
  } = job

  // Calculate tool match
  const matchingTools = ai_tools_required.filter(tool => userTools.includes(tool))
  const matchPercent = calculateToolMatch(userTools, ai_tools_required)
  const matchLevel = getMatchLevel(matchPercent)

  const handleApply = async () => {
    if (!isAuthenticated || !profile) return

    setApplying(true)
    setApplyError(null)

    try {
      await apply(jobId, coverMessage)
      setShowApplyModal(false)
      setCoverMessage('')
    } catch (err) {
      setApplyError((err as Error).message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  const applied = hasApplied(jobId)
  const saved = isSaved(jobId)

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/jobs" className="btn btn-ghost">All Jobs</Link>
          {isAuthenticated ? (
            <Link href={isEmployee ? '/dashboard' : '/company'} className="btn btn-secondary">
              Dashboard
            </Link>
          ) : (
            <Link href="/signup" className="btn btn-primary">Create profile</Link>
          )}
        </div>
      </nav>

      <main className="container py-8">
        {/* Back link */}
        <button
          onClick={() => router.push('/jobs')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to jobs
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-display text-2xl">{title}</h1>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                    <span>{company?.name}</span>
                    {company?.domain_verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-secondary)]">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <span>·</span>
                    <span>{location_details || location_type}</span>
                  </div>
                </div>
                <span className="badge text-lg">{formatSalary(salary_min, salary_max)}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge capitalize">{employment_type?.replace('_', ' ')}</span>
                <span className="badge capitalize">{experience_level}</span>
                <span className="badge capitalize">{location_type}</span>
                {ai_proficiency && (
                  <span className="badge capitalize">{ai_proficiency} AI proficiency</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {ai_tools_required.map(tool => (
                  <span
                    key={tool}
                    className={`badge ${matchingTools.includes(tool) ? 'badge-accent' : ''}`}
                  >
                    {tool}
                    {matchingTools.includes(tool) && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>

              {/* Tool match indicator */}
              {isAuthenticated && isEmployee && profile && ai_tools_required.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    matchPercent === 100 ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' :
                    matchPercent >= 50 ? 'bg-[var(--color-secondary)] text-[var(--color-bg-primary)]' :
                    'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]'
                  }`}>
                    {matchPercent}%
                  </div>
                  <div>
                    <p className="text-sm font-medium">{matchLevel.label}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      You use {matchingTools.length} of {ai_tools_required.length} required AI tools
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {applied ? (
                  <button disabled className="btn btn-secondary flex-1 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Applied
                  </button>
                ) : isAuthenticated && isEmployee ? (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="btn btn-primary flex-1 justify-center"
                  >
                    Apply Now
                  </button>
                ) : (
                  <Link
                    href={`/signup?redirect=/jobs/${jobId}`}
                    className="btn btn-primary flex-1 justify-center"
                  >
                    Sign up to Apply
                  </Link>
                )}
                {isAuthenticated && isEmployee && (
                  <button
                    onClick={() => toggleSave(jobId)}
                    className={`btn ${saved ? 'btn-secondary' : 'btn-ghost'}`}
                  >
                    <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {saved ? 'Saved' : 'Save'}
                  </button>
                )}
              </div>
            </div>

            {/* How You'll Be Tested - THE DIFFERENTIATOR */}
            <div className="card border-[var(--color-accent)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">How You&apos;ll Be Tested</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{how_youll_be_tested}</p>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-muted)]">
                  No surprise LeetCode. No whiteboard algorithms. Just practical skills with the tools you&apos;ll actually use.
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">About This Role</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">{description}</p>
              </div>
            </div>

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[var(--color-text-secondary)]">{req}</span>
                    </li>
                  ))}
                </ul>

                {nice_to_have.length > 0 && (
                  <>
                    <h3 className="text-md font-semibold mt-6 mb-4">Nice to Have</h3>
                    <ul className="space-y-3">
                      {nice_to_have.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="text-[var(--color-text-muted)]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Benefits</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                      <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)]">
                  {company?.logo_url ? (
                    <img src={company.logo_url} alt={company.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    company?.name?.[0]
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{company?.name}</h3>
                  {company?.domain_verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-secondary)]">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified employer
                    </span>
                  )}
                </div>
              </div>

              {company?.description && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">{company.description}</p>
              )}

              <div className="space-y-3 text-sm">
                {company?.company_size && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-text-muted)]">Company size</span>
                    <span>{company.company_size} employees</span>
                  </div>
                )}
                {company?.ai_culture && (
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--color-text-muted)]">AI Culture</span>
                    <span className="badge badge-accent text-xs capitalize">{company.ai_culture}</span>
                  </div>
                )}
              </div>

              {company?.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost w-full justify-center mt-4"
                >
                  Visit Website
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>

            {/* Posted date */}
            <div className="card">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Posted</p>
                  <p className="font-medium">{formatRelativeDate(created_at)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Apply to {company?.name}</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-[var(--color-text-muted)] mb-4">
                Applying as <strong className="text-[var(--color-text-primary)]">
                  {profile?.first_name} {profile?.last_name}
                </strong>
              </p>

              {matchingTools.length > 0 && (
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium mb-2">Your matching AI tools:</p>
                  <div className="flex flex-wrap gap-2">
                    {matchingTools.map(tool => (
                      <span key={tool} className="badge badge-accent text-xs">{tool}</span>
                    ))}
                  </div>
                </div>
              )}

              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                COVER MESSAGE (OPTIONAL)
              </label>
              <textarea
                value={coverMessage}
                onChange={(e) => setCoverMessage(e.target.value)}
                placeholder="Tell them why you're interested and what makes you a great fit..."
                className="w-full h-32 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />

              {applyError && (
                <div className="alert alert-error mt-4">
                  {applyError}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn btn-ghost flex-1"
                disabled={applying}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="btn btn-primary flex-1"
                disabled={applying}
              >
                {applying ? (
                  <>
                    <div className="spinner w-4 h-4" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
