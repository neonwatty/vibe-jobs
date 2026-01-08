'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function TalentPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-display text-2xl mb-2">Browse Talent</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Find AI-native candidates for your team
        </p>

        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Talent Directory Coming Soon</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            Browse candidate profiles in the next update
          </p>
          <Link href="/company" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
