'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCompanyJobs } from '@/hooks/useCompanyJobs'
import type { Enums } from '@/lib/database.types'
import { UNIQUE_AI_TOOLS } from '@/lib/constants'

const ROLE_CATEGORIES = [
  { value: 'engineer', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'other', label: 'Other' },
]

const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead / Manager' },
]

const LOCATION_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
]

const EMPLOYMENT_TYPES = [
  { value: 'full_time', label: 'Full-time' },
  { value: 'part_time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
]

const AI_PROFICIENCY_LEVELS = [
  { value: 'familiar', label: 'Familiar', description: 'Has used AI tools' },
  { value: 'proficient', label: 'Proficient', description: 'Uses AI tools regularly' },
  { value: 'expert', label: 'Expert', description: 'Highly skilled with AI tools' },
]

// Popular tools shown by default
const POPULAR_TOOLS = [
  'Claude Code',
  'Cursor',
  'GitHub Copilot',
  'ChatGPT',
  'v0',
  'Bolt.new',
  'Windsurf',
  'Aider',
  'Devin',
  'Lovable',
]

interface JobEditorProps {
  initialData?: {
    id?: string
    title?: string
    description?: string
    role_category?: string
    experience_level?: string
    location_type?: string
    location_details?: string
    employment_type?: string
    salary_min?: number
    salary_max?: number
    ai_tools_required?: string[]
    ai_proficiency?: string
    how_youll_be_tested?: string
    requirements?: string[]
    nice_to_have?: string[]
    benefits?: string[]
    status?: string
  }
  mode?: 'create' | 'edit'
}

export default function JobEditor({ initialData, mode = 'create' }: JobEditorProps) {
  const router = useRouter()
  const { company, loading: authLoading } = useAuth()
  const { createJob, updateJob } = useCompanyJobs(company?.id)

  // Track if company data is ready for submission
  const companyReady = !!company?.id

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    role_category: initialData?.role_category || 'engineer',
    experience_level: initialData?.experience_level || 'mid',
    location_type: initialData?.location_type || 'remote',
    location_details: initialData?.location_details || '',
    employment_type: initialData?.employment_type || 'full_time',
    salary_min: initialData?.salary_min || 100000,
    salary_max: initialData?.salary_max || 150000,
    ai_tools_required: initialData?.ai_tools_required || [],
    ai_proficiency: initialData?.ai_proficiency || 'proficient',
    how_youll_be_tested: initialData?.how_youll_be_tested || '',
    requirements: initialData?.requirements?.join('\n') || '',
    nice_to_have: initialData?.nice_to_have?.join('\n') || '',
    benefits: initialData?.benefits?.join('\n') || '',
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAllTools, setShowAllTools] = useState(false)

  // Get tools to display based on expanded state
  const displayedTools = showAllTools ? UNIQUE_AI_TOOLS : POPULAR_TOOLS

  const handleChange = (field: string, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleTool = (tool: string) => {
    const newTools = formData.ai_tools_required.includes(tool)
      ? formData.ai_tools_required.filter(t => t !== tool)
      : [...formData.ai_tools_required, tool]
    handleChange('ai_tools_required', newTools)
  }

  const parseListField = (text: string): string[] => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
  }

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const jobData = {
        title: formData.title,
        description: formData.description,
        role_category: formData.role_category as Enums<'role_category'>,
        experience_level: formData.experience_level as Enums<'experience_level'>,
        location_type: formData.location_type as Enums<'location_type'>,
        location_details: formData.location_details || null,
        employment_type: formData.employment_type as Enums<'employment_type'>,
        salary_min: formData.salary_min,
        salary_max: formData.salary_max,
        salary_currency: 'USD',
        ai_tools_required: formData.ai_tools_required,
        ai_proficiency: formData.ai_proficiency as Enums<'ai_proficiency'>,
        how_youll_be_tested: formData.how_youll_be_tested,
        requirements: parseListField(formData.requirements),
        nice_to_have: parseListField(formData.nice_to_have),
        benefits: parseListField(formData.benefits),
        status: publish ? 'active' : 'draft',
      }

      if (mode === 'edit' && initialData?.id) {
        await updateJob(initialData.id, jobData)
      } else {
        await createJob(jobData)
      }

      router.push('/company/jobs')
    } catch (err) {
      setError((err as Error).message || 'Failed to save job')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {/* Show loading indicator if company data is still loading */}
      {authLoading && !companyReady && (
        <div className="alert alert-info">
          Loading company data...
        </div>
      )}

      {/* Basic Info */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Job Details</h2>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            JOB TITLE *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
            placeholder="e.g., Senior Full-Stack Engineer"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            DESCRIPTION *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            rows={5}
            placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              ROLE CATEGORY
            </label>
            <select
              value={formData.role_category}
              onChange={(e) => handleChange('role_category', e.target.value)}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
            >
              {ROLE_CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              EXPERIENCE LEVEL
            </label>
            <select
              value={formData.experience_level}
              onChange={(e) => handleChange('experience_level', e.target.value)}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
            >
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location & Employment */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Location & Employment</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              WORK LOCATION
            </label>
            <select
              value={formData.location_type}
              onChange={(e) => handleChange('location_type', e.target.value)}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
            >
              {LOCATION_TYPES.map(loc => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              LOCATION DETAILS
            </label>
            <input
              type="text"
              value={formData.location_details}
              onChange={(e) => handleChange('location_details', e.target.value)}
              placeholder="e.g., US timezones preferred"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            EMPLOYMENT TYPE
          </label>
          <select
            value={formData.employment_type}
            onChange={(e) => handleChange('employment_type', e.target.value)}
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
          >
            {EMPLOYMENT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Salary */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Compensation</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              SALARY MIN (USD) *
            </label>
            <input
              type="number"
              value={formData.salary_min}
              onChange={(e) => handleChange('salary_min', parseInt(e.target.value) || 0)}
              required
              min={0}
              step={5000}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              SALARY MAX (USD) *
            </label>
            <input
              type="number"
              value={formData.salary_max}
              onChange={(e) => handleChange('salary_max', parseInt(e.target.value) || 0)}
              required
              min={0}
              step={5000}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      {/* AI Tools */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">AI Requirements</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          This is what sets Vibe Jobs apart - be specific about the AI tools candidates should know.
        </p>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            AI PROFICIENCY LEVEL
          </label>
          <div className="grid md:grid-cols-3 gap-2">
            {AI_PROFICIENCY_LEVELS.map(level => (
              <label
                key={level.value}
                className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.ai_proficiency === level.value
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                    : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                <input
                  type="radio"
                  name="ai_proficiency"
                  value={level.value}
                  checked={formData.ai_proficiency === level.value}
                  onChange={(e) => handleChange('ai_proficiency', e.target.value)}
                  className="sr-only"
                />
                <span className="font-medium">{level.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{level.description}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            REQUIRED AI TOOLS
          </label>
          <div className="flex flex-wrap gap-2">
            {displayedTools.map(tool => (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={`badge cursor-pointer transition-colors ${
                  formData.ai_tools_required.includes(tool)
                    ? 'badge-accent'
                    : 'hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {tool}
                {formData.ai_tools_required.includes(tool) && (
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Show more/less toggle */}
          <button
            type="button"
            onClick={() => setShowAllTools(!showAllTools)}
            className="text-xs text-[var(--color-accent)] hover:underline mt-3 flex items-center gap-1"
          >
            {showAllTools ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Show fewer tools
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Show all {UNIQUE_AI_TOOLS.length} tools
              </>
            )}
          </button>

          {formData.ai_tools_required.length > 0 && (
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              {formData.ai_tools_required.length} tool{formData.ai_tools_required.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>

      {/* How You'll Be Tested - THE DIFFERENTIATOR */}
      <div className="card border-[var(--color-accent)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <svg className="w-4 h-4 text-[var(--color-bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">How They&apos;ll Be Tested *</h2>
        </div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          This is what candidates want to see. Be specific about your interview process.
        </p>

        <textarea
          value={formData.how_youll_be_tested}
          onChange={(e) => handleChange('how_youll_be_tested', e.target.value)}
          required
          rows={4}
          placeholder="e.g., 1-hour live build: We'll give you a design and watch you build it with your AI tools. No whiteboard puzzles - just real coding with the tools you actually use."
          className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
        />
      </div>

      {/* Requirements & Benefits */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Requirements & Benefits</h2>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            REQUIREMENTS (one per line)
          </label>
          <textarea
            value={formData.requirements}
            onChange={(e) => handleChange('requirements', e.target.value)}
            rows={4}
            placeholder="3+ years of full-stack development&#10;Experience with React and Node.js&#10;Strong communication skills"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            NICE TO HAVE (one per line)
          </label>
          <textarea
            value={formData.nice_to_have}
            onChange={(e) => handleChange('nice_to_have', e.target.value)}
            rows={3}
            placeholder="Experience with TypeScript&#10;Open source contributions&#10;Previous startup experience"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            BENEFITS (one per line)
          </label>
          <textarea
            value={formData.benefits}
            onChange={(e) => handleChange('benefits', e.target.value)}
            rows={4}
            placeholder="Competitive salary + equity&#10;Unlimited PTO&#10;Health, dental, and vision&#10;Remote-first culture"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={saving || !companyReady}
          className="btn btn-ghost"
          title={!companyReady ? 'Waiting for company data to load...' : undefined}
        >
          {saving ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={saving || !companyReady}
          className="btn btn-primary"
          title={!companyReady ? 'Waiting for company data to load...' : undefined}
        >
          {saving ? (
            <>
              <div className="spinner w-4 h-4" />
              Publishing...
            </>
          ) : (
            'Publish Job'
          )}
        </button>
      </div>
    </form>
  )
}
