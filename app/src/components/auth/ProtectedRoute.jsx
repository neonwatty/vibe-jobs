import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

/**
 * Protected route wrapper that redirects unauthenticated users
 * and optionally restricts by user role
 */
export function ProtectedRoute({ children, allowedRole }) {
  const { user, userRole, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // No role yet - redirect to complete signup
  if (!userRole) {
    return <Navigate to="/signup" state={{ from: location }} replace />
  }

  // Role restriction check
  if (allowedRole && userRole !== allowedRole) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = userRole === 'employer' ? '/company' : '/dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute
