'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function CompanyProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Company Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Manage your company information
        </p>

        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Company Profile Coming Soon</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Full company profile editing will be available in the next update
          </p>
          <Link href="/company" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
