import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UNIQUE_AI_TOOLS, ROLE_CATEGORIES, AVAILABILITY_STATUSES } from '../../lib/constants'

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

export default function ProfileSetup() {
  const navigate = useNavigate()
  const { user, profile, hasProfile, createProfile, updateProfile } = useAuth()

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
  const [saving, setSaving] = useState(false)

  // If user already has a profile, redirect to edit or prefill
  useEffect(() => {
    if (hasProfile && profile) {
      // Prefill with existing data
      setParsedData(profile)
      setSelectedTools(profile.ai_tools || [])
      setPortfolioUrls(profile.portfolio_urls?.length ? profile.portfolio_urls : [''])
      setAvailability(profile.availability || 'open')
      setRoleType(profile.role_type || '')
      setStep('review')
    }
  }, [hasProfile, profile])

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

  const handleSave = async () => {
    setSaving(true)
    setErrors([])

    try {
      const profileData = {
        first_name: parsedData.first_name,
        last_name: parsedData.last_name,
        email: parsedData.email || user?.email,
        headline: parsedData.headline,
        bio: parsedData.bio,
        location: parsedData.location,
        linkedin_url: parsedData.linkedin_url,
        role_type: roleType,
        years_experience: parsedData.years_experience,
        ai_tools: selectedTools,
        skills: parsedData.skills || [],
        portfolio_urls: portfolioUrls.filter(url => url.trim()),
        availability,
        profile_complete: true,
      }

      if (hasProfile) {
        await updateProfile(profileData)
      } else {
        await createProfile(profileData)
      }

      setStep('complete')
    } catch (error) {
      setErrors([error.message || 'Failed to save profile'])
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          to="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/jobs" className="btn btn-ghost">Browse Jobs</Link>
          <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
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
                <button
                  onClick={() => {
                    setParsedData({
                      first_name: '',
                      last_name: '',
                      email: user?.email || '',
                      headline: '',
                      bio: '',
                      location: '',
                      role_type: '',
                      years_experience: 0,
                      ai_tools: [],
                      skills: [],
                      portfolio_urls: [],
                      linkedin_url: '',
                    })
                    setStep('review')
                  }}
                  className="text-[var(--color-accent)] hover:underline"
                >
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
              <h1 className="text-display text-display-lg mb-4">
                {hasProfile ? 'Update your profile' : 'Review your profile'}
              </h1>
              <p className="text-large">
                {hasProfile ? 'Make changes and save.' : 'We parsed your resume. Review and customize before saving.'}
              </p>
            </div>

            {/* Basic Info */}
            <div className="card mb-6">
              <h3 className="mb-4">Basic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name *</label>
                  <input
                    type="text"
                    value={parsedData.first_name || ''}
                    onChange={(e) => setParsedData({ ...parsedData, first_name: e.target.value })}
                    className="input"
                    placeholder="Alex"
                  />
                </div>
                <div>
                  <label className="label">Last Name *</label>
                  <input
                    type="text"
                    value={parsedData.last_name || ''}
                    onChange={(e) => setParsedData({ ...parsedData, last_name: e.target.value })}
                    className="input"
                    placeholder="Chen"
                  />
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    value={parsedData.email || ''}
                    onChange={(e) => setParsedData({ ...parsedData, email: e.target.value })}
                    className="input"
                    placeholder="alex@example.com"
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    value={parsedData.location || ''}
                    onChange={(e) => setParsedData({ ...parsedData, location: e.target.value })}
                    className="input"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Headline</label>
                  <input
                    type="text"
                    value={parsedData.headline || ''}
                    onChange={(e) => setParsedData({ ...parsedData, headline: e.target.value })}
                    className="input"
                    placeholder="AI-First Frontend Engineer"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">Bio</label>
                  <textarea
                    value={parsedData.bio || ''}
                    onChange={(e) => setParsedData({ ...parsedData, bio: e.target.value })}
                    className="input textarea"
                    placeholder="Brief summary of your experience and what you're looking for..."
                  />
                </div>
                <div>
                  <label className="label">Years of Experience</label>
                  <input
                    type="number"
                    value={parsedData.years_experience || 0}
                    onChange={(e) => setParsedData({ ...parsedData, years_experience: parseInt(e.target.value) || 0 })}
                    className="input"
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <label className="label">LinkedIn URL</label>
                  <input
                    type="url"
                    value={parsedData.linkedin_url || ''}
                    onChange={(e) => setParsedData({ ...parsedData, linkedin_url: e.target.value })}
                    className="input"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div className="card mb-6">
              <h3 className="mb-4">AI Tools You Use *</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Select the AI tools you actively use in your work. This helps employers find you.
              </p>
              <div className="flex flex-wrap gap-2">
                {UNIQUE_AI_TOOLS.map(tool => (
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
              <h3 className="mb-4">Primary Role *</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ROLE_CATEGORIES.map(role => (
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
                {AVAILABILITY_STATUSES.map(option => (
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
                      className="input flex-1"
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

            {/* Errors */}
            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <ul className="list-disc list-inside text-sm text-red-400/80 space-y-1">
                    {errors.map((error, i) => (
                      <li key={i}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (hasProfile) {
                    navigate('/dashboard')
                  } else {
                    setStep('upload')
                  }
                }}
                className="btn btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {hasProfile ? 'Cancel' : 'Back'}
              </button>
              <button
                onClick={handleSave}
                disabled={selectedTools.length === 0 || !roleType || !parsedData.first_name || !parsedData.last_name || saving}
                className="btn btn-primary flex-1 justify-center"
              >
                {saving ? (
                  <>
                    <div className="spinner w-5 h-5" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Profile
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
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
            <h1 className="text-display text-display-lg mb-4">
              {hasProfile ? 'Profile updated!' : 'Profile created!'}
            </h1>
            <p className="text-large mb-8">
              Your profile is now visible to employers. Start applying to jobs that match your AI stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="btn btn-primary"
              >
                Browse Jobs
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/dashboard"
                className="btn btn-secondary"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
