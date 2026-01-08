import { useState } from 'react'

const AI_CULTURE_OPTIONS = [
  { value: 'ai_encouraged', label: 'AI Encouraged', description: 'We support team members using AI tools' },
  { value: 'ai_expected', label: 'AI Expected', description: 'We expect regular use of AI tools' },
  { value: 'ai_required', label: 'AI Required', description: 'AI fluency is essential for all roles' },
]

const AI_TOOLS = [
  'Claude', 'Claude Code', 'ChatGPT', 'GPT-4', 'Gemini', 'Perplexity',
  'Cursor', 'GitHub Copilot', 'Codeium', 'Windsurf', 'Replit AI',
  'Midjourney', 'DALL-E', 'Figma AI', 'Canva AI',
  'Notion AI', 'Jasper', 'Copy.ai',
  'v0', 'Bolt', 'Lovable'
]

export default function CompanyProfile({ navigate }) {
  const [companyData, setCompanyData] = useState({
    name: 'Acme Corp',
    website: 'https://acmecorp.com',
    description: "Acme Corp is building the future of developer productivity. We believe AI should augment human creativity, not replace it. Our team ships fast and iterates constantly.",
    size: '50-100',
    industry: 'Developer Tools',
    aiCulture: 'ai_expected',
    toolsUsed: ['Cursor', 'Claude', 'Claude Code', 'v0', 'GitHub Copilot'],
    location: 'San Francisco, CA',
    remote: 'remote_first',
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleTool = (tool) => {
    setCompanyData(prev => ({
      ...prev,
      toolsUsed: prev.toolsUsed.includes(tool)
        ? prev.toolsUsed.filter(t => t !== tool)
        : [...prev.toolsUsed, tool]
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-display text-display-lg mb-2">Company Profile</h1>
              <p className="text-[var(--color-text-muted)]">
                Edit your company information and AI culture settings
              </p>
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

          {/* Logo & Basic Info */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>

            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-4xl font-bold text-[var(--color-bg-primary)]">
                {companyData.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm text-[var(--color-text-muted)] mb-2">Company Logo</p>
                <button className="btn btn-secondary text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Logo
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  value={companyData.name}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  WEBSITE
                </label>
                <input
                  type="url"
                  value={companyData.website}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                COMPANY DESCRIPTION
              </label>
              <textarea
                value={companyData.description}
                onChange={(e) => setCompanyData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  COMPANY SIZE
                </label>
                <select
                  value={companyData.size}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="50-100">50-100 employees</option>
                  <option value="100-500">100-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  INDUSTRY
                </label>
                <input
                  type="text"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-6">Location</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  HEADQUARTERS
                </label>
                <input
                  type="text"
                  value={companyData.location}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                  REMOTE POLICY
                </label>
                <select
                  value={companyData.remote}
                  onChange={(e) => setCompanyData(prev => ({ ...prev, remote: e.target.value }))}
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)]"
                >
                  <option value="onsite">On-site only</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote_first">Remote-first</option>
                  <option value="fully_remote">Fully remote</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Culture */}
          <div className="card mb-6">
            <h2 className="text-lg font-semibold mb-4">AI Culture</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              This badge appears on all your job listings to attract AI-fluent candidates.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {AI_CULTURE_OPTIONS.map(option => (
                <button
                  key={option.value}
                  onClick={() => setCompanyData(prev => ({ ...prev, aiCulture: option.value }))}
                  className={`p-4 rounded-lg text-left transition-colors ${
                    companyData.aiCulture === option.value
                      ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]'
                      : 'bg-[var(--color-bg-tertiary)] border border-transparent hover:border-[var(--color-border)]'
                  }`}
                >
                  <p className="font-medium mb-1">{option.label}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{option.description}</p>
                </button>
              ))}
            </div>

            <div>
              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-3">
                AI TOOLS YOUR TEAM USES
              </label>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map(tool => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      companyData.toolsUsed.includes(tool)
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate('employer-dashboard')}
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
      </main>
    </div>
  )
}
