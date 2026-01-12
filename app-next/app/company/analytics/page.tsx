'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useCompanyAnalytics, STATUS_CONFIG } from '@/hooks/useCompanyAnalytics'
import DashboardLayout from '@/components/layout/DashboardLayout'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts'

export default function AnalyticsPage() {
  const { company } = useAuth()
  const { data, loading, error } = useCompanyAnalytics(company?.id)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl">
          <h1 className="text-display text-2xl mb-8">Analytics</h1>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-1/2 mb-2" />
                <div className="h-8 bg-[var(--color-bg-tertiary)] rounded w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl">
          <h1 className="text-display text-2xl mb-8">Analytics</h1>
          <div className="alert alert-error">{error}</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="max-w-6xl">
          <h1 className="text-display text-2xl mb-8">Analytics</h1>
          <p className="text-[var(--color-text-muted)]">No data available</p>
        </div>
      </DashboardLayout>
    )
  }

  const pieColors = data.applicationsByStatus.map(item => STATUS_CONFIG[item.status].color)

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-display text-2xl mb-2">Analytics</h1>
        <p className="text-[var(--color-text-muted)] mb-8">
          Track your hiring performance
        </p>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <p className="text-mono text-xs text-[var(--color-text-muted)] mb-1">TOTAL JOBS</p>
            <p className="text-3xl font-bold text-[var(--color-text-primary)]">{data.totalJobs}</p>
          </div>
          <div className="card">
            <p className="text-mono text-xs text-[var(--color-text-muted)] mb-1">ACTIVE JOBS</p>
            <p className="text-3xl font-bold text-[var(--color-accent)]">{data.activeJobs}</p>
          </div>
          <div className="card">
            <p className="text-mono text-xs text-[var(--color-text-muted)] mb-1">TOTAL APPLICATIONS</p>
            <p className="text-3xl font-bold text-[var(--color-text-primary)]">{data.totalApplications}</p>
          </div>
          <div className="card">
            <p className="text-mono text-xs text-[var(--color-text-muted)] mb-1">AVG PER JOB</p>
            <p className="text-3xl font-bold text-[var(--color-secondary)]">
              {data.totalJobs > 0 ? (data.totalApplications / data.totalJobs).toFixed(1) : '0'}
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Applications Over Time */}
          <div className="card">
            <h2 className="font-semibold mb-4">Applications (Last 30 Days)</h2>
            <div className="h-64">
              {data.applicationsOverTime.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.applicationsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return `${date.getMonth() + 1}/${date.getDate()}`
                      }}
                      interval="preserveStartEnd"
                    />
                    <YAxis
                      tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-accent)"
                      strokeWidth={2}
                      dot={false}
                      name="Applications"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--color-text-muted)]">
                  No application data yet
                </div>
              )}
            </div>
          </div>

          {/* Applications by Status */}
          <div className="card">
            <h2 className="font-semibold mb-4">Applications by Status</h2>
            <div className="h-64">
              {data.applicationsByStatus.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.applicationsByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="count"
                      nameKey="status"
                      label={({ payload }) => {
                        const item = payload as { status: string; count: number }
                        return `${STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG].label}: ${item.count}`
                      }}
                      labelLine={{ stroke: 'var(--color-text-muted)' }}
                    >
                      {data.applicationsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                      formatter={(value, name) => [value, STATUS_CONFIG[name as keyof typeof STATUS_CONFIG].label]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--color-text-muted)]">
                  No applications yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Jobs */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="font-semibold mb-4">Top Performing Jobs</h2>
            {data.topJobs.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.topJobs} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis type="number" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} allowDecimals={false} />
                    <YAxis
                      type="category"
                      dataKey="title"
                      tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                      width={150}
                      tickFormatter={(value) => value.length > 20 ? `${value.substring(0, 20)}...` : value}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="applicationCount" fill="var(--color-accent)" name="Applications" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
                No jobs posted yet
              </div>
            )}
          </div>

          {/* Recent Applications */}
          <div className="card">
            <h2 className="font-semibold mb-4">Recent Applications</h2>
            {data.recentApplications.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {data.recentApplications.map(app => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--color-text-primary)] truncate">
                        {app.candidateName}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)] truncate">
                        {app.jobTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className="badge text-xs"
                        style={{
                          backgroundColor: `${STATUS_CONFIG[app.status].color}20`,
                          color: STATUS_CONFIG[app.status].color,
                          borderColor: STATUS_CONFIG[app.status].color,
                        }}
                      >
                        {STATUS_CONFIG[app.status].label}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
                No applications yet
              </div>
            )}
          </div>
        </div>

        {/* Status Legend */}
        <div className="card">
          <h2 className="font-semibold mb-4">Status Guide</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <div key={status} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-sm text-[var(--color-text-muted)]">{config.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
