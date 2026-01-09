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
  } = profile

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
