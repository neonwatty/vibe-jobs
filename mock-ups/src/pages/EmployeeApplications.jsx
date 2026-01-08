import { useState } from 'react'

const SAMPLE_APPLICATIONS = [
  {
    id: 1,
    company: 'Acme Corp',
    companyLogo: 'A',
    role: 'Senior Frontend Engineer',
    location: 'Remote',
    salary: '$180k - $220k',
    status: 'interviewing',
    appliedDate: '2026-01-06',
    lastUpdate: '2026-01-07',
    nextStep: 'Technical interview scheduled for Jan 10',
  },
  {
    id: 2,
    company: 'StartupXYZ',
    companyLogo: 'S',
    role: 'Full Stack Developer',
    location: 'San Francisco, CA',
    salary: '$150k - $180k',
    status: 'pending',
    appliedDate: '2026-01-03',
    lastUpdate: '2026-01-03',
    nextStep: null,
  },
  {
    id: 3,
    company: 'TechGiant',
    companyLogo: 'T',
    role: 'React Developer',
    location: 'Remote',
    salary: '$160k - $190k',
    status: 'reviewed',
    appliedDate: '2026-01-01',
    lastUpdate: '2026-01-05',
    nextStep: 'Application under review',
  },
  {
    id: 4,
    company: 'CloudCo',
    companyLogo: 'C',
    role: 'Frontend Engineer',
    location: 'New York, NY',
    salary: '$140k - $170k',
    status: 'rejected',
    appliedDate: '2025-12-28',
    lastUpdate: '2026-01-02',
    nextStep: null,
  },
  {
    id: 5,
    company: 'DevTools Inc',
    companyLogo: 'D',
    role: 'UI Engineer',
    location: 'Remote',
    salary: '$150k - $180k',
    status: 'hired',
    appliedDate: '2025-12-15',
    lastUpdate: '2026-01-04',
    nextStep: 'Offer accepted! Start date: Feb 1',
  },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hired', label: 'Hired' },
]

export default function EmployeeApplications({ navigate }) {
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
      case 'hired':
        return { label: 'Hired', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const filteredApplications = SAMPLE_APPLICATIONS.filter(app => {
    if (statusFilter === 'all') return true
    return app.status === statusFilter
  })

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.appliedDate) - new Date(a.appliedDate)
    }
    return 0
  })

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <button
          onClick={() => navigate('landing')}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">Browse Jobs</button>
          <button onClick={() => navigate('dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-display-lg mb-2">My Applications</h1>
            <p className="text-[var(--color-text-muted)]">
              Track the status of all your job applications
            </p>
          </div>
          <button
            onClick={() => navigate('jobs')}
            className="btn btn-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find More Jobs
          </button>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {STATUS_OPTIONS.filter(s => s.value !== 'all').map(status => {
            const count = SAMPLE_APPLICATIONS.filter(a => a.status === status.value).length
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
          <div className="flex items-center gap-2">
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
        <div className="space-y-4">
          {sortedApplications.map(app => {
            const statusBadge = getStatusBadge(app.status)
            return (
              <div
                key={app.id}
                className="card hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                onClick={() => navigate('job-detail')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)] shrink-0">
                    {app.companyLogo}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{app.role}</h3>
                        <p className="text-[var(--color-text-muted)]">
                          {app.company} · {app.location}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm border ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-3">
                      <span>{app.salary}</span>
                      <span>·</span>
                      <span>Applied {formatDate(app.appliedDate)}</span>
                      <span>·</span>
                      <span>Updated {formatDate(app.lastUpdate)}</span>
                    </div>

                    {app.nextStep && (
                      <div className={`flex items-center gap-2 p-3 rounded-lg ${
                        app.status === 'hired' ? 'bg-green-500/10' :
                        app.status === 'interviewing' ? 'bg-[var(--color-accent)]/10' :
                        'bg-[var(--color-bg-tertiary)]'
                      }`}>
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">{app.nextStep}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {sortedApplications.length === 0 && (
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
            <button
              onClick={() => navigate('jobs')}
              className="btn btn-primary"
            >
              Browse Jobs
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
