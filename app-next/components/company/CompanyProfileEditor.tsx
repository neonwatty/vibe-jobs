'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const COMPANY_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
]

const REMOTE_POLICIES = [
  { value: 'remote', label: 'Fully Remote', description: 'Work from anywhere' },
  { value: 'hybrid', label: 'Hybrid', description: 'Mix of remote and in-office' },
  { value: 'onsite', label: 'On-site', description: 'Work from office' },
]

const POPULAR_AI_TOOLS = [
  'Claude',
  'ChatGPT',
  'GitHub Copilot',
  'Cursor',
  'v0',
  'Midjourney',
  'DALL-E',
  'Stable Diffusion',
  'Jasper',
  'Copy.ai',
]

export default function CompanyProfileEditor() {
  const { company, createCompany, updateCompany, user } = useAuth()

  const [formData, setFormData] = useState({
    name: company?.name || '',
    website: company?.website || '',
    logo_url: company?.logo_url || '',
    industry: company?.industry || '',
    company_size: company?.company_size || '',
    headquarters: company?.headquarters || '',
    remote_policy: company?.remote_policy || 'hybrid',
    description: company?.description || '',
    ai_culture: company?.ai_culture || '',
    ai_tools_used: company?.ai_tools_used || [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const toggleTool = (tool: string) => {
    const newTools = formData.ai_tools_used.includes(tool)
      ? formData.ai_tools_used.filter(t => t !== tool)
      : [...formData.ai_tools_used, tool]
    handleChange('ai_tools_used', newTools)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const companyData = {
        name: formData.name,
        website: formData.website || undefined,
        logo_url: formData.logo_url || undefined,
        industry: formData.industry || undefined,
        company_size: formData.company_size || undefined,
        headquarters: formData.headquarters || undefined,
        remote_policy: formData.remote_policy || undefined,
        description: formData.description || undefined,
        ai_culture: formData.ai_culture || undefined,
        ai_tools_used: formData.ai_tools_used,
        email_domain: user?.email?.split('@')[1] || '',
      }

      if (company) {
        const result = await updateCompany(companyData)
        if (result.error) throw result.error
      } else {
        const result = await createCompany(companyData)
        if (result.error) throw result.error
      }

      setSuccess(true)
    } catch (err) {
      setError((err as Error).message || 'Failed to save company profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {success && (
        <div className="alert alert-success">Company profile saved successfully!</div>
      )}

      {/* Basic Information */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            COMPANY NAME *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            placeholder="e.g., Acme Inc."
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              WEBSITE
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourcompany.com"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              LOGO URL
            </label>
            <input
              type="url"
              value={formData.logo_url}
              onChange={(e) => handleChange('logo_url', e.target.value)}
              placeholder="https://yourcompany.com/logo.png"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              INDUSTRY
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              placeholder="e.g., Technology, Healthcare, Finance"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              COMPANY SIZE
            </label>
            <select
              value={formData.company_size}
              onChange={(e) => handleChange('company_size', e.target.value)}
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
            >
              <option value="">Select size</option>
              {COMPANY_SIZES.map(size => (
                <option key={size.value} value={size.value}>{size.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location & Work Policy */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Location & Work Policy</h2>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            HEADQUARTERS
          </label>
          <input
            type="text"
            value={formData.headquarters}
            onChange={(e) => handleChange('headquarters', e.target.value)}
            placeholder="e.g., San Francisco, CA"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            REMOTE POLICY
          </label>
          <div className="space-y-2">
            {REMOTE_POLICIES.map(option => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.remote_policy === option.value
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                    : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                <input
                  type="radio"
                  name="remote_policy"
                  value={option.value}
                  checked={formData.remote_policy === option.value}
                  onChange={(e) => handleChange('remote_policy', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  formData.remote_policy === option.value
                    ? 'border-[var(--color-accent)]'
                    : 'border-[var(--color-text-muted)]'
                }`}>
                  {formData.remote_policy === option.value && (
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">About Your Company</h2>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            COMPANY DESCRIPTION
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Tell candidates about your company, culture, mission, and what makes it a great place to work..."
            rows={5}
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>
      </div>

      {/* AI Culture */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">AI Culture</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Help AI-native candidates understand how your company uses AI
        </p>

        <div className="mb-6">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            HOW DOES YOUR COMPANY USE AI?
          </label>
          <textarea
            value={formData.ai_culture}
            onChange={(e) => handleChange('ai_culture', e.target.value)}
            placeholder="Describe how AI is integrated into your workflows, what tools teams use, and your philosophy on AI adoption..."
            rows={4}
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
          />
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            AI TOOLS USED
          </label>
          <p className="text-sm text-[var(--color-text-muted)] mb-3">
            Select the AI tools your company uses
          </p>

          <div className="flex flex-wrap gap-2">
            {POPULAR_AI_TOOLS.map(tool => (
              <button
                key={tool}
                type="button"
                onClick={() => toggleTool(tool)}
                className={`badge cursor-pointer transition-colors ${
                  formData.ai_tools_used.includes(tool)
                    ? 'badge-accent'
                    : 'hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {tool}
                {formData.ai_tools_used.includes(tool) && (
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          {formData.ai_tools_used.length > 0 && (
            <p className="text-sm text-[var(--color-text-muted)] mt-4">
              {formData.ai_tools_used.length} tool{formData.ai_tools_used.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? (
            <>
              <div className="spinner w-4 h-4" />
              Saving...
            </>
          ) : (
            'Save Company Profile'
          )}
        </button>
      </div>
    </form>
  )
}
