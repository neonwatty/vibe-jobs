import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { OAuthButtons } from '../../components/auth/OAuthButtons'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, userRole, error: authError, clearError } = useAuth()
  const [error, setError] = useState(null)

  // Get the intended destination after login
  const from = location.state?.from?.pathname

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && userRole) {
      const redirectPath = from || (userRole === 'employer' ? '/company' : '/dashboard')
      navigate(redirectPath, { replace: true })
    }
  }, [isAuthenticated, userRole, from, navigate])

  // Clear errors on mount
  useEffect(() => {
    clearError()
  }, [])

  const handleAuthError = (errorMessage) => {
    setError(errorMessage)
  }

  return (
    <div className="min-h-screen bg-grid flex flex-col">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          to="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <Link to="/signup" className="btn btn-ghost">
          Sign up
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="card animate-fade-in">
            <h1 className="text-display text-2xl text-center mb-2">Welcome back</h1>
            <p className="text-center text-[var(--color-text-muted)] mb-8">
              Log in to your Vibe Jobs account
            </p>

            {(error || authError) && (
              <div className="alert alert-error mb-6">
                {error || authError}
              </div>
            )}

            <OAuthButtons onError={handleAuthError} />

            <p className="text-xs text-center text-[var(--color-text-muted)] mt-6">
              By logging in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="container text-center text-sm text-[var(--color-text-muted)]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[var(--color-accent)] hover:underline">
            Sign up
          </Link>
        </div>
      </footer>
    </div>
  )
}
