'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import CompanyProfileEditor from '@/components/company/CompanyProfileEditor'

export default function CompanyProfilePage() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="text-display text-2xl mb-2">Company Profile</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Manage your company information
        </p>

        <CompanyProfileEditor />
      </div>
    </DashboardLayout>
  )
}
