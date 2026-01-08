import { useState } from 'react'

const AI_TOOLS = [
  'Claude', 'Claude Code', 'ChatGPT', 'GPT-4', 'Cursor', 'GitHub Copilot',
  'v0', 'Midjourney', 'DALL-E', 'Notion AI', 'Perplexity'
]

const ROLE_TYPES = [
  { value: 'all', label: 'All Roles' },
  { value: 'engineer', label: 'Engineering' },
  { value: 'designer', label: 'Design' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'writer', label: 'Content' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'actively_looking', label: 'Actively looking' },
  { value: 'open', label: 'Open to opportunities' },
]

const SAMPLE_CANDIDATES = [
  {
    id: 1,
    name: 'Alex Chen',
    headline: 'AI-First Frontend Engineer',
    location: 'San Francisco, CA',
    availability: 'actively_looking',
    yearsExperience: 5,
    roleType: 'engineer',
    aiTools: ['Cursor', 'Claude', 'Claude Code', 'v0', 'GitHub Copilot'],
    skills: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: 2,
    name: 'Sarah Kim',
    headline: 'Product Designer',
    location: 'New York, NY',
    availability: 'open',
    yearsExperience: 4,
    roleType: 'designer',
    aiTools: ['Midjourney', 'DALL-E', 'Figma AI', 'ChatGPT'],
    skills: ['Figma', 'UI/UX', 'Design Systems'],
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    headline: 'Full Stack Developer',
    location: 'Austin, TX',
    availability: 'actively_looking',
    yearsExperience: 7,
    roleType: 'engineer',
    aiTools: ['Claude Code', 'Cursor', 'ChatGPT', 'GitHub Copilot'],
    skills: ['Node.js', 'Python', 'AWS', 'PostgreSQL'],
  },
  {
    id: 4,
    name: 'Emily Zhang',
    headline: 'AI Product Manager',
    location: 'Seattle, WA',
    availability: 'open',
    yearsExperience: 6,
    roleType: 'product',
    aiTools: ['ChatGPT', 'Claude', 'Notion AI', 'Perplexity'],
    skills: ['Product Strategy', 'Data Analysis', 'Agile'],
  },
  {
    id: 5,
    name: 'David Park',
    headline: 'Growth Marketing Lead',
    location: 'Los Angeles, CA',
    availability: 'actively_looking',
    yearsExperience: 5,
    roleType: 'marketer',
    aiTools: ['ChatGPT', 'Jasper', 'Notion AI', 'Perplexity'],
    skills: ['SEO', 'Content Strategy', 'Analytics'],
  },
  {
    id: 6,
    name: 'Rachel Adams',
    headline: 'Technical Writer',
    location: 'Remote',
    availability: 'open',
    yearsExperience: 3,
    roleType: 'writer',
    aiTools: ['Claude', 'ChatGPT', 'Notion AI', 'Grammarly AI'],
    skills: ['Documentation', 'API Docs', 'Markdown'],
  },
]

// Mock employer requirements
const EMPLOYER_REQUIREMENTS = ['Cursor', 'Claude', 'React']

export default function TalentListings({ navigate }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTools, setSelectedTools] = useState([])
  const [roleFilter, setRoleFilter] = useState('all')
  const [availabilityFilter, setAvailabilityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('match')

  const toggleTool = (tool) => {
    setSelectedTools(prev =>
      prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    )
  }

  // Filter candidates
  const filteredCandidates = SAMPLE_CANDIDATES.filter(candidate => {
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (!candidate.name.toLowerCase().includes(query) &&
          !candidate.headline.toLowerCase().includes(query) &&
          !candidate.skills.some(s => s.toLowerCase().includes(query))) {
        return false
      }
    }

    // AI tools filter
    if (selectedTools.length > 0) {
      if (!selectedTools.some(tool => candidate.aiTools.includes(tool))) {
        return false
      }
    }

    // Role filter
    if (roleFilter !== 'all' && candidate.roleType !== roleFilter) {
      return false
    }

    // Availability filter
    if (availabilityFilter !== 'all' && candidate.availability !== availabilityFilter) {
      return false
    }

    return true
  })

  // Calculate match percentage for each candidate
  const candidatesWithMatch = filteredCandidates.map(candidate => {
    const matchingTools = candidate.aiTools.filter(t => EMPLOYER_REQUIREMENTS.includes(t))
    const matchPercent = Math.round((matchingTools.length / EMPLOYER_REQUIREMENTS.length) * 100)
    return { ...candidate, matchPercent, matchingTools }
  })

  // Sort
  const sortedCandidates = [...candidatesWithMatch].sort((a, b) => {
    if (sortBy === 'match') return b.matchPercent - a.matchPercent
    if (sortBy === 'experience') return b.yearsExperience - a.yearsExperience
    return 0
  })

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'actively_looking':
        return { label: 'Actively looking', color: 'bg-green-500/10 text-green-400' }
      case 'open':
        return { label: 'Open', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' }
      default:
        return { label: availability, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <button
          onClick={() => navigate('landing')}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('employer-jobs')} className="btn btn-ghost">My Jobs</button>
          <button onClick={() => navigate('employer-dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display text-display-lg mb-2">Find Talent</h1>
            <p className="text-[var(--color-text-muted)]">
              Browse AI-fluent candidates ready to ship with modern tools
            </p>
          </div>
          <button
            onClick={() => navigate('job-post-new')}
            className="btn btn-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Post a Job
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="card">
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">SEARCH</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, skills, headline..."
                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            {/* AI Tools Filter */}
            <div className="card">
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">AI TOOLS</label>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map(tool => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedTools.includes(tool)
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
              {selectedTools.length > 0 && (
                <button
                  onClick={() => setSelectedTools([])}
                  className="text-sm text-[var(--color-accent)] hover:underline mt-3"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Role Filter */}
            <div className="card">
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">ROLE</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              >
                {ROLE_TYPES.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            {/* Availability Filter */}
            <div className="card">
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">AVAILABILITY</label>
              <div className="space-y-2">
                {AVAILABILITY_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAvailabilityFilter(option.value)}
                    className={`w-full px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                      availabilityFilter === option.value
                        ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)] text-[var(--color-accent)]'
                        : 'bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[var(--color-text-muted)]">
                {sortedCandidates.length} candidate{sortedCandidates.length !== 1 ? 's' : ''}
                {selectedTools.length > 0 && ` matching ${selectedTools.join(', ')}`}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              >
                <option value="match">Best match</option>
                <option value="experience">Most experienced</option>
              </select>
            </div>

            {/* Candidate Cards */}
            <div className="space-y-4">
              {sortedCandidates.map(candidate => {
                const availBadge = getAvailabilityBadge(candidate.availability)
                return (
                  <div
                    key={candidate.id}
                    onClick={() => navigate('talent-profile')}
                    className="card cursor-pointer hover:border-[var(--color-accent)] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)] shrink-0">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-semibold">{candidate.name}</h3>
                            <p className="text-sm text-[var(--color-text-muted)]">{candidate.headline}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {candidate.matchPercent > 0 && (
                              <div className={`px-2 py-1 rounded text-xs font-medium ${
                                candidate.matchPercent === 100 ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]' :
                                candidate.matchPercent >= 50 ? 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]' :
                                'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                              }`}>
                                {candidate.matchPercent}% match
                              </div>
                            )}
                            <span className={`px-2 py-1 rounded text-xs ${availBadge.color}`}>
                              {availBadge.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-3">
                          <span>{candidate.location}</span>
                          <span>·</span>
                          <span>{candidate.yearsExperience} years exp</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {candidate.aiTools.slice(0, 5).map(tool => (
                            <span
                              key={tool}
                              className={`badge text-xs ${candidate.matchingTools.includes(tool) ? 'badge-accent' : ''}`}
                            >
                              {tool}
                            </span>
                          ))}
                          {candidate.aiTools.length > 5 && (
                            <span className="badge text-xs">+{candidate.aiTools.length - 5}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {sortedCandidates.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No candidates found</h3>
                <p className="text-[var(--color-text-muted)]">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
