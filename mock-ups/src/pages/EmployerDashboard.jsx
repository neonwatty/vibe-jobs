export default function EmployerDashboard({ navigate }) {
  // Mock data
  const company = {
    name: 'Acme Corp',
    logo: 'A',
    verified: true,
    aiCulture: 'AI Expected',
  }

  const stats = {
    activeJobs: 4,
    totalApplicants: 47,
    newApplicants: 12,
    interviews: 5,
  }

  const recentApplicants = [
    { id: 1, name: 'Alex Chen', role: 'Senior Frontend Engineer', match: 95, status: 'new', appliedDaysAgo: 1 },
    { id: 2, name: 'Sarah Kim', role: 'Product Designer', match: 88, status: 'reviewed', appliedDaysAgo: 2 },
    { id: 3, name: 'Marcus Johnson', role: 'Full Stack Developer', match: 92, status: 'interviewing', appliedDaysAgo: 3 },
  ]

  const activeJobs = [
    { id: 1, title: 'Senior Frontend Engineer', applicants: 18, newApplicants: 5, posted: '2 days ago' },
    { id: 2, title: 'Product Designer', applicants: 12, newApplicants: 3, posted: '5 days ago' },
    { id: 3, title: 'Full Stack Developer', applicants: 9, newApplicants: 2, posted: '1 week ago' },
    { id: 4, title: 'DevOps Engineer', applicants: 8, newApplicants: 2, posted: '2 weeks ago' },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return { label: 'New', color: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' }
      case 'interviewing':
        return { label: 'Interviewing', color: 'bg-green-500/10 text-green-400' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
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
          <button onClick={() => navigate('talent-listings')} className="btn btn-ghost">Browse Talent</button>
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-[var(--color-bg-primary)]">
              {company.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-display text-2xl">{company.name}</h1>
                {company.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--color-secondary)]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
              <p className="text-[var(--color-text-muted)]">Employer Dashboard</p>
            </div>
          </div>
          <span className="badge badge-accent">{company.aiCulture}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">{stats.activeJobs}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Active Jobs</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold mb-1">{stats.totalApplicants}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Total Applicants</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-[var(--color-secondary)] mb-1">{stats.newApplicants}</div>
            <div className="text-sm text-[var(--color-text-muted)]">New This Week</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">{stats.interviews}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Interviews</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Applicants */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Applicants</h2>
              <button
                onClick={() => navigate('employer-jobs')}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentApplicants.map(applicant => {
                const statusBadge = getStatusBadge(applicant.status)
                return (
                  <div
                    key={applicant.id}
                    onClick={() => navigate('talent-profile')}
                    className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg cursor-pointer hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-bold text-[var(--color-bg-primary)]">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{applicant.name}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {applicant.role} · {applicant.appliedDaysAgo}d ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        applicant.match >= 90 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                        'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                      }`}>
                        {applicant.match}%
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${statusBadge.color}`}>
                        {statusBadge.label}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Active Jobs */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Active Jobs</h2>
              <button
                onClick={() => navigate('employer-jobs')}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Manage all
              </button>
            </div>
            <div className="space-y-4">
              {activeJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => navigate('employer-applicants')}
                  className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg cursor-pointer hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Posted {job.posted}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">{job.applicants}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">applicants</p>
                    </div>
                    {job.newApplicants > 0 && (
                      <span className="px-2 py-1 rounded-full text-xs bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-medium">
                        +{job.newApplicants} new
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <button
            onClick={() => navigate('job-post-new')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <p className="font-medium">Post a Job</p>
          </button>
          <button
            onClick={() => navigate('talent-listings')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="font-medium">Browse Talent</p>
          </button>
          <button
            onClick={() => navigate('company-profile')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="font-medium">Company Profile</p>
          </button>
          <button
            onClick={() => navigate('employer-mcp')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-medium">MCP Access</p>
          </button>
        </div>
      </main>
    </div>
  )
}
