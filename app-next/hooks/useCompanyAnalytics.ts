'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Enums } from '@/lib/database.types'

type ApplicationStatus = Enums<'application_status'>
type JobStatus = Enums<'job_status'>

interface ApplicationsByStatus {
  status: ApplicationStatus
  count: number
  [key: string]: string | number // Index signature for Recharts compatibility
}

interface ApplicationsOverTime {
  date: string
  count: number
}

interface TopJob {
  id: string
  title: string
  applicationCount: number
  status: Enums<'job_status'>
}

interface AnalyticsData {
  totalJobs: number
  activeJobs: number
  totalApplications: number
  applicationsByStatus: ApplicationsByStatus[]
  applicationsOverTime: ApplicationsOverTime[]
  topJobs: TopJob[]
  recentApplications: Array<{
    id: string
    jobTitle: string
    candidateName: string
    status: ApplicationStatus
    createdAt: string
  }>
}

export function useCompanyAnalytics(companyId: string | null | undefined) {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    if (!companyId) {
      setLoading(false)
      return
    }

    const fetchAnalytics = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch all jobs for this company
        const { data: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, status, created_at')
          .eq('company_id', companyId)

        if (jobsError) throw jobsError

        const jobIds = jobs?.map(j => j.id) || []
        const totalJobs = jobs?.length || 0
        const activeJobs = jobs?.filter(j => j.status === 'active').length || 0

        // Fetch all applications for these jobs
        const { data: applications, error: appsError } = await supabase
          .from('applications')
          .select(`
            id,
            status,
            created_at,
            job_id,
            profile:profiles(first_name, last_name)
          `)
          .in('job_id', jobIds.length > 0 ? jobIds : ['none'])
          .order('created_at', { ascending: false })

        if (appsError) throw appsError

        const allApplications = applications || []
        const totalApplications = allApplications.length

        // Applications by status
        const statusCounts: Record<ApplicationStatus, number> = {
          pending: 0,
          reviewing: 0,
          interviewing: 0,
          offered: 0,
          rejected: 0,
          withdrawn: 0,
        }
        allApplications.forEach(app => {
          statusCounts[app.status]++
        })
        const applicationsByStatus: ApplicationsByStatus[] = Object.entries(statusCounts)
          .map(([status, count]) => ({ status: status as ApplicationStatus, count }))
          .filter(item => item.count > 0)

        // Applications over time (last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const dateCountMap: Record<string, number> = {}
        // Initialize all dates in range
        for (let i = 0; i < 30; i++) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const dateStr = date.toISOString().split('T')[0]
          dateCountMap[dateStr] = 0
        }

        allApplications.forEach(app => {
          const dateStr = app.created_at.split('T')[0]
          if (dateCountMap[dateStr] !== undefined) {
            dateCountMap[dateStr]++
          }
        })

        const applicationsOverTime: ApplicationsOverTime[] = Object.entries(dateCountMap)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => a.date.localeCompare(b.date))

        // Top jobs by application count
        const jobApplicationCounts: Record<string, number> = {}
        allApplications.forEach(app => {
          jobApplicationCounts[app.job_id] = (jobApplicationCounts[app.job_id] || 0) + 1
        })

        const topJobs: TopJob[] = (jobs || [])
          .map(job => ({
            id: job.id,
            title: job.title,
            applicationCount: jobApplicationCounts[job.id] || 0,
            status: job.status as JobStatus,
          }))
          .sort((a, b) => b.applicationCount - a.applicationCount)
          .slice(0, 5)

        // Recent applications
        const recentApplications = allApplications.slice(0, 10).map(app => {
          const job = jobs?.find(j => j.id === app.job_id)
          const profile = app.profile as { first_name: string; last_name: string } | null
          return {
            id: app.id,
            jobTitle: job?.title || 'Unknown',
            candidateName: profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown',
            status: app.status,
            createdAt: app.created_at,
          }
        })

        setData({
          totalJobs,
          activeJobs,
          totalApplications,
          applicationsByStatus,
          applicationsOverTime,
          topJobs,
          recentApplications,
        })
      } catch (err) {
        console.error('Error fetching analytics:', err)
        setError((err as Error).message || 'Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [companyId, supabase])

  return { data, loading, error }
}

// Status labels and colors for display
export const STATUS_CONFIG: Record<ApplicationStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: '#f59e0b' },
  reviewing: { label: 'Reviewing', color: '#3b82f6' },
  interviewing: { label: 'Interviewing', color: '#8b5cf6' },
  offered: { label: 'Offered', color: '#10b981' },
  rejected: { label: 'Rejected', color: '#ef4444' },
  withdrawn: { label: 'Withdrawn', color: '#6b7280' },
}
