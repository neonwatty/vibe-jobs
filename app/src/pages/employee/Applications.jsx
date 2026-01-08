import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useApplications } from '../../hooks/useJobs'
import { formatSalary, formatDate } from '../../lib/utils'
import DashboardLayout from '../../components/layout/DashboardLayout'

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
]

/**
 * Employee applications page
 */
export default function Applications() {
  const { profile } = useAuth()
  const { applications, loading, withdrawApplication } = useApplications(profile?.id)

  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const getStatusBadge = (status) => {
    switch (status) {
      case 'interviewing':
        return { label: 'Interviewing', color: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20' }
      case 'pending':
        return { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
      case 'offer':
        return { label: 'Offer', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
      case 'withdrawn':
        return { label: 'Withdrawn', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const filteredApplications = applications?.filter(app => {
    if (statusFilter === 'all') return true
    return app.status === statusFilter
  }) || []

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at)
    }
    return 0
  })

  const statusCounts = STATUS_OPTIONS.filter(s => s.value !== 'all').reduce((acc, status) => {
    acc[status.value] = applications?.filter(a => a.status === status.value).length || 0
    return acc
  }, {})

  const handleWithdraw = async (applicationId) => {
    if (!confirm('Are you sure you want to withdraw this application?')) return
    try {
      await withdrawApplication(applicationId)
    } catch (err) {
      console.error('Failed to withdraw:', err)
    }
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-display text-display-lg mb-2">My Applications</h1>
          <p className="text-[var(--color-text-muted)]">
            Track the status of all your job applications
          </p>
        </div>
        <Link to="/jobs" className="btn btn-primary">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find More Jobs
        </Link>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {STATUS_OPTIONS.filter(s => s.value !== 'all').map(status => {
          const count = statusCounts[status.value]
          const badge = getStatusBadge(status.value)
          return (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              className={`card text-center py-4 transition-colors ${
                statusFilter === status.value ? 'border-[var(--color-accent)]' : ''
              }`}
            >
              <div className="text-2xl font-bold mb-1">{count}</div>
              <div className={`text-sm ${badge.color.split(' ')[1]}`}>{status.label}</div>
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {STATUS_OPTIONS.map(status => (
            <button
              key={status.value}
              onClick={() => setStatusFilter(status.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                statusFilter === status.value
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                  : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
        >
          <option value="recent">Most recent</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* Applications list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="card animate-pulse">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)]" />
                <div className="flex-1">
                  <div className="h-5 bg-[var(--color-bg-tertiary)] rounded w-1/3 mb-2" />
                  <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-4" />
                  <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedApplications.length > 0 ? (
        <div className="space-y-4">
          {sortedApplications.map(app => {
            const statusBadge = getStatusBadge(app.status)
            return (
              <div
                key={app.id}
                className="card hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)] shrink-0">
                    {app.job?.company?.logo_url ? (
                      <img src={app.job.company.logo_url} alt="" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      app.job?.company?.name?.[0] || 'C'
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link
                          to={`/jobs/${app.job_id}`}
                          className="font-semibold text-lg hover:text-[var(--color-accent)] transition-colors"
                        >
                          {app.job?.title}
                        </Link>
                        <p className="text-[var(--color-text-muted)]">
                          {app.job?.company?.name} · {app.job?.location_details || app.job?.location_type}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm border ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-3">
                      <span>{formatSalary(app.job?.salary_min, app.job?.salary_max)}</span>
                      <span>·</span>
                      <span>Applied {formatDate(app.created_at)}</span>
                      {app.updated_at !== app.created_at && (
                        <>
                          <span>·</span>
                          <span>Updated {formatDate(app.updated_at)}</span>
                        </>
                      )}
                    </div>

                    {app.cover_message && (
                      <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-lg mb-3">
                        <p className="text-sm text-[var(--color-text-muted)]">
                          <span className="text-[var(--color-text-secondary)]">Your message:</span>{' '}
                          {app.cover_message}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/jobs/${app.job_id}`}
                        className="btn btn-ghost text-sm"
                      >
                        View Job
                      </Link>
                      {app.status === 'pending' && (
                        <button
                          onClick={() => handleWithdraw(app.id)}
                          className="btn btn-ghost text-sm text-red-400 hover:text-red-300"
                        >
                          Withdraw
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No applications found</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            {statusFilter !== 'all'
              ? `You don't have any ${statusFilter} applications`
              : "You haven't applied to any jobs yet"}
          </p>
          <Link to="/jobs" className="btn btn-primary">
            Browse Jobs
          </Link>
        </div>
      )}
    </DashboardLayout>
  )
}
