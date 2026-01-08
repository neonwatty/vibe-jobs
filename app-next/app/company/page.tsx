'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function CompanyDashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-display text-2xl mb-2">Employer Dashboard</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Manage your job postings and find talent
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/company/jobs" className="card hover:border-[var(--color-accent)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Manage Jobs</h3>
            <p className="text-sm text-[var(--color-text-muted)]">View and manage your active job postings</p>
          </Link>

          <Link href="/company/jobs/new" className="card hover:border-[var(--color-accent)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Post a Job</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Create a new job listing</p>
          </Link>

          <Link href="/talent" className="card hover:border-[var(--color-accent)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Browse Talent</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Find AI-native candidates</p>
          </Link>

          <Link href="/company/profile" className="card hover:border-[var(--color-accent)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Company Profile</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Edit your company information</p>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
