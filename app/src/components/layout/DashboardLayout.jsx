import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Shared dashboard layout for authenticated pages
 */
export default function DashboardLayout({ children }) {
  const location = useLocation()
  const { user, userRole, profile, company, signOut } = useAuth()

  const isEmployer = userRole === 'employer'
  const dashboardPath = isEmployer ? '/company' : '/dashboard'

  // Get display name
  const displayName = isEmployer
    ? company?.name || user?.email
    : profile?.first_name || user?.email?.split('@')[0]

  // Get initials
  const initials = isEmployer
    ? (company?.name?.[0] || 'C')
    : `${profile?.first_name?.[0] || ''}${profile?.last_name?.[0] || 'U'}`

  const employeeLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/jobs', label: 'Browse Jobs' },
    { path: '/dashboard/applications', label: 'Applications' },
    { path: '/dashboard/profile', label: 'Profile' },
    { path: '/dashboard/mcp', label: 'MCP Access' },
  ]

  const employerLinks = [
    { path: '/company', label: 'Dashboard' },
    { path: '/company/jobs', label: 'Manage Jobs' },
    { path: '/company/jobs/new', label: 'Post Job' },
    { path: '/talent', label: 'Browse Talent' },
    { path: '/company/profile', label: 'Company' },
    { path: '/company/mcp', label: 'MCP Access' },
  ]

  const links = isEmployer ? employerLinks : employeeLinks

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="border-b border-[var(--color-border)]">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
            >
              vibe<span className="text-[var(--color-accent)]">jobs</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === link.path
                      ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                {initials}
              </div>
              <span className="text-sm hidden sm:block">{displayName}</span>
            </div>
            <button
              onClick={signOut}
              className="btn btn-ghost text-sm"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container py-8">
        {children}
      </main>
    </div>
  )
}
