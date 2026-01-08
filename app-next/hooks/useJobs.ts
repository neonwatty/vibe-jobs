'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Job {
  id: string
  title: string
  salary_min?: number
  salary_max?: number
  salary_currency?: string
  location_type?: string
  location_details?: string
  experience_level?: string
  ai_tools_required?: string[]
  ai_proficiency?: string
  how_youll_be_tested?: string
  description?: string
  requirements?: string[]
  nice_to_have?: string[]
  benefits?: string[]
  role_category?: string
  employment_type?: string
  status?: string
  created_at?: string
  company?: {
    id: string
    name?: string
    logo_url?: string
    ai_culture?: string
    domain_verified?: boolean
    description?: string
    website?: string
    size?: string
    industry?: string
    headquarters?: string
    remote_policy?: string
    ai_tools_used?: string[]
  }
}

interface Application {
  id: string
  job_id: string
  profile_id: string
  status: string
  cover_message?: string
  created_at: string
  updated_at: string
  job?: Job
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
  const [jobs, setJobs] = useState<Job[]>([])
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

  const supabase = createClient()

  const fetchJobs = useCallback(async () => {
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
        query = query.eq('role_category', filters.category)
      }

      if (filters.salaryMin > 0) {
        query = query.gte('salary_max', filters.salaryMin)
      }

      if (filters.locationType !== 'all') {
        query = query.eq('location_type', filters.locationType)
      }

      if (filters.experienceLevel !== 'all') {
        query = query.eq('experience_level', filters.experienceLevel)
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

      if (fetchError) throw fetchError

      // Filter by AI tools on client side (JSONB contains query is complex)
      let filteredData = data || []
      if (filters.tools.length > 0) {
        filteredData = filteredData.filter((job: Job) => {
          const jobTools = job.ai_tools_required || []
          return filters.tools.some(tool => jobTools.includes(tool))
        })
      }

      setJobs(filteredData)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [filters, sortBy, supabase])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

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
    refetch: fetchJobs,
  }
}

/**
 * Hook for fetching a single job by ID
 */
export function useJob(jobId: string | null) {
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

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
              size,
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

        setJob(data)
      } catch (err) {
        console.error('Error fetching job:', err)
        setError((err as Error).message)
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

  const supabase = createClient()

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
  const [applications, setApplications] = useState<Application[]>([])
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

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

        setApplications((data || []) as Application[])
        setAppliedJobIds(new Set((data || []).map(a => a.job_id)))
      } catch (err) {
        console.error('Error fetching applications:', err)
        setError((err as Error).message)
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
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: 'withdrawn' })
        .eq('id', applicationId)
        .eq('profile_id', profileId)

      if (error) throw error

      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId ? { ...app, status: 'withdrawn' } : app
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
