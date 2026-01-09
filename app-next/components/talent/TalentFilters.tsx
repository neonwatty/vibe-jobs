'use client'

import type { TalentFilters as Filters } from '@/hooks/useTalent'

interface TalentFiltersProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onClearFilters: () => void
}

const ROLE_TYPES = [
  { value: 'all', label: 'All roles' },
  { value: 'engineer', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'other', label: 'Other' },
]

const AVAILABILITY = [
  { value: 'all', label: 'Any availability' },
  { value: 'actively_looking', label: 'Actively Looking' },
  { value: 'open', label: 'Open to Opportunities' },
]

const POPULAR_TOOLS = [
  'Claude Code',
  'Cursor',
  'GitHub Copilot',
  'ChatGPT',
  'v0',
  'Replit Agent',
  'Windsurf',
  'Codeium',
]

export default function TalentFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: TalentFiltersProps) {
  const hasActiveFilters =
    filters.roleType !== 'all' ||
    filters.availability !== 'all' ||
    filters.tools.length > 0 ||
    filters.search !== ''

  const toggleTool = (tool: string) => {
    const newTools = filters.tools.includes(tool)
      ? filters.tools.filter(t => t !== tool)
      : [...filters.tools, tool]
    onFilterChange({ tools: newTools })
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
          SEARCH
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder="Search by name or headline..."
          className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
        />
      </div>

      {/* Role Type */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
          ROLE TYPE
        </label>
        <select
          value={filters.roleType}
          onChange={(e) => onFilterChange({ roleType: e.target.value })}
          className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
        >
          {ROLE_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
          AVAILABILITY
        </label>
        <select
          value={filters.availability}
          onChange={(e) => onFilterChange({ availability: e.target.value })}
          className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
        >
          {AVAILABILITY.map(status => (
            <option key={status.value} value={status.value}>{status.label}</option>
          ))}
        </select>
      </div>

      {/* AI Tools */}
      <div>
        <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
          AI TOOLS
        </label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_TOOLS.map(tool => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`badge cursor-pointer transition-colors ${
                filters.tools.includes(tool)
                  ? 'badge-accent'
                  : 'hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
        {filters.tools.length > 0 && (
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            {filters.tools.length} tool{filters.tools.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </div>
  )
}
