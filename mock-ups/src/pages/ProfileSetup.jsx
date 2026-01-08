import { useState } from 'react'

const AI_TOOLS = [
  'Claude', 'Claude Code', 'ChatGPT', 'GPT-4', 'Gemini', 'Perplexity',
  'Cursor', 'GitHub Copilot', 'Codeium', 'Windsurf', 'Replit AI',
  'Midjourney', 'DALL-E', 'Stable Diffusion', 'Figma AI', 'Canva AI',
  'Notion AI', 'Jasper', 'Copy.ai', 'Grammarly AI',
  'Runway', 'Pika', 'ElevenLabs', 'Descript',
  'Zapier AI', 'Make', 'n8n', 'Bardeen',
  'Julius AI', 'v0', 'Bolt', 'Lovable'
]

const ROLE_TYPES = [
  { value: 'engineer', label: 'Engineer' },
  { value: 'designer', label: 'Designer' },
  { value: 'product', label: 'Product Manager' },
  { value: 'marketer', label: 'Marketer' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'writer', label: 'Writer / Content' },
  { value: 'other', label: 'Other' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'actively_looking', label: 'Actively looking', description: 'Ready to interview now' },
  { value: 'open', label: 'Open to opportunities', description: 'Not actively searching but interested' },
  { value: 'not_looking', label: 'Not looking', description: 'Just browsing' },
]

const SAMPLE_PROMPT = `Parse my resume into this JSON format for a job board profile:

{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "headline": "string (e.g., 'Senior Frontend Engineer')",
  "bio": "string (2-3 sentence summary)",
  "location": "string (city, state/country)",
  "role_type": "engineer|designer|product|marketer|sales|ops|writer|other",
  "years_experience": number,
  "ai_tools": ["array of AI tools you use"],
  "skills": ["array of other skills"],
  "portfolio_urls": ["array of portfolio/project URLs"],
  "linkedin_url": "string (optional)"
}

Here's my resume:
[PASTE YOUR RESUME TEXT HERE]`

const SCHEMA_EXAMPLE = `{
  "first_name": "Alex",
  "last_name": "Chen",
  "email": "alex@example.com",
  "headline": "AI-First Frontend Engineer",
  "bio": "Building web apps with AI tools...",
  "location": "San Francisco, CA",
  "role_type": "engineer",
  "years_experience": 5,
  "ai_tools": ["Cursor", "Claude", "v0"],
  "skills": ["React", "TypeScript", "Next.js"],
  "portfolio_urls": ["https://github.com/alex"],
  "linkedin_url": "https://linkedin.com/in/alex"
}`

export default function ProfileSetup({ navigate }) {
  const [step, setStep] = useState('upload') // 'upload' | 'review' | 'complete'
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState(null)
  const [errors, setErrors] = useState([])
  const [selectedTools, setSelectedTools] = useState([])
  const [portfolioUrls, setPortfolioUrls] = useState([''])
  const [availability, setAvailability] = useState('open')
  const [roleType, setRoleType] = useState('')
  const [copied, setCopied] = useState(false)
  const [showSchema, setShowSchema] = useState(false)

  const copyPrompt = () => {
    navigator.clipboard.writeText(SAMPLE_PROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateJson = (json) => {
    const errors = []

    if (!json.first_name) errors.push('First name is required')
    if (!json.last_name) errors.push('Last name is required')
    if (!json.email) errors.push('Email is required')
    if (!json.role_type) errors.push('Role type is required')
    if (!json.ai_tools || json.ai_tools.length === 0) {
      errors.push('At least one AI tool is required')
    }

    return errors
  }

  const parseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const validationErrors = validateJson(parsed)

      if (validationErrors.length > 0) {
        setErrors(validationErrors)
        setParsedData(null)
        return
      }

      setParsedData(parsed)
      setErrors([])
      setSelectedTools(parsed.ai_tools || [])
      setPortfolioUrls(parsed.portfolio_urls?.length ? parsed.portfolio_urls : [''])
      setRoleType(parsed.role_type || '')
      setStep('review')
    } catch (e) {
      setErrors(['Invalid JSON format. Please check your input.'])
      setParsedData(null)
    }
  }

  const toggleTool = (tool) => {
    setSelectedTools(prev =>
      prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    )
  }

  const addPortfolioUrl = () => {
    setPortfolioUrls(prev => [...prev, ''])
  }

  const updatePortfolioUrl = (index, value) => {
    setPortfolioUrls(prev => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const removePortfolioUrl = (index) => {
    setPortfolioUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Simulate save
    setStep('complete')
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
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">Browse Jobs</button>
          <button onClick={() => navigate('dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-12">
        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'upload' ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'}`}>
                {step !== 'upload' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : '1'}
              </div>
              <span className={step === 'upload' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>Upload & Parse</span>
            </div>
            <div className="flex-1 h-px bg-[var(--color-border)] mx-4" />
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'review' ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' : step === 'complete' ? 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'}`}>
                {step === 'complete' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : '2'}
              </div>
              <span className={step === 'review' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>Review & Customize</span>
            </div>
            <div className="flex-1 h-px bg-[var(--color-border)] mx-4" />
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'complete' ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'}`}>
                3
              </div>
              <span className={step === 'complete' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>Complete</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload & Parse */}
        {step === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">Create your profile</h1>
              <p className="text-large">
                Use your favorite AI to parse your resume, then paste the JSON below.
              </p>
            </div>

            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Step 1: Copy the parsing prompt</h3>
                <button
                  onClick={copyPrompt}
                  className="btn btn-secondary text-sm"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Prompt
                    </>
                  )}
                </button>
              </div>
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-muted)] max-h-48 overflow-y-auto">
                <pre className="whitespace-pre-wrap">{SAMPLE_PROMPT}</pre>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-3">
                Paste this into Claude, ChatGPT, or any LLM along with your resume text.
              </p>
            </div>

            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Step 2: Paste the JSON output</h3>
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  {showSchema ? 'Hide schema' : 'View schema'}
                </button>
              </div>

              {showSchema && (
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-sm text-[var(--color-text-muted)] mb-4">
                  <pre className="whitespace-pre-wrap">{SCHEMA_EXAMPLE}</pre>
                </div>
              )}

              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="w-full h-64 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />

              {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-red-400 mb-2">Validation errors:</p>
                      <ul className="list-disc list-inside text-sm text-red-400/80 space-y-1">
                        {errors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={parseJson}
                disabled={!jsonInput.trim()}
                className="btn btn-primary w-full justify-center mt-4"
              >
                Parse & Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                Don't have a resume? You can{' '}
                <button className="text-[var(--color-accent)] hover:underline">
                  fill out the form manually
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Review & Customize */}
        {step === 'review' && parsedData && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">Review your profile</h1>
              <p className="text-large">
                We parsed your resume. Review and customize before saving.
              </p>
            </div>

            {/* Parsed info card */}
            <div className="card mb-6">
              <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
                <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-2xl font-bold text-[var(--color-bg-primary)]">
                  {parsedData.first_name?.[0]}{parsedData.last_name?.[0]}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl mb-1">{parsedData.first_name} {parsedData.last_name}</h2>
                  <p className="text-[var(--color-text-muted)]">{parsedData.headline}</p>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{parsedData.location}</p>
                </div>
                <button className="btn btn-ghost text-sm">Edit basics</button>
              </div>

              {parsedData.bio && (
                <div className="mb-6">
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">BIO</label>
                  <p className="text-[var(--color-text-secondary)]">{parsedData.bio}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">EMAIL</label>
                  <p>{parsedData.email}</p>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">EXPERIENCE</label>
                  <p>{parsedData.years_experience} years</p>
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div className="card mb-6">
              <h3 className="mb-4">AI Tools You Use</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Select the AI tools you actively use in your work. This helps employers find you.
              </p>
              <div className="flex flex-wrap gap-2">
                {AI_TOOLS.map(tool => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedTools.includes(tool)
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                    }`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
              {selectedTools.length === 0 && (
                <p className="text-sm text-red-400 mt-3">Select at least one AI tool</p>
              )}
            </div>

            {/* Role Type */}
            <div className="card mb-6">
              <h3 className="mb-4">Primary Role</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ROLE_TYPES.map(role => (
                  <button
                    key={role.value}
                    onClick={() => setRoleType(role.value)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      roleType === role.value
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]/80'
                    }`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card mb-6">
              <h3 className="mb-4">Job Search Status</h3>
              <div className="grid gap-3">
                {AVAILABILITY_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setAvailability(option.value)}
                    className={`flex items-center gap-4 p-4 rounded-lg text-left transition-colors ${
                      availability === option.value
                        ? 'bg-[var(--color-accent)]/10 border border-[var(--color-accent)]'
                        : 'bg-[var(--color-bg-tertiary)] border border-transparent hover:border-[var(--color-border)]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      availability === option.value
                        ? 'border-[var(--color-accent)]'
                        : 'border-[var(--color-border)]'
                    }`}>
                      {availability === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{option.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Portfolio URLs */}
            <div className="card mb-6">
              <h3 className="mb-4">Portfolio & Links</h3>
              <div className="space-y-3">
                {portfolioUrls.map((url, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => updatePortfolioUrl(index, e.target.value)}
                      placeholder="https://github.com/username"
                      className="flex-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                    />
                    {portfolioUrls.length > 1 && (
                      <button
                        onClick={() => removePortfolioUrl(index)}
                        className="btn btn-ghost text-red-400 hover:text-red-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPortfolioUrl}
                  className="btn btn-ghost text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add another link
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setStep('upload')}
                className="btn btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={handleSave}
                disabled={selectedTools.length === 0 || !roleType}
                className="btn btn-primary flex-1 justify-center"
              >
                Save Profile
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 'complete' && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-display text-display-lg mb-4">Profile created!</h1>
            <p className="text-large mb-8">
              Your profile is now visible to employers. Start applying to jobs that match your AI stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('jobs')}
                className="btn btn-primary"
              >
                Browse Jobs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => navigate('dashboard')}
                className="btn btn-secondary"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
