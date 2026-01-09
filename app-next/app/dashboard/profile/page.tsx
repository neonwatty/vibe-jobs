'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileEditor from '@/components/profile/ProfileEditor'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const router = useRouter()
  const { loading, isAuthenticated, isEmployee } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard/profile')
    }
    if (!loading && isAuthenticated && !isEmployee) {
      router.push('/company')
    }
  }, [loading, isAuthenticated, isEmployee, router])

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
                <div className="h-12 bg-[var(--color-bg-tertiary)] rounded" />
                <div className="h-12 bg-[var(--color-bg-tertiary)] rounded" />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated || !isEmployee) {
    return null
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Your Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Manage your profile information and job preferences
        </p>

        <ProfileEditor />
      </div>
    </DashboardLayout>
  )
}
