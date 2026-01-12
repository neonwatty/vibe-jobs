'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useCompanyJobs, CompanyJob } from '@/hooks/useCompanyJobs'
import { formatSalary, formatRelativeDate } from '@/lib/utils'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'badge' },
  active: { label: 'Active', color: 'badge-accent' },
  paused: { label: 'Paused', color: 'badge-secondary' },
  closed: { label: 'Closed', color: '' },
}

function JobRow({ job, onStatusChange, onDelete }: {
  job: CompanyJob
  onStatusChange: (jobId: string, status: string) => void
  onDelete: (jobId: string) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const statusInfo = STATUS_LABELS[job.status] || STATUS_LABELS.draft

  return (
    <div className="card mb-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/jobs/${job.id}`}
              className="text-lg font-semibold hover:text-[var(--color-accent)] transition-colors"
            >
              {job.title}
            </Link>
            <span className={`badge ${statusInfo.color}`}>{statusInfo.label}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-3">
            <span>{formatSalary(job.salary_min, job.salary_max)}</span>
            <span>·</span>
            <span className="capitalize">{job.location_type}</span>
            <span>·</span>
            <span className="capitalize">{job.experience_level}</span>
            <span>·</span>
            <span>Posted {formatRelativeDate(job.created_at)}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              href={`/company/jobs/${job.id}/applications`}
              className="text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {job.application_count || 0} applicant{(job.application_count || 0) !== 1 ? 's' : ''}
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn btn-ghost p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-lg z-20">
                <Link
                  href={`/company/jobs/${job.id}/edit`}
                  className="block px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)]"
                  onClick={() => setShowMenu(false)}
                >
                  Edit Job
                </Link>
                {job.status === 'active' && (
                  <button
                    onClick={() => {
                      onStatusChange(job.id, 'paused')
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)]"
                  >
                    Pause Job
                  </button>
                )}
                {job.status === 'paused' && (
                  <button
                    onClick={() => {
                      onStatusChange(job.id, 'active')
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)]"
                  >
                    Activate Job
                  </button>
                )}
                {job.status === 'draft' && (
                  <button
                    onClick={() => {
                      onStatusChange(job.id, 'active')
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)]"
                  >
                    Publish Job
                  </button>
                )}
                {job.status !== 'closed' && (
                  <button
                    onClick={() => {
                      onStatusChange(job.id, 'closed')
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-bg-tertiary)]"
                  >
                    Close Job
                  </button>
                )}
                <hr className="border-[var(--color-border)]" />
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
                      onDelete(job.id)
                    }
                    setShowMenu(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[var(--color-bg-tertiary)]"
                >
                  Delete Job
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ManageJobsPage() {
  const router = useRouter()
  const { loading: authLoading, isAuthenticated, isEmployer, company, user } = useAuth()

  const {
    jobs,
    loading,
    error,
    updateJobStatus,
    deleteJob,
  } = useCompanyJobs(company?.id)

  const [actionError, setActionError] = useState<string | null>(null)

  // Redirect logic - only redirect when we're sure about auth state
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/company/jobs')
    }
    if (!authLoading && isAuthenticated && !isEmployer) {
      router.push('/dashboard')
    }
  }, [authLoading, isAuthenticated, isEmployer, router])

  const handleStatusChange = async (jobId: string, status: string) => {
    setActionError(null)
    try {
      await updateJobStatus(jobId, status)
    } catch (err) {
      setActionError((err as Error).message || 'Failed to update job status')
    }
  }

  const handleDelete = async (jobId: string) => {
    setActionError(null)
    try {
      await deleteJob(jobId)
    } catch (err) {
      setActionError((err as Error).message || 'Failed to delete job')
    }
  }

  // Show loading only when we don't have user info yet
  if (authLoading && !user) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--color-bg-tertiary)] rounded w-1/3 mb-8" />
            <div className="card mb-4">
              <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-4" />
              <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-3/4" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Only block if we're sure user isn't authenticated or isn't employer
  if (!authLoading && (!isAuthenticated || !isEmployer)) {
    return null
  }

  const activeJobs = jobs.filter(j => j.status === 'active')
  const draftJobs = jobs.filter(j => j.status === 'draft')
  const pausedJobs = jobs.filter(j => j.status === 'paused')
  const closedJobs = jobs.filter(j => j.status === 'closed')

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-2xl mb-2">Manage Jobs</h1>
            <p className="text-[var(--color-text-muted)]">
              View and manage your job postings
            </p>
          </div>
          <Link href="/company/jobs/new" className="btn btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Post New Job
          </Link>
        </div>

        {(error || actionError) && (
          <div className="alert alert-error mb-6">
            {error || actionError}
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-4" />
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No jobs yet</h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Post your first job to start receiving applications
            </p>
            <Link href="/company/jobs/new" className="btn btn-primary">
              Post Your First Job
            </Link>
          </div>
        ) : (
          <>
            {/* Active Jobs */}
            {activeJobs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                  Active Jobs ({activeJobs.length})
                </h2>
                {activeJobs.map(job => (
                  <JobRow
                    key={job.id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}

            {/* Draft Jobs */}
            {draftJobs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                  Drafts ({draftJobs.length})
                </h2>
                {draftJobs.map(job => (
                  <JobRow
                    key={job.id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}

            {/* Paused Jobs */}
            {pausedJobs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">
                  Paused ({pausedJobs.length})
                </h2>
                {pausedJobs.map(job => (
                  <JobRow
                    key={job.id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}

            {/* Closed Jobs */}
            {closedJobs.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4 text-[var(--color-text-muted)]">
                  Closed ({closedJobs.length})
                </h2>
                {closedJobs.map(job => (
                  <JobRow
                    key={job.id}
                    job={job}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
