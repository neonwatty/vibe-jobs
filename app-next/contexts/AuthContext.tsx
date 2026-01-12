'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/lib/database.types'

// Create supabase client at module level to avoid recreating on each render
const supabase = createClient()

// Use database types for Profile and Company
type DBProfile = Tables<'profiles'>
type DBCompany = Tables<'companies'>

// Extended interfaces that allow partial data
interface Profile extends Partial<DBProfile> {
  id: string
  user_id: string
}

interface Company extends Partial<DBCompany> {
  id: string
  user_id: string
}

interface AuthContextType {
  // State
  user: User | null
  userRole: string | null
  profile: Profile | null
  company: Company | null
  loading: boolean
  error: string | null

  // Computed
  isAuthenticated: boolean
  isEmployee: boolean
  isEmployer: boolean
  hasProfile: boolean
  hasCompany: boolean

  // Auth methods
  signInWithGoogle: (role?: string) => Promise<{ error: Error | null }>
  signInWithGitHub: (role?: string) => Promise<{ error: Error | null }>
  signInWithEmail: (email: string, password: string) => Promise<{ data?: unknown; error: Error | null }>
  signUpWithEmail: (email: string, password: string) => Promise<{ data?: unknown; error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  createUserRecord: (role: string) => Promise<{ error: Error | null }>

  // Profile/Company methods
  createProfile: (profileData: Partial<Profile>) => Promise<{ data?: Profile; error: Error | null }>
  updateProfile: (profileData: Partial<Profile>) => Promise<{ data?: Profile; error: Error | null }>
  createCompany: (companyData: Partial<Company>) => Promise<{ data?: Company; error: Error | null }>
  updateCompany: (companyData: Partial<Company>) => Promise<{ data?: Company; error: Error | null }>

  // Utilities
  clearError: () => void
  refreshUserData: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Helper functions for localStorage caching
const COMPANY_CACHE_KEY = 'vibejobs_company_cache'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCachedCompany(userId: string): Company | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(COMPANY_CACHE_KEY)
    if (cached) {
      const { data, userId: cachedUserId, timestamp } = JSON.parse(cached)
      if (cachedUserId === userId && Date.now() - timestamp < CACHE_TTL) {
        return data
      }
    }
  } catch {
    // Ignore cache errors
  }
  return null
}

function setCachedCompany(userId: string, data: Company | null) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify({
      data,
      userId,
      timestamp: Date.now()
    }))
  } catch {
    // Ignore cache errors
  }
}

function clearCachedCompany() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(COMPANY_CACHE_KEY)
  } catch {
    // Ignore cache errors
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /**
   * Refresh company data in background (used after cache hit)
   */
  const refreshCompanyData = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from('companies')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (data) {
        setCompany(data as Company)
        setCachedCompany(userId, data as Company)
      }
    } catch {
      // Ignore refresh errors
    }
  }, [])

  /**
   * Fetch user role and associated data (profile or company)
   * Uses localStorage cache for company data to improve load times
   */
  const fetchUserData = useCallback(async (userId: string) => {
    try {
      // Check for cached company data first (for employers)
      const cachedCompany = getCachedCompany(userId)
      if (cachedCompany) {
        setCompany(cachedCompany)
        setUserRole('employer')
        setLoading(false)
        // Refresh in background
        refreshCompanyData(userId)
        return
      }

      // Fetch user role, profile, and company in parallel for speed
      // Most users will only have one of profile/company, so the unused query returns null
      const [userResult, profileResult, companyResult] = await Promise.all([
        supabase.from('users').select('role').eq('id', userId).single(),
        supabase.from('profiles').select('*').eq('user_id', userId).single(),
        supabase.from('companies').select('*').eq('user_id', userId).single(),
      ])

      if (userResult.error) {
        // User record doesn't exist yet (new signup)
        setUserRole(null)
        setLoading(false)
        return
      }

      const role = userResult.data.role
      setUserRole(role)

      // Set the appropriate data based on role
      if (role === 'employee') {
        setProfile(profileResult.data as Profile | null)
      } else if (role === 'employer') {
        const companyData = companyResult.data as Company | null
        setCompany(companyData)
        // Cache company data for faster subsequent loads
        if (companyData) {
          setCachedCompany(userId, companyData)
        }
      }
    } catch (err) {
      console.error('Error fetching user data:', err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [refreshCompanyData])

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
  }, [fetchUserData])

  /**
   * Sign in with Google OAuth
   */
  async function signInWithGoogle(role?: string): Promise<{ error: Error | null }> {
    setError(null)
    const redirectUrl = new URL('/auth/callback', window.location.origin)
    if (role) {
      redirectUrl.searchParams.set('role', role)
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl.toString(),
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
  async function signInWithGitHub(role?: string): Promise<{ error: Error | null }> {
    setError(null)
    const redirectUrl = new URL('/auth/callback', window.location.origin)
    if (role) {
      redirectUrl.searchParams.set('role', role)
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl.toString()
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
  async function signInWithEmail(email: string, password: string): Promise<{ data?: unknown; error: Error | null }> {
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
  async function signUpWithEmail(email: string, password: string): Promise<{ data?: unknown; error: Error | null }> {
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
  async function signOut(): Promise<{ error: Error | null }> {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setUser(null)
      setUserRole(null)
      setProfile(null)
      setCompany(null)
      clearCachedCompany()
    }
    return { error }
  }

  /**
   * Create user record with role after OAuth signup
   */
  async function createUserRecord(role: string): Promise<{ error: Error | null }> {
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
        email: user.email!,
        role: role as Enums<'user_type'>
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
   */
  async function createProfile(profileData: Partial<Profile>): Promise<{ data?: Profile; error: Error | null }> {
    if (!user) {
      return { error: new Error('No authenticated user') }
    }

    // Build the insert data with required fields
    const insertData: TablesInsert<'profiles'> = {
      user_id: user.id,
      email: profileData.email || user.email!,
      first_name: profileData.first_name || '',
      last_name: profileData.last_name || '',
      ...(profileData.headline && { headline: profileData.headline }),
      ...(profileData.role_type && { role_type: profileData.role_type as Enums<'role_category'> }),
      ...(profileData.ai_tools && { ai_tools: profileData.ai_tools }),
      ...(profileData.availability && { availability: profileData.availability as Enums<'availability_status'> }),
      ...(profileData.profile_complete !== undefined && { profile_complete: profileData.profile_complete }),
      ...(profileData.location && { location: profileData.location }),
      ...(profileData.linkedin_url && { linkedin_url: profileData.linkedin_url }),
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setProfile(data as Profile)
    return { data: data as Profile, error: null }
  }

  /**
   * Update employee profile
   */
  async function updateProfile(profileData: Partial<Profile>): Promise<{ data?: Profile; error: Error | null }> {
    if (!user || !profile) {
      return { error: new Error('No profile to update') }
    }

    // Build update data with proper enum casting
    const updateData: TablesUpdate<'profiles'> = {}
    if (profileData.first_name !== undefined) updateData.first_name = profileData.first_name
    if (profileData.last_name !== undefined) updateData.last_name = profileData.last_name
    if (profileData.email !== undefined) updateData.email = profileData.email
    if (profileData.headline !== undefined) updateData.headline = profileData.headline
    if (profileData.role_type !== undefined) updateData.role_type = profileData.role_type as Enums<'role_category'>
    if (profileData.ai_tools !== undefined) updateData.ai_tools = profileData.ai_tools
    if (profileData.availability !== undefined) updateData.availability = profileData.availability as Enums<'availability_status'>
    if (profileData.profile_complete !== undefined) updateData.profile_complete = profileData.profile_complete
    if (profileData.location !== undefined) updateData.location = profileData.location
    if (profileData.linkedin_url !== undefined) updateData.linkedin_url = profileData.linkedin_url

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', profile.id)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setProfile(data as Profile)
    return { data: data as Profile, error: null }
  }

  /**
   * Create company record
   */
  async function createCompany(companyData: Partial<Company>): Promise<{ data?: Company; error: Error | null }> {
    if (!user) {
      return { error: new Error('No authenticated user') }
    }

    // Get email domain from user email
    const emailDomain = companyData.email_domain || user.email?.split('@')[1] || ''

    // Build insert data with required fields
    const insertData: TablesInsert<'companies'> = {
      user_id: user.id,
      name: companyData.name || '',
      email_domain: emailDomain,
      ...(companyData.description && { description: companyData.description }),
      ...(companyData.website && { website: companyData.website }),
      ...(companyData.logo_url && { logo_url: companyData.logo_url }),
      ...(companyData.company_size && { company_size: companyData.company_size }),
      ...(companyData.industry && { industry: companyData.industry }),
      ...(companyData.headquarters && { headquarters: companyData.headquarters }),
      ...(companyData.remote_policy && { remote_policy: companyData.remote_policy }),
      ...(companyData.ai_culture && { ai_culture: companyData.ai_culture }),
      ...(companyData.ai_tools_used && { ai_tools_used: companyData.ai_tools_used }),
    }

    const { data, error } = await supabase
      .from('companies')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      setError(error.message)
      return { error }
    }

    setCompany(data as Company)
    return { data: data as Company, error: null }
  }

  /**
   * Update company record
   */
  async function updateCompany(companyData: Partial<Company>): Promise<{ data?: Company; error: Error | null }> {
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

    setCompany(data as Company)
    return { data: data as Company, error: null }
  }

  /**
   * Clear any auth errors
   */
  function clearError() {
    setError(null)
  }

  const value: AuthContextType = {
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
    refreshUserData: async () => {
      if (user) {
        await fetchUserData(user.id)
      }
    }
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
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
