'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProfileEditor from '@/components/profile/ProfileEditor'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const router = useRouter()
  const { loading, isAuthenticated, isEmployee, userRole } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard/profile')
    }
    // Only redirect to company if we know the role and it's employer
    if (!loading && isAuthenticated && userRole && !isEmployee) {
      router.push('/company')
    }
  }, [loading, isAuthenticated, isEmployee, userRole, router])

  // Don't render anything if not authenticated (will redirect)
  if (!loading && !isAuthenticated) {
    return null
  }

  // If authenticated but role determined to be employer, don't render
  if (!loading && userRole && !isEmployee) {
    return null
  }

  // Render content - ProfileEditor handles its own loading state
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
