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

const ROLE_CATEGORIES = [
  { value: 'engineer', label: 'Engineering' },
  { value: 'designer', label: 'Design' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'writer', label: 'Content / Writing' },
  { value: 'other', label: 'Other' },
]

const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
  { value: 'freelance', label: 'Freelance' },
]

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-8 years)' },
  { value: 'lead', label: 'Lead / Staff (8+ years)' },
]

const PROFICIENCY_LEVELS = [
  { value: 'familiar', label: 'Familiar', description: 'Has used AI tools occasionally' },
  { value: 'proficient', label: 'Proficient', description: 'Uses AI tools regularly and effectively' },
  { value: 'expert', label: 'Expert', description: 'Deep expertise, can train others' },
]

const TEST_TEMPLATES = {
  engineer: "1-hour live build: We'll give you a design and watch you build it with your AI tools. Use Cursor, Claude, or whatever makes you productive.",
  designer: "2-hour design challenge: Create mockups for a feature we describe. Use Figma AI, Midjourney, or any AI design tools you prefer.",
  product: "2-hour PRD sprint: Write a spec for a feature we describe. Use whatever AI tools help you think and write faster.",
  marketer: "1-hour campaign brief: Create a go-to-market plan for a product launch. Show us how you use AI to research and write.",
  sales: "30-min pitch prep: We'll give you a prospect profile. Show us how you use AI to research and personalize your approach.",
  ops: "1-hour automation challenge: Design a workflow automation for a process we describe. Use Zapier AI, Make, or similar tools.",
  writer: "1-hour content creation: Write a blog post or marketing copy on a topic we provide. Show us your AI-assisted writing process.",
  other: "Practical skills assessment: We'll design a test relevant to the role that lets you demonstrate your AI-augmented workflow.",
}

const SAMPLE_PROMPT = `Parse this job description into JSON format for a job board:

{
  "company_name": "string",
  "job_title": "string",
  "role_category": "engineer|designer|product|marketer|sales|ops|writer|other",
  "employment_type": "full_time|part_time|contract|freelance",
  "experience_level": "entry|mid|senior|lead",
  "location_type": "remote|hybrid|onsite",
  "location_details": "string (city/country if applicable)",
  "description": "string (full job description)",
  "requirements": ["array of requirements"],
  "nice_to_have": ["array of nice-to-haves"],
  "benefits": ["array of benefits"],
  "salary_min": number,
  "salary_max": number,
  "ai_tools_required": ["array of AI tools"],
  "ai_proficiency": "familiar|proficient|expert"
}

Here's the job description:
[PASTE JOB DESCRIPTION HERE]`

export default function JobPostNew({ navigate }) {
  const [step, setStep] = useState('upload') // 'upload' | 'review' | 'test' | 'preview' | 'complete'
  const [jsonInput, setJsonInput] = useState('')
  const [parsedData, setParsedData] = useState(null)
  const [errors, setErrors] = useState([])
  const [copied, setCopied] = useState(false)
  const [showSchema, setShowSchema] = useState(false)

  // Editable fields
  const [selectedTools, setSelectedTools] = useState([])
  const [proficiency, setProficiency] = useState('proficient')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [howYoullBeTested, setHowYoullBeTested] = useState('')

  const copyPrompt = () => {
    navigator.clipboard.writeText(SAMPLE_PROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateJson = (json) => {
    const errors = []

    if (!json.company_name) errors.push('Company name is required')
    if (!json.job_title) errors.push('Job title is required')
    if (!json.role_category) errors.push('Role category is required')
    if (!json.employment_type) errors.push('Employment type is required')
    if (!json.description) errors.push('Job description is required')

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
      setSelectedTools(parsed.ai_tools_required || [])
      setProficiency(parsed.ai_proficiency || 'proficient')
      setSalaryMin(parsed.salary_min?.toString() || '')
      setSalaryMax(parsed.salary_max?.toString() || '')

      // Pre-fill test template based on role
      if (!howYoullBeTested && parsed.role_category) {
        setHowYoullBeTested(TEST_TEMPLATES[parsed.role_category] || TEST_TEMPLATES.other)
      }

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

  const applyTemplate = (category) => {
    setHowYoullBeTested(TEST_TEMPLATES[category] || TEST_TEMPLATES.other)
  }

  const handlePost = () => {
    // Validate salary
    if (!salaryMin || !salaryMax) {
      setErrors(['Salary range is required'])
      return
    }
    if (parseInt(salaryMax) < parseInt(salaryMin)) {
      setErrors(['Maximum salary must be greater than minimum'])
      return
    }
    if (howYoullBeTested.length < 50) {
      setErrors(['"How You\'ll Be Tested" must be at least 50 characters'])
      return
    }
    if (selectedTools.length === 0) {
      setErrors(['Select at least one required AI tool'])
      return
    }

    setErrors([])
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
          <button onClick={() => navigate('employer-jobs')} className="btn btn-ghost">My Jobs</button>
          <button onClick={() => navigate('employer-dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-12">
        {/* Progress indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {['Upload', 'Details', 'Test Format', 'Preview'].map((label, index) => {
              const stepNum = index + 1
              const stepNames = ['upload', 'review', 'test', 'preview']
              const currentStepIndex = stepNames.indexOf(step)
              const isComplete = currentStepIndex > index || step === 'complete'
              const isCurrent = stepNames[index] === step

              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCurrent ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' :
                      isComplete ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)]' :
                      'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                    }`}>
                      {isComplete && !isCurrent ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : stepNum}
                    </div>
                    <span className={isCurrent ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}>{label}</span>
                  </div>
                  {index < 3 && <div className="w-12 md:w-24 h-px bg-[var(--color-border)] mx-4" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">Post a new job</h1>
              <p className="text-large">
                Use AI to parse your job description, then customize the details.
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
            </div>

            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Step 2: Paste the JSON output</h3>
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className="text-sm text-[var(--color-accent)] hover:underline"
                >
                  {showSchema ? 'Hide example' : 'View example'}
                </button>
              </div>

              {showSchema && (
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-xs text-[var(--color-text-muted)] mb-4 max-h-48 overflow-y-auto">
                  <pre>{JSON.stringify({
                    company_name: "Acme Corp",
                    job_title: "Senior Frontend Engineer",
                    role_category: "engineer",
                    employment_type: "full_time",
                    experience_level: "senior",
                    location_type: "remote",
                    location_details: "US only",
                    description: "We're looking for a senior frontend engineer...",
                    requirements: ["5+ years React", "TypeScript expertise"],
                    ai_tools_required: ["Cursor", "Claude"],
                    ai_proficiency: "proficient",
                    salary_min: 180000,
                    salary_max: 220000
                  }, null, 2)}</pre>
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
                  <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                  </ul>
                </div>
              )}

              <button
                onClick={parseJson}
                disabled={!jsonInput.trim()}
                className="btn btn-primary w-full justify-center mt-4"
              >
                Parse & Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review Details */}
        {step === 'review' && parsedData && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">Review job details</h1>
              <p className="text-large">Verify the parsed information and add salary details.</p>
            </div>

            <div className="card mb-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">COMPANY</label>
                  <p className="text-lg">{parsedData.company_name}</p>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">JOB TITLE</label>
                  <p className="text-lg">{parsedData.job_title}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">CATEGORY</label>
                  <p>{ROLE_CATEGORIES.find(r => r.value === parsedData.role_category)?.label || parsedData.role_category}</p>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">TYPE</label>
                  <p>{EMPLOYMENT_TYPES.find(t => t.value === parsedData.employment_type)?.label || parsedData.employment_type}</p>
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">LOCATION</label>
                  <p>{parsedData.location_type} {parsedData.location_details && `· ${parsedData.location_details}`}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">DESCRIPTION</label>
                <p className="text-[var(--color-text-secondary)] whitespace-pre-line">{parsedData.description}</p>
              </div>

              {parsedData.requirements?.length > 0 && (
                <div className="mb-6">
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">REQUIREMENTS</label>
                  <ul className="list-disc list-inside text-[var(--color-text-secondary)] space-y-1">
                    {parsedData.requirements.map((req, i) => <li key={i}>{req}</li>)}
                  </ul>
                </div>
              )}
            </div>

            {/* Salary - REQUIRED */}
            <div className="card mb-6">
              <div className="flex items-start gap-3 mb-4">
                <h3>Salary Range</h3>
                <span className="badge badge-accent text-xs">Required</span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Salary transparency is required on Vibe Jobs. No "competitive salary" allowed.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">MINIMUM (USD/year)</label>
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="120000"
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">MAXIMUM (USD/year)</label>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="160000"
                    className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
              </div>
            </div>

            {/* AI Tools */}
            <div className="card mb-6">
              <h3 className="mb-4">Required AI Tools</h3>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Select the AI tools candidates should know. This helps match you with the right people.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
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

              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">PROFICIENCY LEVEL</label>
              <div className="grid md:grid-cols-3 gap-3">
                {PROFICIENCY_LEVELS.map(level => (
                  <button
                    key={level.value}
                    onClick={() => setProficiency(level.value)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      proficiency === level.value
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

            <div className="flex gap-4">
              <button onClick={() => setStep('upload')} className="btn btn-ghost">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={() => setStep('test')}
                disabled={!salaryMin || !salaryMax || selectedTools.length === 0}
                className="btn btn-primary flex-1 justify-center"
              >
                Continue to Test Format
              </button>
            </div>
          </div>
        )}

        {/* Step 3: How You'll Be Tested */}
        {step === 'test' && parsedData && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">How will candidates be tested?</h1>
              <p className="text-large">
                This is what makes Vibe Jobs different. Tell candidates exactly how they'll be interviewed.
              </p>
            </div>

            <div className="card mb-6">
              <div className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-[var(--color-accent)]">No LeetCode ambushes</p>
                    <p className="text-[var(--color-text-secondary)]">
                      Vibe Jobs candidates know how they'll be evaluated upfront. Describe your interview process so they can prepare.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-mono text-xs text-[var(--color-text-muted)]">HOW YOU'LL BE TESTED</label>
                  <span className="text-xs text-[var(--color-text-muted)]">{howYoullBeTested.length} characters (min 50)</span>
                </div>
                <textarea
                  value={howYoullBeTested}
                  onChange={(e) => setHowYoullBeTested(e.target.value)}
                  placeholder="Describe your interview process. What will candidates build, present, or demonstrate? How can they use AI tools during the interview?"
                  className="w-full h-40 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
                />
              </div>

              <div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(TEST_TEMPLATES).slice(0, 4).map(([key, _]) => (
                    <button
                      key={key}
                      onClick={() => applyTemplate(key)}
                      className="px-3 py-1.5 bg-[var(--color-bg-tertiary)] rounded-lg text-sm hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                    >
                      {ROLE_CATEGORIES.find(r => r.value === key)?.label || key}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep('review')} className="btn btn-ghost">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={() => setStep('preview')}
                disabled={howYoullBeTested.length < 50}
                className="btn btn-primary flex-1 justify-center"
              >
                Preview Job Post
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 'preview' && parsedData && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-display text-display-lg mb-4">Preview your job post</h1>
              <p className="text-large">This is how candidates will see your listing.</p>
            </div>

            {/* Job Card Preview */}
            <div className="card mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl mb-1">{parsedData.job_title}</h2>
                  <p className="text-[var(--color-text-muted)]">
                    {parsedData.company_name} · {parsedData.location_type}
                    {parsedData.location_details && ` · ${parsedData.location_details}`}
                  </p>
                </div>
                <span className="badge">${parseInt(salaryMin).toLocaleString()} - ${parseInt(salaryMax).toLocaleString()}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedTools.map(tool => (
                  <span key={tool} className="badge badge-accent">{tool}</span>
                ))}
                <span className="badge">{proficiency} proficiency</span>
              </div>

              <div className="mb-6">
                <p className="text-[var(--color-text-secondary)] whitespace-pre-line">{parsedData.description}</p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-6">
                <div className="text-mono text-xs text-[var(--color-accent)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-[var(--color-text-secondary)]">{howYoullBeTested}</p>
              </div>
            </div>

            {errors.length > 0 && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            )}

            <div className="flex gap-4">
              <button onClick={() => setStep('test')} className="btn btn-ghost">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <button
                onClick={handlePost}
                className="btn btn-primary flex-1 justify-center"
              >
                Post Job
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Complete */}
        {step === 'complete' && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-display text-display-lg mb-4">Job posted!</h1>
            <p className="text-large mb-8">
              Your job is now live. Candidates with matching AI skills will start applying soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('employer-jobs')}
                className="btn btn-primary"
              >
                View My Jobs
              </button>
              <button
                onClick={() => {
                  setStep('upload')
                  setJsonInput('')
                  setParsedData(null)
                  setSelectedTools([])
                  setSalaryMin('')
                  setSalaryMax('')
                  setHowYoullBeTested('')
                }}
                className="btn btn-secondary"
              >
                Post Another Job
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
