'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

const ROLE_TYPES = [
  { value: 'engineer', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketer', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'ops', label: 'Operations' },
  { value: 'other', label: 'Other' },
]

const AVAILABILITY_OPTIONS = [
  { value: 'actively_looking', label: 'Actively Looking', description: 'Ready for new opportunities now' },
  { value: 'open', label: 'Open to Opportunities', description: 'Not actively searching but open to the right role' },
  { value: 'not_looking', label: 'Not Looking', description: 'Not interested in new opportunities' },
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
  'Tabnine',
  'Amazon Q',
]

export default function ProfileEditor() {
  const { profile, updateProfile, createProfile } = useAuth()

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
    headline: profile?.headline || '',
    location: profile?.location || '',
    linkedin_url: profile?.linkedin_url || '',
    role_type: profile?.role_type || 'engineer',
    availability: profile?.availability || 'open',
    ai_tools: profile?.ai_tools || [],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSuccess(false)
  }

  const toggleTool = (tool: string) => {
    const newTools = formData.ai_tools.includes(tool)
      ? formData.ai_tools.filter(t => t !== tool)
      : [...formData.ai_tools, tool]
    handleChange('ai_tools', newTools)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      const profileData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        headline: formData.headline || undefined,
        location: formData.location || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        role_type: formData.role_type,
        availability: formData.availability,
        ai_tools: formData.ai_tools,
        profile_complete: true,
      }

      if (profile) {
        const result = await updateProfile(profileData)
        if (result.error) throw result.error
      } else {
        const result = await createProfile(profileData)
        if (result.error) throw result.error
      }

      setSuccess(true)
    } catch (err) {
      setError((err as Error).message || 'Failed to save profile')
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
        <div className="alert alert-success">Profile saved successfully!</div>
      )}

      {/* Basic Info */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              FIRST NAME *
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              required
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              LAST NAME *
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              required
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            EMAIL *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            HEADLINE
          </label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => handleChange('headline', e.target.value)}
            placeholder="e.g., Senior Engineer who ships 3x with AI tools"
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              LOCATION
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
              LINKEDIN URL
            </label>
            <input
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => handleChange('linkedin_url', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>
      </div>

      {/* Role & Availability */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Role & Availability</h2>

        <div className="mb-4">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            ROLE TYPE
          </label>
          <select
            value={formData.role_type}
            onChange={(e) => handleChange('role_type', e.target.value)}
            className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
          >
            {ROLE_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            JOB SEARCH STATUS
          </label>
          <div className="space-y-2">
            {AVAILABILITY_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  formData.availability === option.value
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                    : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                }`}
              >
                <input
                  type="radio"
                  name="availability"
                  value={option.value}
                  checked={formData.availability === option.value}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  formData.availability === option.value
                    ? 'border-[var(--color-accent)]'
                    : 'border-[var(--color-text-muted)]'
                }`}>
                  {formData.availability === option.value && (
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

      {/* AI Tools */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">AI Tools</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Select the AI tools you use regularly. This helps employers find you.
        </p>

        <div className="flex flex-wrap gap-2">
          {POPULAR_TOOLS.map(tool => (
            <button
              key={tool}
              type="button"
              onClick={() => toggleTool(tool)}
              className={`badge cursor-pointer transition-colors ${
                formData.ai_tools.includes(tool)
                  ? 'badge-accent'
                  : 'hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              {tool}
              {formData.ai_tools.includes(tool) && (
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {formData.ai_tools.length > 0 && (
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            {formData.ai_tools.length} tool{formData.ai_tools.length > 1 ? 's' : ''} selected
          </p>
        )}
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
            'Save Profile'
          )}
        </button>
      </div>
    </form>
  )
}
