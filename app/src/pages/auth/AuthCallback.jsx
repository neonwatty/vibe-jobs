import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * OAuth callback handler
 * This page receives the OAuth redirect and handles the session
 */
export default function AuthCallback() {
  const navigate = useNavigate()
  const { user, userRole, loading } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check for error in URL params
    const params = new URLSearchParams(window.location.search)
    const errorDescription = params.get('error_description')

    if (errorDescription) {
      setError(errorDescription)
      return
    }

    // Wait for auth to load
    if (loading) return

    // If user exists but no role, redirect to signup to complete
    if (user && !userRole) {
      // They need to complete signup (select role)
      navigate('/signup', { replace: true })
      return
    }

    // If fully authenticated, redirect to appropriate dashboard
    if (user && userRole) {
      const redirectPath = userRole === 'employer' ? '/company' : '/dashboard'
      navigate(redirectPath, { replace: true })
      return
    }

    // No user means auth failed - redirect to login
    if (!loading && !user) {
      navigate('/login', { replace: true })
    }
  }, [user, userRole, loading, navigate])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-display text-xl mb-2">Authentication Error</h1>
          <p className="text-[var(--color-text-muted)] mb-6">{error}</p>
          <button
            onClick={() => navigate('/login', { replace: true })}
            className="btn btn-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" style={{ width: 40, height: 40 }} />
        <p className="text-[var(--color-text-muted)]">Completing sign in...</p>
      </div>
    </div>
  )
}
