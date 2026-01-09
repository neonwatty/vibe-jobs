'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import JobEditor from '@/components/jobs/JobEditor'
import { useAuth } from '@/contexts/AuthContext'

export default function PostJobPage() {
  const router = useRouter()
  const { loading, isAuthenticated, isEmployer, company } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/company/jobs/new')
    }
    if (!loading && isAuthenticated && !isEmployer) {
      router.push('/dashboard')
    }
  }, [loading, isAuthenticated, isEmployer, router])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl">
          <div className="animate-pulse">
            <div className="h-8 bg-[var(--color-bg-tertiary)] rounded w-1/3 mb-2" />
            <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-8" />
            <div className="card">
              <div className="h-6 bg-[var(--color-bg-tertiary)] rounded w-1/4 mb-4" />
              <div className="space-y-4">
                <div className="h-12 bg-[var(--color-bg-tertiary)] rounded" />
                <div className="h-32 bg-[var(--color-bg-tertiary)] rounded" />
                <div className="h-12 bg-[var(--color-bg-tertiary)] rounded" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated || !isEmployer) {
    return null
  }

  // Check if company has been set up
  if (!company) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl">
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Set Up Your Company First</h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Complete your company profile before posting jobs
            </p>
            <button
              onClick={() => router.push('/company/profile')}
              className="btn btn-primary"
            >
              Set Up Company Profile
            </button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Post a Job</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Create a new job listing for AI-native candidates
        </p>

        <JobEditor mode="create" />
      </div>
    </DashboardLayout>
  )
}
