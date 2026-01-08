import { useState } from 'react'

const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    status: 'active',
    applicants: 18,
    newApplicants: 5,
    views: 245,
    salary: '$180k - $220k',
    location: 'Remote',
    postedDate: '2026-01-06',
    aiTools: ['Cursor', 'Claude', 'v0'],
  },
  {
    id: 2,
    title: 'Product Designer',
    status: 'active',
    applicants: 12,
    newApplicants: 3,
    views: 189,
    salary: '$140k - $180k',
    location: 'San Francisco, CA',
    postedDate: '2026-01-03',
    aiTools: ['Figma AI', 'Midjourney', 'ChatGPT'],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    status: 'active',
    applicants: 9,
    newApplicants: 2,
    views: 156,
    salary: '$150k - $190k',
    location: 'Remote',
    postedDate: '2026-01-01',
    aiTools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    status: 'active',
    applicants: 8,
    newApplicants: 2,
    views: 134,
    salary: '$160k - $200k',
    location: 'Remote',
    postedDate: '2025-12-25',
    aiTools: ['ChatGPT', 'GitHub Copilot'],
  },
  {
    id: 5,
    title: 'Marketing Manager',
    status: 'closed',
    applicants: 24,
    newApplicants: 0,
    views: 312,
    salary: '$120k - $150k',
    location: 'New York, NY',
    postedDate: '2025-12-15',
    aiTools: ['ChatGPT', 'Jasper', 'Notion AI'],
  },
  {
    id: 6,
    title: 'Backend Engineer',
    status: 'draft',
    applicants: 0,
    newApplicants: 0,
    views: 0,
    salary: '$170k - $210k',
    location: 'Remote',
    postedDate: null,
    aiTools: ['Claude Code', 'GitHub Copilot'],
  },
]

const STATUS_TABS = [
  { value: 'all', label: 'All Jobs' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'draft', label: 'Drafts' },
]

export default function EmployerJobs({ navigate }) {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredJobs = SAMPLE_JOBS.filter(job => {
    if (statusFilter === 'all') return true
    return job.status === statusFilter
  })

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not published'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return { label: 'Active', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
      case 'closed':
        return { label: 'Closed', color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border-[var(--color-border)]' }
      case 'draft':
        return { label: 'Draft', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const jobCounts = {
    all: SAMPLE_JOBS.length,
    active: SAMPLE_JOBS.filter(j => j.status === 'active').length,
    closed: SAMPLE_JOBS.filter(j => j.status === 'closed').length,
    draft: SAMPLE_JOBS.filter(j => j.status === 'draft').length,
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
          <button onClick={() => navigate('employer-dashboard')} className="btn btn-ghost">Dashboard</button>
          <button onClick={() => navigate('job-post-new')} className="btn btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post Job
          </button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-display-lg mb-2">My Jobs</h1>
            <p className="text-[var(--color-text-muted)]">
              Manage your job postings and view applicants
            </p>
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[var(--color-border)] pb-4">
          {STATUS_TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                statusFilter === tab.value
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                  : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-1.5 py-0.5 rounded text-xs ${
                statusFilter === tab.value
                  ? 'bg-[var(--color-bg-primary)]/20'
                  : 'bg-[var(--color-bg-secondary)]'
              }`}>
                {jobCounts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        {/* Jobs list */}
        <div className="space-y-4">
          {filteredJobs.map(job => {
            const statusBadge = getStatusBadge(job.status)
            return (
              <div key={job.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs border ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
                      <span>{job.salary}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                      <span>·</span>
                      <span>Posted {formatDate(job.postedDate)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.aiTools.map(tool => (
                        <span key={tool} className="badge badge-accent text-xs">{tool}</span>
                      ))}
                    </div>

                    {job.status === 'active' && (
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span><strong>{job.applicants}</strong> applicants</span>
                          {job.newApplicants > 0 && (
                            <span className="px-1.5 py-0.5 rounded text-xs bg-[var(--color-accent)] text-[var(--color-bg-primary)]">
                              +{job.newApplicants} new
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span><strong>{job.views}</strong> views</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {job.status === 'active' && (
                      <button
                        onClick={() => navigate('employer-applicants')}
                        className="btn btn-primary text-sm"
                      >
                        View Applicants
                      </button>
                    )}
                    {job.status === 'draft' && (
                      <button
                        onClick={() => navigate('job-edit')}
                        className="btn btn-primary text-sm"
                      >
                        Continue Editing
                      </button>
                    )}
                    <button
                      onClick={() => navigate('job-edit')}
                      className="btn btn-ghost text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      Edit
                    </button>
                    <button className="btn btn-ghost text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              {statusFilter !== 'all'
                ? `You don't have any ${statusFilter} jobs`
                : "You haven't posted any jobs yet"}
            </p>
            <button
              onClick={() => navigate('job-post-new')}
              className="btn btn-primary"
            >
              Post Your First Job
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
