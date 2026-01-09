'use client'

import Link from 'next/link'
import { formatSalary, formatRelativeDate } from '@/lib/utils'

interface Job {
  id: string
  title: string
  salary_min?: number
  salary_max?: number
  location_type?: string
  location_details?: string | null
  experience_level?: string
  ai_tools_required?: string[]
  how_youll_be_tested?: string
  created_at?: string
  company?: {
    name?: string
    domain_verified?: boolean
  } | null
}

interface JobCardProps {
  job: Job
  userTools?: string[]
  isSaved?: boolean
  hasApplied?: boolean
  onSave?: (id: string) => void
  onApply?: (id: string) => void
}

export default function JobCard({
  job,
  userTools = [],
  isSaved = false,
  hasApplied = false,
  onSave,
  onApply,
}: JobCardProps) {
  const {
    id,
    title,
    salary_min,
    salary_max,
    location_type,
    location_details,
    ai_tools_required = [],
    how_youll_be_tested,
    created_at,
    company,
  } = job

  // Calculate tool match
  const matchingTools = ai_tools_required.filter(tool => userTools.includes(tool))
  const matchCount = matchingTools.length
  const totalTools = ai_tools_required.length

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onSave?.(id)
  }

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onApply?.(id)
  }

  return (
    <Link
      href={`/jobs/${id}`}
      className="card group cursor-pointer hover:border-[var(--color-accent)] transition-all block"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
              {title}
            </h4>
            {onSave && (
              <button
                onClick={handleSave}
                className="shrink-0 p-1.5 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                title={isSaved ? 'Remove from saved' : 'Save job'}
              >
                <svg
                  className={`w-5 h-5 transition-colors ${isSaved ? 'text-[var(--color-accent)] fill-current' : 'text-[var(--color-text-muted)]'}`}
                  fill={isSaved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            )}
          </div>
          <p className="text-sm flex items-center gap-1">
            <span>{company?.name}</span>
            {company?.domain_verified && (
              <svg className="w-4 h-4 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified employer">
                <title>Verified employer</title>
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            )}
            <span>·</span>
            <span>{location_details || location_type}</span>
            <span>·</span>
            <span className="capitalize">{location_type}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[var(--color-text-muted)]">
            {formatRelativeDate(created_at)}
          </span>
          <span className="badge badge-secondary text-base px-3 py-1">
            {formatSalary(salary_min, salary_max)}
          </span>
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {ai_tools_required.map(tool => {
          const isMatch = userTools.includes(tool)
          return (
            <span
              key={tool}
              className={`badge ${isMatch ? 'badge-accent' : ''}`}
              title={isMatch ? 'You have this tool' : ''}
            >
              {tool}
            </span>
          )
        })}
        {totalTools > 0 && userTools.length > 0 && (
          <span className={`text-xs font-medium ml-2 ${matchCount === totalTools ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}>
            {matchCount}/{totalTools} AI tools match
          </span>
        )}
      </div>

      {/* How You'll Be Tested */}
      <div className="border-t border-[var(--color-border)] pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU&apos;LL BE TESTED</div>
            <p className="text-sm line-clamp-2">{how_youll_be_tested}</p>
          </div>
          {onApply && (
            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`shrink-0 btn ${hasApplied ? 'btn-ghost cursor-default' : 'btn-primary'}`}
            >
              {hasApplied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Applied
                </>
              ) : (
                'Quick Apply'
              )}
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
