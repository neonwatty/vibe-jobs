'use client'

import Link from 'next/link'
import { formatRelativeDate } from '@/lib/utils'
import type { TalentProfile } from '@/hooks/useTalent'

interface TalentCardProps {
  profile: TalentProfile
  requiredTools?: string[]
}

const availabilityLabels: Record<string, { label: string; color: string }> = {
  actively_looking: { label: 'Actively Looking', color: 'badge-accent' },
  open: { label: 'Open to Opportunities', color: 'badge-secondary' },
  not_looking: { label: 'Not Looking', color: '' },
}

const roleLabels: Record<string, string> = {
  engineer: 'Engineering',
  product: 'Product',
  marketer: 'Marketing',
  sales: 'Sales',
  ops: 'Operations',
  other: 'Other',
}

export default function TalentCard({ profile, requiredTools = [] }: TalentCardProps) {
  const {
    id,
    first_name,
    last_name,
    headline,
    location,
    role_type,
    ai_tools = [],
    availability,
    created_at,
    portfolio_urls = [],
    raw_json,
  } = profile

  // Extract GitHub URL and projects from portfolio data
  const githubUrl = portfolio_urls.find(url => url.includes('github.com'))
  const projects = (raw_json as { projects?: { name: string }[] })?.projects || []

  // Calculate tool match if required tools are provided
  const matchingTools = requiredTools.length > 0
    ? ai_tools.filter(tool => requiredTools.includes(tool))
    : []
  const matchPercent = requiredTools.length > 0
    ? Math.round((matchingTools.length / requiredTools.length) * 100)
    : 0

  const availabilityInfo = availabilityLabels[availability] || availabilityLabels.open

  return (
    <Link
      href={`/talent/${id}`}
      className="card group cursor-pointer hover:border-[var(--color-accent)] transition-all block"
    >
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)] shrink-0">
          {first_name?.[0]}{last_name?.[0]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="group-hover:text-[var(--color-accent)] transition-colors truncate">
                {first_name} {last_name}
              </h4>
              {headline && (
                <p className="text-sm text-[var(--color-text-muted)] truncate">{headline}</p>
              )}
            </div>
            <span className={`badge ${availabilityInfo.color} shrink-0`}>
              {availabilityInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm text-[var(--color-text-muted)]">
            <span className="badge capitalize">{roleLabels[role_type] || role_type}</span>
            {location && (
              <>
                <span>·</span>
                <span>{location}</span>
              </>
            )}
            <span>·</span>
            <span>Joined {formatRelativeDate(created_at)}</span>
          </div>
        </div>
      </div>

      {/* AI Tools */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {ai_tools.slice(0, 6).map(tool => {
          const isMatch = requiredTools.includes(tool)
          return (
            <span
              key={tool}
              className={`badge ${isMatch ? 'badge-accent' : ''}`}
            >
              {tool}
            </span>
          )
        })}
        {ai_tools.length > 6 && (
          <span className="text-xs text-[var(--color-text-muted)]">
            +{ai_tools.length - 6} more
          </span>
        )}
      </div>

      {/* Portfolio indicators */}
      {(githubUrl || projects.length > 0) && (
        <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
          {githubUrl && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </span>
          )}
          {projects.length > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {projects.length} project{projects.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Match indicator (if required tools provided) */}
      {requiredTools.length > 0 && (
        <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              matchPercent === 100 ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' :
              matchPercent >= 50 ? 'bg-[var(--color-secondary)] text-[var(--color-bg-primary)]' :
              'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
            }`}>
              {matchPercent}%
            </div>
            <span className="text-sm text-[var(--color-text-muted)]">
              {matchingTools.length} of {requiredTools.length} required tools
            </span>
          </div>
          <button className="btn btn-ghost text-sm">
            View Profile
          </button>
        </div>
      )}
    </Link>
  )
}
