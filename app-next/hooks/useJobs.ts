'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables, Enums } from '@/lib/database.types'

type DBJob = Tables<'jobs'>
type DBCompany = Tables<'companies'>
type DBApplication = Tables<'applications'>

// Company subset returned from list queries
type JobListCompany = Pick<DBCompany, 'id' | 'name' | 'logo_url' | 'ai_culture' | 'domain_verified'>

// Company subset returned from detail queries
type JobDetailCompany = Pick<DBCompany, 'id' | 'name' | 'logo_url' | 'ai_culture' | 'domain_verified' | 'description' | 'website' | 'company_size' | 'industry' | 'headquarters' | 'remote_policy' | 'ai_tools_used'>

// Job type for list views
interface JobListItem extends DBJob {
  company: JobListCompany | null
}

// Job type for detail views
interface JobDetailItem extends DBJob {
  company: JobDetailCompany | null
}

// Application with nested job
interface ApplicationWithJob extends DBApplication {
  job: {
    id: string
    title: string
    salary_min: number
    salary_max: number
    location_type: Enums<'location_type'>
    location_details: string | null
    company: Pick<DBCompany, 'id' | 'name' | 'logo_url'> | null
  } | null
}

interface Filters {
  category: string
  salaryMin: number
  locationType: string
  experienceLevel: string
  tools: string[]
  search: string
}

/**
 * Hook for fetching and managing jobs from Supabase
 */
export function useJobs(initialFilters: Partial<Filters> = {}) {
  const [jobs, setJobs] = useState<JobListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    salaryMin: 0,
    locationType: 'all',
    experienceLevel: 'all',
    tools: [],
    search: '',
    ...initialFilters,
  })
  const [sortBy, setSortBy] = useState('newest')
  const [refetchCounter, setRefetchCounter] = useState(0)

  const supabase = useMemo(() => createClient(), [])
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    const fetchJobs = async () => {
      setLoading(true)
      setError(null)

      try {
        let query = supabase
          .from('jobs')
          .select(`
            *,
            company:companies(
              id,
              name,
              logo_url,
              ai_culture,
              domain_verified
            )
          `)
          .eq('status', 'active')

        // Apply filters
        if (filters.category !== 'all') {
          query = query.eq('role_category', filters.category as Enums<'role_category'>)
        }

        if (filters.salaryMin > 0) {
          query = query.gte('salary_max', filters.salaryMin)
        }

        if (filters.locationType !== 'all') {
          query = query.eq('location_type', filters.locationType as Enums<'location_type'>)
        }

        if (filters.experienceLevel !== 'all') {
          query = query.eq('experience_level', filters.experienceLevel as Enums<'experience_level'>)
        }

        if (filters.search) {
          query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
        }

        // Apply sorting
        if (sortBy === 'newest') {
          query = query.order('created_at', { ascending: false })
        } else if (sortBy === 'salary') {
          query = query.order('salary_max', { ascending: false })
        }

        const { data, error: fetchError } = await query

        // Only update state if still mounted
        if (!isMountedRef.current) {
          return
        }

        if (fetchError) throw fetchError

        // Filter by AI tools on client side (JSONB contains query is complex)
        let filteredData = (data || []) as JobListItem[]
        if (filters.tools.length > 0) {
          filteredData = filteredData.filter((job) => {
            const jobTools = job.ai_tools_required || []
            return filters.tools.some(tool => jobTools.includes(tool))
          })
        }

        setJobs(filteredData)
      } catch (err) {
        // Ignore AbortError or if unmounted
        if (!isMountedRef.current) return
        const error = err as { name?: string; message?: string }
        if (error?.name === 'AbortError' || error?.message?.toLowerCase().includes('abort')) {
          return
        }
        console.error('Error fetching jobs:', err)
        setError(error?.message || 'Unknown error')
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    }

    fetchJobs()

    return () => {
      isMountedRef.current = false
    }
  }, [filters, sortBy, supabase, refetchCounter])

  const refetch = useCallback(() => {
    setRefetchCounter(c => c + 1)
  }, [])

  const updateFilters = useCallback((newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      salaryMin: 0,
      locationType: 'all',
      experienceLevel: 'all',
      tools: [],
      search: '',
    })
  }, [])

  return {
    jobs,
    loading,
    error,
    filters,
    sortBy,
    updateFilters,
    clearFilters,
    setSortBy,
    refetch,
  }
}

/**
 * Hook for fetching a single job by ID
 */
export function useJob(jobId: string | null) {
  const [job, setJob] = useState<JobDetailItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!jobId) {
      setLoading(false)
      return
    }

    const fetchJob = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select(`
            *,
            company:companies(
              id,
              name,
              description,
              website,
              logo_url,
              company_size,
              industry,
              headquarters,
              remote_policy,
              ai_culture,
              ai_tools_used,
              domain_verified
            )
          `)
          .eq('id', jobId)
          .single()

        if (fetchError) throw fetchError

        setJob(data as JobDetailItem)
      } catch (err) {
        // Ignore AbortError - happens when React Strict Mode double-mounts
        const error = err as { name?: string; message?: string }
        if (error?.name === 'AbortError' || error?.message?.toLowerCase().includes('abort')) {
          return
        }
        console.error('Error fetching job:', err)
        setError(error?.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [jobId, supabase])

  return { job, loading, error }
}

/**
 * Hook for managing saved jobs
 */
export function useSavedJobs(profileId: string | null | undefined) {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!profileId) {
      setLoading(false)
      return
    }

    const fetchSavedJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('saved_jobs')
          .select('job_id')
          .eq('profile_id', profileId)

        if (error) throw error

        setSavedJobs(new Set((data || []).map(s => s.job_id)))
      } catch (err) {
        console.error('Error fetching saved jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedJobs()
  }, [profileId, supabase])

  const toggleSave = async (jobId: string) => {
    if (!profileId) return

    const isSavedJob = savedJobs.has(jobId)

    try {
      if (isSavedJob) {
        await supabase
          .from('saved_jobs')
          .delete()
          .eq('profile_id', profileId)
          .eq('job_id', jobId)

        setSavedJobs(prev => {
          const next = new Set(prev)
          next.delete(jobId)
          return next
        })
      } else {
        await supabase
          .from('saved_jobs')
          .insert({ profile_id: profileId, job_id: jobId })

        setSavedJobs(prev => new Set([...prev, jobId]))
      }
    } catch (err) {
      console.error('Error toggling saved job:', err)
    }
  }

  const isSaved = (jobId: string) => savedJobs.has(jobId)

  return { savedJobs, toggleSave, isSaved, loading }
}

/**
 * Hook for managing applications
 */
export function useApplications(profileId: string | null | undefined) {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([])
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!profileId) {
      setLoading(false)
      return
    }

    const fetchApplications = async () => {
      setLoading(true)
      try {
        const { data, error: fetchError } = await supabase
          .from('applications')
          .select(`
            *,
            job:jobs(
              id,
              title,
              salary_min,
              salary_max,
              location_type,
              location_details,
              company:companies(
                id,
                name,
                logo_url
              )
            )
          `)
          .eq('profile_id', profileId)
          .order('created_at', { ascending: false })

        if (fetchError) throw fetchError

        setApplications((data || []) as ApplicationWithJob[])
        setAppliedJobIds(new Set((data || []).map(a => a.job_id)))
      } catch (err) {
        // Ignore AbortError - happens when React Strict Mode double-mounts
        const error = err as { name?: string; message?: string }
        if (error?.name === 'AbortError' || error?.message?.toLowerCase().includes('abort')) {
          return
        }
        console.error('Error fetching applications:', err)
        setError(error?.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [profileId, supabase])

  const apply = async (jobId: string, coverMessage: string = '') => {
    if (!profileId) throw new Error('Must be logged in to apply')

    try {
      const { data, error: applyError } = await supabase
        .from('applications')
        .insert({
          job_id: jobId,
          profile_id: profileId,
          cover_message: coverMessage,
          status: 'pending',
        })
        .select()
        .single()

      if (applyError) throw applyError

      setAppliedJobIds(prev => new Set([...prev, jobId]))
      return data
    } catch (err) {
      console.error('Error applying to job:', err)
      throw err
    }
  }

  const hasApplied = (jobId: string) => appliedJobIds.has(jobId)

  const withdrawApplication = async (applicationId: string) => {
    if (!profileId) throw new Error('No profile ID')

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: 'withdrawn' })
        .eq('id', applicationId)
        .eq('profile_id', profileId)

      if (error) throw error

      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'withdrawn' as const } : app
        )
      )
    } catch (err) {
      console.error('Error withdrawing application:', err)
      throw err
    }
  }

  return {
    applications,
    loading,
    error,
    apply,
    hasApplied,
    withdrawApplication,
  }
}

// Export types for use in other components
export type { JobListItem, JobDetailItem, ApplicationWithJob, Filters }
