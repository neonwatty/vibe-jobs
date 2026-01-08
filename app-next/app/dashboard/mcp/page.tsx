'use client'

import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function MCPAccessPage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">MCP Access</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Configure your AI agent access settings
        </p>

        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">MCP Settings Coming Soon</h3>
          <p className="text-[var(--color-text-muted)] mb-4">
            AI agent integration settings will be available in the next update
          </p>
          <Link href="/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
