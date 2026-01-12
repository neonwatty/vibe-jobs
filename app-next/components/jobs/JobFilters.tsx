'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  ROLE_CATEGORIES,
  SALARY_RANGES,
  LOCATION_TYPES,
  EXPERIENCE_LEVELS,
  UNIQUE_AI_TOOLS,
} from '@/lib/constants'

interface Filters {
  category: string
  salaryMin: number
  locationType: string
  experienceLevel: string
  tools: string[]
  search: string
}

interface JobFiltersProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onClearFilters: () => void
}

export default function JobFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: JobFiltersProps) {
  const {
    category = 'all',
    salaryMin = 0,
    locationType = 'all',
    experienceLevel = 'all',
    tools = [],
    search = '',
  } = filters

  // Local state for search input (for debouncing)
  const [searchInput, setSearchInput] = useState(search)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        onFilterChange({ search: searchInput })
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput, search, onFilterChange])

  // Sync local state when external search changes (e.g., clear filters)
  useEffect(() => {
    setSearchInput(search)
  }, [search])

  const hasActiveFilters =
    category !== 'all' ||
    salaryMin !== 0 ||
    locationType !== 'all' ||
    experienceLevel !== 'all' ||
    tools.length > 0 ||
    search !== ''

  const toggleTool = (tool: string) => {
    const newTools = tools.includes(tool)
      ? tools.filter(t => t !== tool)
      : [...tools, tool]
    onFilterChange({ tools: newTools })
  }

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }, [])

  return (
    <div className="card sticky top-8">
      <h3 className="mb-6">Filters</h3>

      {/* Search */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">SEARCH</label>
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search jobs..."
            className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-4 py-2 pl-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Role Category */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">ROLE</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange({ category: 'all' })}
            className={`badge cursor-pointer transition-colors ${
              category === 'all' ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
            }`}
          >
            All roles
          </button>
          {ROLE_CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => onFilterChange({ category: cat.value })}
              className={`badge cursor-pointer transition-colors ${
                category === cat.value ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">MINIMUM SALARY</label>
        <div className="flex flex-wrap gap-2">
          {SALARY_RANGES.map(range => (
            <button
              key={range.min}
              onClick={() => onFilterChange({ salaryMin: range.min })}
              className={`badge cursor-pointer transition-colors ${
                salaryMin === range.min ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location Type */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">LOCATION</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange({ locationType: 'all' })}
            className={`badge cursor-pointer transition-colors ${
              locationType === 'all' ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
            }`}
          >
            Any
          </button>
          {LOCATION_TYPES.map(loc => (
            <button
              key={loc.value}
              onClick={() => onFilterChange({ locationType: loc.value })}
              className={`badge cursor-pointer transition-colors ${
                locationType === loc.value ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">EXPERIENCE</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange({ experienceLevel: 'all' })}
            className={`badge cursor-pointer transition-colors ${
              experienceLevel === 'all' ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
            }`}
          >
            Any
          </button>
          {EXPERIENCE_LEVELS.map(exp => (
            <button
              key={exp.value}
              onClick={() => onFilterChange({ experienceLevel: exp.value })}
              className={`badge cursor-pointer transition-colors ${
                experienceLevel === exp.value ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Tools */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">AI TOOLS</label>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {UNIQUE_AI_TOOLS.slice(0, 20).map(tool => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`badge cursor-pointer transition-colors ${
                tools.includes(tool) ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearFilters}
          className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
