'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Manage your profile and job preferences
        </p>

        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Profile Setup Coming Soon</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Full profile editing will be available in the next update
          </p>
          <Link href="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
