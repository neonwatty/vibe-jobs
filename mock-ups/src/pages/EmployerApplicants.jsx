import { useState } from 'react'

const SAMPLE_JOB = {
  id: 1,
  title: 'Senior Frontend Engineer',
  salary: '$180k - $220k',
  location: 'Remote',
  postedDate: '2026-01-06',
  requiredTools: ['Cursor', 'Claude', 'v0'],
}

const SAMPLE_APPLICANTS = [
  {
    id: 1,
    name: 'Alex Chen',
    headline: 'AI-First Frontend Engineer',
    location: 'San Francisco, CA',
    yearsExperience: 5,
    aiTools: ['Cursor', 'Claude', 'Claude Code', 'v0', 'GitHub Copilot'],
    skills: ['React', 'TypeScript', 'Next.js'],
    status: 'new',
    appliedDate: '2026-01-07',
    matchPercent: 100,
    coverLetter: "I'm excited to apply for this role. I've been using Cursor and Claude daily for the past year...",
  },
  {
    id: 2,
    name: 'Sarah Kim',
    headline: 'Senior React Developer',
    location: 'New York, NY',
    yearsExperience: 6,
    aiTools: ['Cursor', 'ChatGPT', 'GitHub Copilot'],
    skills: ['React', 'Node.js', 'GraphQL'],
    status: 'reviewed',
    appliedDate: '2026-01-06',
    matchPercent: 67,
    coverLetter: null,
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    headline: 'Full Stack Engineer',
    location: 'Austin, TX',
    yearsExperience: 7,
    aiTools: ['Claude Code', 'Cursor', 'v0', 'Claude'],
    skills: ['React', 'Python', 'AWS'],
    status: 'interviewing',
    appliedDate: '2026-01-05',
    matchPercent: 100,
    coverLetter: "Your focus on AI-native development aligns perfectly with how I work...",
  },
  {
    id: 4,
    name: 'Emily Zhang',
    headline: 'Frontend Developer',
    location: 'Seattle, WA',
    yearsExperience: 3,
    aiTools: ['GitHub Copilot', 'ChatGPT'],
    skills: ['Vue.js', 'React', 'CSS'],
    status: 'rejected',
    appliedDate: '2026-01-04',
    matchPercent: 0,
    coverLetter: null,
  },
  {
    id: 5,
    name: 'David Park',
    headline: 'React Native Developer',
    location: 'Los Angeles, CA',
    yearsExperience: 4,
    aiTools: ['Cursor', 'Claude', 'Expo'],
    skills: ['React Native', 'TypeScript', 'iOS'],
    status: 'new',
    appliedDate: '2026-01-07',
    matchPercent: 67,
    coverLetter: "While my background is primarily in mobile, I'm eager to transition to web...",
  },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'rejected', label: 'Rejected' },
]

export default function EmployerApplicants({ navigate, jobId }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('match')
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const job = SAMPLE_JOB

  const filteredApplicants = SAMPLE_APPLICANTS.filter(app => {
    if (statusFilter === 'all') return true
    return app.status === statusFilter
  })

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    if (sortBy === 'match') return b.matchPercent - a.matchPercent
    if (sortBy === 'recent') return new Date(b.appliedDate) - new Date(a.appliedDate)
    if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience
    return 0
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return { label: 'New', color: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20' }
      case 'interviewing':
        return { label: 'Interviewing', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const updateStatus = (applicantId, newStatus) => {
    // In real app, would update backend
    console.log('Update status', applicantId, newStatus)
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
          <button onClick={() => navigate('employer-jobs')} className="btn btn-ghost">My Jobs</button>
          <button onClick={() => navigate('employer-dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Back link */}
        <button
          onClick={() => navigate('employer-jobs')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to jobs
        </button>

        {/* Job Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-display text-2xl mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
                <span>{job.salary}</span>
                <span>·</span>
                <span>{job.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => navigate('job-edit')} className="btn btn-ghost">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Job
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {job.requiredTools.map(tool => (
              <span key={tool} className="badge badge-accent">{tool}</span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {STATUS_OPTIONS.map(option => (
              <button
                key={option.value}
                onClick={() => setStatusFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  statusFilter === option.value
                    ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                    : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
          >
            <option value="match">Best match</option>
            <option value="recent">Most recent</option>
            <option value="experience">Most experienced</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-[var(--color-text-muted)] mb-6">
          {sortedApplicants.length} applicant{sortedApplicants.length !== 1 ? 's' : ''}
        </p>

        {/* Applicants list */}
        <div className="space-y-4">
          {sortedApplicants.map(applicant => {
            const statusBadge = getStatusBadge(applicant.status)
            const matchingTools = applicant.aiTools.filter(t => job.requiredTools.includes(t))

            return (
              <div
                key={applicant.id}
                className="card hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                onClick={() => setSelectedApplicant(applicant)}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)] shrink-0">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{applicant.name}</h3>
                        <p className="text-[var(--color-text-muted)]">{applicant.headline}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          applicant.matchPercent === 100 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                          applicant.matchPercent >= 50 ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' :
                          'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                        }`}>
                          {applicant.matchPercent}% match
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs border ${statusBadge.color}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-3">
                      <span>{applicant.location}</span>
                      <span>·</span>
                      <span>{applicant.yearsExperience} years exp</span>
                      <span>·</span>
                      <span>Applied {formatDate(applicant.appliedDate)}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {applicant.aiTools.slice(0, 5).map(tool => (
                        <span
                          key={tool}
                          className={`badge text-xs ${matchingTools.includes(tool) ? 'badge-accent' : ''}`}
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
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => navigate('talent-profile')}
                      className="btn btn-primary text-sm"
                    >
                      View Profile
                    </button>
                    <div className="relative group">
                      <button className="btn btn-ghost text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button
                          onClick={() => updateStatus(applicant.id, 'reviewed')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                          Mark as Reviewed
                        </button>
                        <button
                          onClick={() => updateStatus(applicant.id, 'interviewing')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                          Move to Interview
                        </button>
                        <button
                          onClick={() => updateStatus(applicant.id, 'rejected')}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[var(--color-bg-tertiary)] transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {sortedApplicants.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No applicants yet</h3>
            <p className="text-[var(--color-text-muted)]">
              Check back soon or try browsing the talent pool
            </p>
          </div>
        )}
      </main>

      {/* Applicant detail modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)]">
                  {selectedApplicant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{selectedApplicant.name}</h2>
                  <p className="text-[var(--color-text-muted)]">{selectedApplicant.headline}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Match</p>
                <p className="font-bold text-lg">{selectedApplicant.matchPercent}%</p>
              </div>
              <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Experience</p>
                <p className="font-bold text-lg">{selectedApplicant.yearsExperience} years</p>
              </div>
              <div className="p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="text-sm text-[var(--color-text-muted)]">Location</p>
                <p className="font-bold text-lg">{selectedApplicant.location}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-mono text-xs text-[var(--color-text-muted)] mb-2">AI TOOLS</h3>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant.aiTools.map(tool => {
                  const isMatch = job.requiredTools.includes(tool)
                  return (
                    <span key={tool} className={`badge ${isMatch ? 'badge-accent' : ''}`}>
                      {tool}
                      {isMatch && <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    </span>
                  )
                })}
              </div>
            </div>

            {selectedApplicant.coverLetter && (
              <div className="mb-6">
                <h3 className="text-mono text-xs text-[var(--color-text-muted)] mb-2">COVER LETTER</h3>
                <p className="text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] p-4 rounded-lg">
                  {selectedApplicant.coverLetter}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedApplicant(null)
                  navigate('talent-profile')
                }}
                className="btn btn-primary flex-1"
              >
                View Full Profile
              </button>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
