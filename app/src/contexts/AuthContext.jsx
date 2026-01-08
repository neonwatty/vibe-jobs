import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [profile, setProfile] = useState(null)
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserData(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserData(session.user.id)
        } else {
          setUserRole(null)
          setProfile(null)
          setCompany(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Fetch user role and associated data (profile or company)
   */
  async function fetchUserData(userId) {
    try {
      // First, get the user's role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

      if (userError) {
        // User record doesn't exist yet (new signup)
        setUserRole(null)
        setLoading(false)
        return
      }

      setUserRole(userData.role)

      // Fetch associated profile or company
      if (userData.role === 'employee') {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single()

        setProfile(profileData)
      } else if (userData.role === 'employer') {
        const { data: companyData } = await supabase
          .from('companies')
          .select('*')
          .eq('user_id', userId)
          .single()

        setCompany(companyData)
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /**
   * Sign in with Google OAuth
   */
  async function signInWithGoogle() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
      return { error }
    }
    return { error: null }
  }

  /**
   * Sign in with GitHub OAuth
   */
  async function signInWithGitHub() {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
      return { error }
    }
    return { error: null }
  }

  /**
   * Sign in with email and password
   */
  async function signInWithEmail(email, password) {
    setError(null)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data, error: null }
  }

  /**
   * Sign up with email and password
   */
  async function signUpWithEmail(email, password) {
    setError(null)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) {
      setError(error.message)
      return { error }
    }
    return { data, error: null }
  }

  /**
   * Sign out
   */
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setUserRole(null)
      setProfile(null)
      setCompany(null)
    }
    return { error }
  }

  /**
   * Create user record with role after OAuth signup
   * @param {string} role - 'employee' or 'employer'
   */
  async function createUserRecord(role) {
    if (!user) {
      return { error: new Error('No authenticated user') }
    }

    setError(null)

    // Check if user record already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single()

    if (existingUser) {
      // User already exists, just update role state
      setUserRole(role)
      return { error: null }
    }

    // Create new user record
    const { error } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        role: role
      })

    if (error) {
      setError(error.message)
      return { error }
    }

    setUserRole(role)
    return { error: null }
  }

  /**
   * Create employee profile
   * @param {object} profileData - Profile data to save
   */
  async function createProfile(profileData) {
    if (!user) {
      return { error: new Error('No authenticated user') }
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.id,
        ...profileData
      })
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setProfile(data)
    return { data, error: null }
  }

  /**
   * Update employee profile
   * @param {object} profileData - Profile data to update
   */
  async function updateProfile(profileData) {
    if (!user || !profile) {
      return { error: new Error('No profile to update') }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', profile.id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setProfile(data)
    return { data, error: null }
  }

  /**
   * Create company record
   * @param {object} companyData - Company data to save
   */
  async function createCompany(companyData) {
    if (!user) {
      return { error: new Error('No authenticated user') }
    }

    const { data, error } = await supabase
      .from('companies')
      .insert({
        user_id: user.id,
        email_domain: user.email.split('@')[1],
        ...companyData
      })
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setCompany(data)
    return { data, error: null }
  }

  /**
   * Update company record
   * @param {object} companyData - Company data to update
   */
  async function updateCompany(companyData) {
    if (!user || !company) {
      return { error: new Error('No company to update') }
    }

    const { data, error } = await supabase
      .from('companies')
      .update(companyData)
      .eq('id', company.id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setCompany(data)
    return { data, error: null }
  }

  /**
   * Clear any auth errors
   */
  function clearError() {
    setError(null)
  }

  const value = {
    // State
    user,
    userRole,
    profile,
    company,
    loading,
    error,

    // Computed
    isAuthenticated: !!user,
    isEmployee: userRole === 'employee',
    isEmployer: userRole === 'employer',
    hasProfile: !!profile,
    hasCompany: !!company,

    // Auth methods
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    createUserRecord,

    // Profile/Company methods
    createProfile,
    updateProfile,
    createCompany,
    updateCompany,

    // Utilities
    clearError,
    refreshUserData: () => user && fetchUserData(user.id)
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
