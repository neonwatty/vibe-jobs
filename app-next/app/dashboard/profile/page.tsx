'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileEditor from '@/components/profile/ProfileEditor'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, isAuthenticated, isEmployee, userRole } = useAuth()

  useEffect(() => {
    // Only redirect after loading completes
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard/profile')
    }
    if (!loading && isAuthenticated && userRole && !isEmployee) {
      router.push('/company')
    }
  }, [loading, isAuthenticated, isEmployee, userRole, router])

  // Don't render anything if not authenticated (will redirect)
  if (!loading && !isAuthenticated) {
    return null
  }

  // If authenticated but role determined to be employer, don't render (will redirect)
  if (!loading && userRole && !isEmployee) {
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
