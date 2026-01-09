'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/lib/database.types'

type DBJob = Tables<'jobs'>
type DBApplication = Tables<'applications'>
type DBProfile = Tables<'profiles'>

// Job with application count for company dashboard
export interface CompanyJob extends DBJob {
  application_count?: number
}

// Application with profile info for viewing applicants
export interface JobApplication extends DBApplication {
  profile: Pick<DBProfile, 'id' | 'first_name' | 'last_name' | 'email' | 'headline' | 'ai_tools' | 'linkedin_url'> | null
}

/**
 * Hook for managing company's job postings
 */
export function useCompanyJobs(companyId: string | null | undefined) {
  const [jobs, setJobs] = useState<CompanyJob[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchJobs = useCallback(async () => {
    if (!companyId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch jobs
      const { data: jobsData, error: jobsError } = await supabase
        .from('jobs')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false })

      if (jobsError) throw jobsError

      // Fetch application counts for each job
      const jobIds = (jobsData || []).map(j => j.id)
      if (jobIds.length > 0) {
        const { data: countData, error: countError } = await supabase
          .from('applications')
          .select('job_id')
          .in('job_id', jobIds)

        if (countError) throw countError

        // Count applications per job
        const counts: Record<string, number> = {}
        for (const app of (countData || [])) {
          counts[app.job_id] = (counts[app.job_id] || 0) + 1
        }

        // Merge counts with jobs
        const jobsWithCounts = (jobsData || []).map(job => ({
          ...job,
          application_count: counts[job.id] || 0,
        }))

        setJobs(jobsWithCounts)
      } else {
        setJobs([])
      }
    } catch (err) {
      console.error('Error fetching company jobs:', err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [companyId, supabase])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const createJob = async (jobData: Omit<TablesInsert<'jobs'>, 'company_id'>) => {
    if (!companyId) throw new Error('No company ID')

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        ...jobData,
        company_id: companyId,
      })
      .select()
      .single()

    if (error) throw error

    setJobs(prev => [data, ...prev])
    return data
  }

  const updateJob = async (jobId: string, updates: TablesUpdate<'jobs'>) => {
    if (!companyId) throw new Error('No company ID')

    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', jobId)
      .eq('company_id', companyId)
      .select()
      .single()

    if (error) throw error

    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...data } : j))
    return data
  }

  const updateJobStatus = async (jobId: string, status: string) => {
    return updateJob(jobId, { status })
  }

  const deleteJob = async (jobId: string) => {
    if (!companyId) throw new Error('No company ID')

    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('company_id', companyId)

    if (error) throw error

    setJobs(prev => prev.filter(j => j.id !== jobId))
  }

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
    createJob,
    updateJob,
    updateJobStatus,
    deleteJob,
  }
}

/**
 * Hook for fetching applications for a specific job
 */
export function useJobApplications(jobId: string | null, companyId: string | null | undefined) {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  const fetchApplications = useCallback(async () => {
    if (!jobId || !companyId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // First verify this job belongs to the company
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('id')
        .eq('id', jobId)
        .eq('company_id', companyId)
        .single()

      if (jobError || !jobData) {
        throw new Error('Job not found or access denied')
      }

      // Fetch applications with profile info
      const { data, error: fetchError } = await supabase
        .from('applications')
        .select(`
          *,
          profile:profiles(
            id,
            first_name,
            last_name,
            email,
            headline,
            ai_tools,
            linkedin_url
          )
        `)
        .eq('job_id', jobId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setApplications((data || []) as JobApplication[])
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [jobId, companyId, supabase])

  useEffect(() => {
    fetchApplications()
  }, [fetchApplications])

  const updateApplicationStatus = async (
    applicationId: string,
    status: Enums<'application_status'>,
    notes?: string
  ) => {
    const updates: TablesUpdate<'applications'> = { status }
    if (notes !== undefined) {
      updates.employer_notes = notes
    }

    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', applicationId)
      .select()
      .single()

    if (error) throw error

    setApplications(prev =>
      prev.map(app => app.id === applicationId ? { ...app, ...data } as JobApplication : app)
    )
    return data
  }

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    updateApplicationStatus,
  }
}
