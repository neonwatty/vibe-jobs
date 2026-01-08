'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useApplications } from '@/hooks/useJobs'
import { createClient } from '@/lib/supabase/client'
import { formatSalary, formatRelativeDate } from '@/lib/utils'
import DashboardLayout from '@/components/layout/DashboardLayout'

interface JobFromDB {
  id: string
  title: string
  salary_min?: number
  salary_max?: number
  ai_tools_required?: string[]
  company?: {
    name?: string
  } | { name?: string }[]
}

interface RecommendedJob extends Omit<JobFromDB, 'company'> {
  company?: {
    name?: string
  }
  match: number
}

export default function EmployeeDashboard() {
  const { profile, hasProfile } = useAuth()
  const { applications, loading: applicationsLoading } = useApplications(profile?.id)

  const [stats, setStats] = useState({
    applications: 0,
    interviews: 0,
    saved: 0,
    views: 0,
  })
  const [recommendedJobs, setRecommendedJobs] = useState<RecommendedJob[]>([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  const supabase = createClient()

  // Calculate stats from applications
  useEffect(() => {
    if (applications) {
      setStats({
        applications: applications.length,
        interviews: applications.filter(a => a.status === 'interviewing').length,
        saved: 0,
        views: 0,
      })
    }
  }, [applications])

  // Fetch saved jobs count
  useEffect(() => {
    if (!profile?.id) return

    const fetchSavedCount = async () => {
      const { count } = await supabase
        .from('saved_jobs')
        .select('*', { count: 'exact', head: true })
        .eq('profile_id', profile.id)

      setStats(prev => ({ ...prev, saved: count || 0 }))
    }

    fetchSavedCount()
  }, [profile?.id, supabase])

  // Fetch recommended jobs
  useEffect(() => {
    if (!profile?.ai_tools) return

    const fetchRecommendedJobs = async () => {
      setLoadingJobs(true)
      try {
        const { data } = await supabase
          .from('jobs')
          .select(`
            id,
            title,
            salary_min,
            salary_max,
            ai_tools_required,
            company:companies(name)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })
          .limit(5)

        const jobsWithMatch: RecommendedJob[] = (data || []).map((job: JobFromDB) => {
          const jobTools = job.ai_tools_required || []
          const userTools = profile.ai_tools || []
          const matching = jobTools.filter(t => userTools.includes(t)).length
          const match = jobTools.length > 0 ? Math.round((matching / jobTools.length) * 100) : 0
          // Handle company which may come as array from Supabase join
          const company = Array.isArray(job.company) ? job.company[0] : job.company
          return { ...job, company, match }
        })

        jobsWithMatch.sort((a, b) => b.match - a.match)
        setRecommendedJobs(jobsWithMatch.slice(0, 3))
      } catch (err) {
        console.error('Error fetching recommended jobs:', err)
      } finally {
        setLoadingJobs(false)
      }
    }

    fetchRecommendedJobs()
  }, [profile?.ai_tools, supabase])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interviewing':
        return { label: 'Interviewing', color: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' }
      case 'reviewed':
        return { label: 'Reviewed', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' }
      case 'pending':
        return { label: 'Pending', color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
      case 'rejected':
        return { label: 'Rejected', color: 'bg-red-500/10 text-red-400' }
      case 'offer':
        return { label: 'Offer', color: 'bg-green-500/10 text-green-400' }
      default:
        return { label: status, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const recentApplications = applications?.slice(0, 3) || []

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-[var(--color-bg-primary)]">
            {profile?.first_name?.[0]}{profile?.last_name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-display text-2xl">
              Welcome back{profile?.first_name ? `, ${profile.first_name}` : ''}
            </h1>
            <p className="text-[var(--color-text-muted)]">{profile?.headline || 'Complete your profile to get started'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {profile?.availability === 'actively_looking' && (
            <span className="px-3 py-1 rounded-full text-sm bg-green-500/10 text-green-400">
              Actively looking
            </span>
          )}
          {profile?.availability === 'open' && (
            <span className="px-3 py-1 rounded-full text-sm bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]">
              Open to opportunities
            </span>
          )}
        </div>
      </div>

      {/* Profile completion */}
      {!hasProfile && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Complete your profile</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Create a profile to start applying to jobs
              </p>
            </div>
            <Link href="/dashboard/profile" className="btn btn-primary text-sm">
              Create Profile
            </Link>
          </div>
        </div>
      )}

      {hasProfile && !profile?.profile_complete && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Complete your profile</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                A complete profile gets 3x more views from employers
              </p>
            </div>
            <Link href="/dashboard/profile" className="btn btn-primary text-sm">
              Complete Profile
            </Link>
          </div>
          <div className="h-2 bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-accent)] rounded-full transition-all"
              style={{ width: '50%' }}
            />
          </div>
          <p className="text-sm text-[var(--color-text-muted)] mt-2">50% complete</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--color-accent)] mb-1">{stats.applications}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Applications</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-[var(--color-secondary)] mb-1">{stats.interviews}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Interviews</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold mb-1">{stats.saved}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Saved Jobs</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold mb-1">{stats.views}</div>
          <div className="text-sm text-[var(--color-text-muted)]">Profile Views</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Link
              href="/dashboard/applications"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              View all
            </Link>
          </div>
          {applicationsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)]" />
                  <div className="flex-1">
                    <div className="h-4 bg-[var(--color-bg-secondary)] rounded w-2/3 mb-2" />
                    <div className="h-3 bg-[var(--color-bg-secondary)] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentApplications.length > 0 ? (
            <div className="space-y-4">
              {recentApplications.map(app => {
                const statusBadge = getStatusBadge(app.status)
                return (
                  <Link
                    key={app.id}
                    href={`/jobs/${app.job_id}`}
                    className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] flex items-center justify-center font-bold">
                        {app.job?.company?.name?.[0] || 'C'}
                      </div>
                      <div>
                        <p className="font-medium">{app.job?.title}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {app.job?.company?.name} · {formatRelativeDate(app.created_at)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${statusBadge.color}`}>
                      {statusBadge.label}
                    </span>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-muted)] mb-4">No applications yet</p>
              <Link href="/jobs" className="btn btn-secondary text-sm">
                Browse Jobs
              </Link>
            </div>
          )}
        </div>

        {/* Recommended Jobs */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recommended for You</h2>
            <Link
              href="/jobs"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              Browse all
            </Link>
          </div>
          {loadingJobs ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/20" />
                  <div className="flex-1">
                    <div className="h-4 bg-[var(--color-bg-secondary)] rounded w-2/3 mb-2" />
                    <div className="h-3 bg-[var(--color-bg-secondary)] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recommendedJobs.length > 0 ? (
            <div className="space-y-4">
              {recommendedJobs.map(job => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-lg cursor-pointer hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-bold text-[var(--color-bg-primary)]">
                      {job.company?.name?.[0] || 'C'}
                    </div>
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {job.company?.name} · {formatSalary(job.salary_min, job.salary_max)}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    job.match >= 90 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                    'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]'
                  }`}>
                    {job.match}% match
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--color-text-muted)] mb-4">No recommendations yet</p>
              <Link href="/dashboard/profile" className="btn btn-secondary text-sm">
                Complete Profile
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Link
          href="/jobs"
          className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
        >
          <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium">Search Jobs</p>
        </Link>
        <Link
          href="/dashboard/applications"
          className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
        >
          <svg className="w-8 h-8 mx-auto mb-3 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="font-medium">My Applications</p>
        </Link>
        <Link
          href="/dashboard/profile"
          className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
        >
          <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p className="font-medium">Edit Profile</p>
        </Link>
        <Link
          href="/dashboard/mcp"
          className="card hover:border-[var(--color-accent)] transition-colors text-center py-8"
        >
          <svg className="w-8 h-8 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-medium">MCP Access</p>
        </Link>
      </div>
    </DashboardLayout>
  )
}
