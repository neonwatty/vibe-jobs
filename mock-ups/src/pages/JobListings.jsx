import { useState } from 'react'

const SAMPLE_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    locationType: 'remote',
    salaryMin: 180000,
    salaryMax: 220000,
    category: 'engineer',
    experienceLevel: 'senior',
    tools: ['Cursor', 'Claude', 'React', 'TypeScript'],
    testFormat: '1-hour live build: We\'ll share a Figma design and watch you build it using your preferred AI tools.',
    postedDaysAgo: 1,
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    company: 'StartupXYZ',
    location: 'San Francisco',
    locationType: 'hybrid',
    salaryMin: 160000,
    salaryMax: 200000,
    category: 'engineer',
    experienceLevel: 'mid',
    tools: ['Claude Code', 'Copilot', 'Next.js', 'Python'],
    testFormat: '24-hour take-home: Build an API endpoint and a small UI that consumes it. Deploy to Vercel or similar.',
    postedDaysAgo: 3,
  },
  {
    id: 3,
    title: 'Backend Engineer, AI Infrastructure',
    company: 'AI Labs Inc',
    location: 'Remote',
    locationType: 'remote',
    salaryMin: 200000,
    salaryMax: 280000,
    category: 'engineer',
    experienceLevel: 'senior',
    tools: ['Claude Code', 'Cursor', 'Go', 'Kubernetes'],
    testFormat: 'Pair programming session: We\'ll work on a real issue from our backlog together. You drive, use any tools.',
    postedDaysAgo: 2,
  },
  {
    id: 4,
    title: 'Product Manager, AI Platform',
    company: 'Acme AI',
    location: 'San Francisco',
    locationType: 'hybrid',
    salaryMin: 160000,
    salaryMax: 200000,
    category: 'product',
    experienceLevel: 'senior',
    tools: ['ChatGPT', 'Claude', 'Notion AI', 'Perplexity'],
    testFormat: '2-hour PRD sprint: We\'ll describe a feature we\'re considering. Write a spec, prioritize requirements, and define success metrics.',
    postedDaysAgo: 5,
  },
  {
    id: 5,
    title: 'Senior Product Designer',
    company: 'StartupXYZ',
    location: 'Remote',
    locationType: 'remote',
    salaryMin: 150000,
    salaryMax: 180000,
    category: 'product',
    experienceLevel: 'senior',
    tools: ['Figma AI', 'Midjourney', 'Claude', 'v0'],
    testFormat: 'Design challenge: Take a product problem and explore solutions. Show us your AI-augmented process.',
    postedDaysAgo: 7,
  },
  {
    id: 6,
    title: 'Junior Frontend Developer',
    company: 'TechStart',
    location: 'New York',
    locationType: 'onsite',
    salaryMin: 90000,
    salaryMax: 120000,
    category: 'engineer',
    experienceLevel: 'entry',
    tools: ['Cursor', 'ChatGPT', 'React'],
    testFormat: '1-hour live coding: Build a simple component with us. AI tools encouraged.',
    postedDaysAgo: 14,
  },
]

const SALARY_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '$100k+', min: 100000, max: Infinity },
  { label: '$150k+', min: 150000, max: Infinity },
  { label: '$200k+', min: 200000, max: Infinity },
  { label: '$250k+', min: 250000, max: Infinity },
]

const AI_TOOLS = ['Cursor', 'Claude', 'Claude Code', 'ChatGPT', 'Copilot', 'Midjourney', 'Figma AI', 'Notion AI', 'Perplexity', 'v0']

// Mock logged-in user profile (would come from auth/database in real app)
const MOCK_USER = {
  name: 'Alex Chen',
  tools: ['Cursor', 'Claude', 'Claude Code', 'ChatGPT', 'React', 'TypeScript', 'Next.js'],
  isLoggedIn: true,
}

export default function JobListings({ navigate }) {
  const [filters, setFilters] = useState({
    category: 'all',
    salaryRange: 0,
    locationType: 'all',
    experienceLevel: 'all',
    tools: [],
  })
  const [sortBy, setSortBy] = useState('newest')
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [appliedJobs, setAppliedJobs] = useState(new Set())

  const filteredJobs = SAMPLE_JOBS.filter(job => {
    // Category filter
    if (filters.category !== 'all' && job.category !== filters.category) return false

    // Salary filter
    const salaryFilter = SALARY_RANGES[filters.salaryRange]
    if (job.salaryMax < salaryFilter.min) return false

    // Location filter
    if (filters.locationType !== 'all' && job.locationType !== filters.locationType) return false

    // Experience filter
    if (filters.experienceLevel !== 'all' && job.experienceLevel !== filters.experienceLevel) return false

    // Tools filter
    if (filters.tools.length > 0) {
      const hasMatchingTool = filters.tools.some(tool => job.tools.includes(tool))
      if (!hasMatchingTool) return false
    }

    return true
  }).sort((a, b) => {
    if (sortBy === 'newest') return a.postedDaysAgo - b.postedDaysAgo
    if (sortBy === 'salary') return b.salaryMax - a.salaryMax
    return 0
  })

  const toggleTool = (tool) => {
    setFilters(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }))
  }

  const toggleSave = (jobId, e) => {
    e.stopPropagation()
    setSavedJobs(prev => {
      const next = new Set(prev)
      if (next.has(jobId)) {
        next.delete(jobId)
      } else {
        next.add(jobId)
      }
      return next
    })
  }

  const formatSalary = (min, max) => {
    const formatK = (n) => `$${Math.round(n / 1000)}k`
    return `${formatK(min)} - ${formatK(max)}`
  }

  const formatPostedDate = (days) => {
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 14) return '1 week ago'
    return `${Math.floor(days / 7)} weeks ago`
  }

  const getToolMatch = (jobTools) => {
    const aiTools = jobTools.filter(t => AI_TOOLS.includes(t))
    const matchingTools = aiTools.filter(t => MOCK_USER.tools.includes(t))
    return { matching: matchingTools.length, total: aiTools.length, tools: matchingTools }
  }

  const handleQuickApply = (jobId, e) => {
    e.stopPropagation()
    setAppliedJobs(prev => new Set([...prev, jobId]))
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
          <button className="btn btn-ghost">Log in</button>
          <button className="btn btn-primary">Create profile</button>
        </div>
      </nav>

      <main className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="card sticky top-8">
              <h3 className="mb-6">Filters</h3>

              {/* Role Category */}
              <div className="mb-6">
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">ROLE</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'engineer', 'product'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilters(prev => ({ ...prev, category: cat }))}
                      className={`badge cursor-pointer transition-colors ${
                        filters.category === cat ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
                      }`}
                    >
                      {cat === 'all' ? 'All roles' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">MINIMUM SALARY</label>
                <div className="flex flex-wrap gap-2">
                  {SALARY_RANGES.map((range, idx) => (
                    <button
                      key={range.label}
                      onClick={() => setFilters(prev => ({ ...prev, salaryRange: idx }))}
                      className={`badge cursor-pointer transition-colors ${
                        filters.salaryRange === idx ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
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
                  {['all', 'remote', 'hybrid', 'onsite'].map(loc => (
                    <button
                      key={loc}
                      onClick={() => setFilters(prev => ({ ...prev, locationType: loc }))}
                      className={`badge cursor-pointer transition-colors ${
                        filters.locationType === loc ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
                      }`}
                    >
                      {loc === 'all' ? 'Any' : loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">EXPERIENCE</label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'entry', 'mid', 'senior'].map(exp => (
                    <button
                      key={exp}
                      onClick={() => setFilters(prev => ({ ...prev, experienceLevel: exp }))}
                      className={`badge cursor-pointer transition-colors ${
                        filters.experienceLevel === exp ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
                      }`}
                    >
                      {exp === 'all' ? 'Any' : exp.charAt(0).toUpperCase() + exp.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Tools */}
              <div className="mb-6">
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">AI TOOLS</label>
                <div className="flex flex-wrap gap-2">
                  {AI_TOOLS.map(tool => (
                    <button
                      key={tool}
                      onClick={() => toggleTool(tool)}
                      className={`badge cursor-pointer transition-colors ${
                        filters.tools.includes(tool) ? 'badge-accent' : 'hover:border-[var(--color-border-hover)]'
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(filters.category !== 'all' || filters.salaryRange !== 0 || filters.locationType !== 'all' || filters.experienceLevel !== 'all' || filters.tools.length > 0) && (
                <button
                  onClick={() => setFilters({ category: 'all', salaryRange: 0, locationType: 'all', experienceLevel: 'all', tools: [] })}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2>{filteredJobs.length} jobs</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[var(--color-text-muted)]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="salary">Highest salary</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4">
              {filteredJobs.map(job => (
                <div key={job.id} className="card group cursor-pointer hover:border-[var(--color-accent)] transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                          {job.title}
                        </h4>
                        <button
                          onClick={(e) => toggleSave(job.id, e)}
                          className="shrink-0 p-1.5 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                          title={savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}
                        >
                          <svg
                            className={`w-5 h-5 transition-colors ${savedJobs.has(job.id) ? 'text-[var(--color-accent)] fill-current' : 'text-[var(--color-text-muted)]'}`}
                            fill={savedJobs.has(job.id) ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-sm">
                        {job.company} · {job.location} · {job.locationType.charAt(0).toUpperCase() + job.locationType.slice(1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-[var(--color-text-muted)]">{formatPostedDate(job.postedDaysAgo)}</span>
                      <span className="badge badge-secondary text-base px-3 py-1">
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {job.tools.map(tool => {
                      const isMatch = MOCK_USER.tools.includes(tool)
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
                    {(() => {
                      const match = getToolMatch(job.tools)
                      if (match.total === 0) return null
                      return (
                        <span className={`text-xs font-medium ml-2 ${match.matching === match.total ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}>
                          {match.matching}/{match.total} AI tools match
                        </span>
                      )
                    })()}
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                        <p className="text-sm">{job.testFormat}</p>
                      </div>
                      {MOCK_USER.isLoggedIn && (
                        <button
                          onClick={(e) => handleQuickApply(job.id, e)}
                          disabled={appliedJobs.has(job.id)}
                          className={`shrink-0 btn ${appliedJobs.has(job.id) ? 'btn-ghost cursor-default' : 'btn-primary'}`}
                        >
                          {appliedJobs.has(job.id) ? (
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
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="card text-center py-12">
                  <p className="text-[var(--color-text-muted)] mb-4">No jobs match your filters</p>
                  <button
                    onClick={() => setFilters({ category: 'all', salaryRange: 0, locationType: 'all', experienceLevel: 'all', tools: [] })}
                    className="btn btn-secondary"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
