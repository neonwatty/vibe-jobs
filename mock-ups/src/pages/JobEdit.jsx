import { useState } from 'react'

const AI_TOOLS = [
  'Claude', 'Claude Code', 'ChatGPT', 'GPT-4', 'Gemini', 'Perplexity',
  'Cursor', 'GitHub Copilot', 'Codeium', 'Windsurf', 'Replit AI',
  'Midjourney', 'DALL-E', 'Figma AI', 'Canva AI',
  'Notion AI', 'Jasper', 'Copy.ai',
  'v0', 'Bolt', 'Lovable'
]

const PROFICIENCY_LEVELS = [
  { value: 'familiar', label: 'Familiar', description: 'Has used AI tools occasionally' },
  { value: 'proficient', label: 'Proficient', description: 'Uses AI tools regularly and effectively' },
  { value: 'expert', label: 'Expert', description: 'Deep expertise, can train others' },
]

export default function JobEdit({ navigate, jobId }) {
  const [saved, setSaved] = useState(false)
  const [jobData, setJobData] = useState({
    title: 'Senior Frontend Engineer',
    description: `We're looking for a Senior Frontend Engineer who lives and breathes modern web development and isn't afraid to use AI tools to ship faster.

You'll be working on our flagship developer platform, building features that thousands of developers use daily. We care more about what you can build than where you went to school or how many years you've been coding.`,
    requirements: [
      '5+ years of frontend development experience',
      'Expert-level React and TypeScript',
      'Experience with modern build tools (Vite, webpack, etc.)',
      'Strong opinions on code quality and testing',
    ],
    niceToHave: [
      'Experience with design systems',
      'Background in developer tools',
      'Open source contributions',
    ],
    benefits: [
      'Competitive salary + equity',
      'Unlimited PTO',
      'Remote-first culture',
      'Home office stipend',
    ],
    location: 'remote',
    locationDetails: 'US & Canada',
    employmentType: 'full_time',
    experienceLevel: 'senior',
    salaryMin: '180000',
    salaryMax: '220000',
    aiTools: ['Cursor', 'Claude', 'v0'],
    proficiency: 'proficient',
    howYoullBeTested: "1-hour live build: We'll give you a Figma design and watch you build it with your AI tools. You can use Cursor, Claude Code, v0, or whatever makes you productive. We're evaluating your workflow, decision-making, and how you leverage AI to ship quality code fast.",
    status: 'active',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleTool = (tool) => {
    setJobData(prev => ({
      ...prev,
      aiTools: prev.aiTools.includes(tool)
        ? prev.aiTools.filter(t => t !== tool)
        : [...prev.aiTools, tool]
    }))
  }

  const updateArrayField = (field, index, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setJobData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (field, index) => {
    setJobData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
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

      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('employer-jobs')}
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to jobs
              </button>
              <h1 className="text-display text-display-lg">Edit Job</h1>
            </div>
            {saved && (
              <span className="flex items-center gap-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            )}
          </div>

          {/* Status */}
          <div className="card mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold mb-1">Job Status</h2>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {jobData.status === 'active' ? 'This job is currently live and accepting applications.' : 'This job is not visible to candidates.'}
                </p>
              </div>
              <select
                value={jobData.status}
                onChange={(e) => setJobData(prev => ({ ...prev, status: e.target.value }))}
                className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-2 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Basic Info */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-6">Job Details</h2>

            <div className="space-y-6">
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  JOB TITLE
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  onChange={(e) => setJobData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  DESCRIPTION
                </label>
                <textarea
                  value={jobData.description}
                  onChange={(e) => setJobData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                    LOCATION TYPE
                  </label>
                  <select
                    value={jobData.location}
                    onChange={(e) => setJobData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                    LOCATION DETAILS
                  </label>
                  <input
                    type="text"
                    value={jobData.locationDetails}
                    onChange={(e) => setJobData(prev => ({ ...prev, locationDetails: e.target.value }))}
                    placeholder="e.g., US only, Europe, etc."
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                    EMPLOYMENT TYPE
                  </label>
                  <select
                    value={jobData.employmentType}
                    onChange={(e) => setJobData(prev => ({ ...prev, employmentType: e.target.value }))}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                  >
                    <option value="full_time">Full-time</option>
                    <option value="part_time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                    EXPERIENCE LEVEL
                  </label>
                  <select
                    value={jobData.experienceLevel}
                    onChange={(e) => setJobData(prev => ({ ...prev, experienceLevel: e.target.value }))}
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior</option>
                    <option value="lead">Lead / Staff</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Salary Range</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Salary transparency is required on Vibe Jobs.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  MINIMUM (USD/year)
                </label>
                <input
                  type="number"
                  value={jobData.salaryMin}
                  onChange={(e) => setJobData(prev => ({ ...prev, salaryMin: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  MAXIMUM (USD/year)
                </label>
                <input
                  type="number"
                  value={jobData.salaryMax}
                  onChange={(e) => setJobData(prev => ({ ...prev, salaryMax: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>
          </div>

          {/* AI Tools */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Required AI Tools</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {AI_TOOLS.map(tool => (
                <button
                  key={tool}
                  onClick={() => toggleTool(tool)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    jobData.aiTools.includes(tool)
                      ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                      : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>

            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              PROFICIENCY LEVEL
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {PROFICIENCY_LEVELS.map(level => (
                <button
                  key={level.value}
                  onClick={() => setJobData(prev => ({ ...prev, proficiency: level.value }))}
                  className={`p-4 rounded-lg text-left transition-colors ${
                    jobData.proficiency === level.value
                      ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]'
                      : 'bg-[var(--color-bg-tertiary)] border border-transparent hover:border-[var(--color-border)]'
                  }`}
                >
                  <p className="font-medium">{level.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{level.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* How You'll Be Tested */}
          <div className="card mb-6 border-[var(--color-accent)]">
            <h2 className="text-lg font-semibold mb-4">How You'll Be Tested</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              This is the key differentiator on Vibe Jobs. Be specific about your interview process.
            </p>
            <textarea
              value={jobData.howYoullBeTested}
              onChange={(e) => setJobData(prev => ({ ...prev, howYoullBeTested: e.target.value }))}
              rows={4}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              {jobData.howYoullBeTested.length} characters (minimum 50)
            </p>
          </div>

          {/* Requirements */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">Requirements</h2>
            <div className="space-y-3">
              {jobData.requirements.map((req, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                    className="flex-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                  <button
                    onClick={() => removeArrayItem('requirements', index)}
                    className="btn btn-ghost text-red-400"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('requirements')}
                className="btn btn-ghost text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add requirement
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button className="btn btn-ghost text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Job
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('employer-jobs')}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
