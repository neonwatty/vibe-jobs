'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables, Enums } from '@/lib/database.types'

type DBProfile = Tables<'profiles'>

// Project type stored in raw_json
export interface TalentProject {
  id: string
  name: string
  description: string
  repo_url: string
  demo_url: string
  tech_stack: string[]
}

// Profile type for talent listings (public-facing profile data)
export interface TalentProfile {
  id: string
  first_name: string
  last_name: string
  headline: string | null
  location: string | null
  role_type: Enums<'role_category'>
  ai_tools: string[]
  availability: Enums<'availability_status'>
  portfolio_urls: string[]
  linkedin_url: string | null
  profile_complete: boolean
  created_at: string
  raw_json: { projects?: TalentProject[] } | null
}

interface TalentFilters {
  roleType: string
  availability: string
  tools: string[]
  search: string
}

/**
 * Hook for fetching and managing talent profiles from Supabase
 */
export function useTalent(initialFilters: Partial<TalentFilters> = {}) {
  const [profiles, setProfiles] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<TalentFilters>({
    roleType: 'all',
    availability: 'all',
    tools: [],
    search: '',
    ...initialFilters,
  })

  const supabase = useMemo(() => createClient(), [])

  const fetchProfiles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          headline,
          location,
          role_type,
          ai_tools,
          availability,
          portfolio_urls,
          linkedin_url,
          profile_complete,
          created_at,
          raw_json
        `)
        .eq('profile_complete', true)

      // Apply filters
      if (filters.roleType !== 'all') {
        query = query.eq('role_type', filters.roleType as Enums<'role_category'>)
      }

      if (filters.availability !== 'all') {
        query = query.eq('availability', filters.availability as Enums<'availability_status'>)
      }

      if (filters.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,headline.ilike.%${filters.search}%`)
      }

      // Order by most recent first
      query = query.order('created_at', { ascending: false })

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      // Filter by AI tools on client side (JSONB contains query is complex)
      let filteredData = (data || []) as TalentProfile[]
      if (filters.tools.length > 0) {
        filteredData = filteredData.filter((profile) => {
          const profileTools = profile.ai_tools || []
          return filters.tools.some(tool => profileTools.includes(tool))
        })
      }

      setProfiles(filteredData)
    } catch (err) {
      // Ignore AbortError - happens when React Strict Mode double-mounts
      const error = err as { name?: string; message?: string }
      if (error?.name === 'AbortError' || error?.message?.toLowerCase().includes('abort')) {
        return
      }
      console.error('Error fetching profiles:', err)
      setError(error?.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [filters, supabase])

  useEffect(() => {
    fetchProfiles()
  }, [fetchProfiles])

  const updateFilters = useCallback((newFilters: Partial<TalentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      roleType: 'all',
      availability: 'all',
      tools: [],
      search: '',
    })
  }, [])

  return {
    profiles,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    refetch: fetchProfiles,
  }
}

/**
 * Hook for fetching a single talent profile by ID
 */
export function useTalentProfile(profileId: string | null) {
  const [profile, setProfile] = useState<DBProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!profileId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single()

        if (fetchError) throw fetchError

        setProfile(data)
      } catch (err) {
        // Ignore AbortError - happens when React Strict Mode double-mounts
        const error = err as { name?: string; message?: string }
        if (error?.name === 'AbortError' || error?.message?.toLowerCase().includes('abort')) {
          return
        }
        console.error('Error fetching profile:', err)
        setError(error?.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [profileId, supabase])

  return { profile, loading, error }
}

export type { TalentFilters }
