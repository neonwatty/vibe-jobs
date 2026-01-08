export default function EmployeeDashboard({ navigate }) {
  // Mock data
  const user = {
    name: 'Alex Chen',
    headline: 'AI-First Frontend Engineer',
    profileComplete: 85,
    availability: 'actively_looking',
  }

  const stats = {
    applications: 12,
    interviews: 3,
    saved: 8,
    views: 47,
  }

  const recentApplications = [
    { id: 1, company: 'Acme Corp', role: 'Senior Frontend Engineer', status: 'interviewing', appliedDaysAgo: 2 },
    { id: 2, company: 'StartupXYZ', role: 'Full Stack Developer', status: 'pending', appliedDaysAgo: 5 },
    { id: 3, company: 'TechGiant', role: 'React Developer', status: 'reviewed', appliedDaysAgo: 7 },
  ]

  const recommendedJobs = [
    { id: 1, company: 'CloudCo', role: 'Frontend Engineer', salary: '$150k-$180k', match: 95 },
    { id: 2, company: 'AIStartup', role: 'Senior React Dev', salary: '$170k-$200k', match: 88 },
    { id: 3, company: 'DevTools Inc', role: 'UI Engineer', salary: '$140k-$170k', match: 82 },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'interviewing':
        return { label: 'Interviewing', color: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' }
      case 'pending':
        return { label: 'Pending', color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-500/10 text-red-400' }
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
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">Browse Jobs</button>
          <button onClick={() => navigate('profile-setup')} className="btn btn-secondary">Edit Profile</button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-[var(--color-bg-primary)]">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-display text-2xl">Welcome back, {user.name.split(' ')[0]}</h1>
              <p className="text-[var(--color-text-muted)]">{user.headline}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400">
              Actively looking
            </span>
          </div>
        </div>

        {/* Profile completion */}
        {user.profileComplete < 100 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Complete your profile</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  A complete profile gets 3x more views from employers
                </p>
              </div>
              <button
                onClick={() => navigate('profile-setup')}
                className="btn btn-primary text-sm"
              >
                Complete Profile
              </button>
            </div>
            <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-all"
                style={{ width: `${user.profileComplete}%` }}
              />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">{user.profileComplete}% complete</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">{stats.applications}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Applications</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-[var(--color-secondary)] mb-1">{stats.interviews}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Interviews</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold mb-1">{stats.saved}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Saved Jobs</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold mb-1">{stats.views}</div>
            <div className="text-sm text-[var(--color-text-muted)]">Profile Views</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <button
                onClick={() => navigate('employee-applications')}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {recentApplications.map(app => {
                const statusBadge = getStatusBadge(app.status)
                return (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center font-bold">
                        {app.company[0]}
                      </div>
                      <div>
                        <p className="font-medium">{app.role}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {app.company} · {app.appliedDaysAgo}d ago
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recommended for You</h2>
              <button
                onClick={() => navigate('jobs')}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Browse all
              </button>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map(job => (
                <div
                  key={job.id}
                  onClick={() => navigate('job-detail')}
                  className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg cursor-pointer hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-bold text-[var(--color-bg-primary)]">
                      {job.company[0]}
                    </div>
                    <div>
                      <p className="font-medium">{job.role}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {job.company} · {job.salary}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    job.match >= 90 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                    'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                  }`}>
                    {job.match}% match
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <button
            onClick={() => navigate('jobs')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="font-medium">Search Jobs</p>
          </button>
          <button
            onClick={() => navigate('employee-applications')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium">My Applications</p>
          </button>
          <button
            onClick={() => navigate('profile-setup')}
            className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
          >
            <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="font-medium">Edit Profile</p>
          </button>
          <button
            onClick={() => navigate('employee-mcp')}
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
