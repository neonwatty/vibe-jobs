'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function PostJobPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Post a Job</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Create a new job listing for AI-native candidates
        </p>

        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Job Posting Coming Soon</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Full job posting form will be available in the next update
          </p>
          <Link href="/company" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
