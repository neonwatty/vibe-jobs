'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'

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
    resume_file_url: profile?.resume_file_url || '',
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

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

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setResumeError(null)

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setResumeError('Please upload a PDF or Word document (.pdf, .doc, .docx)')
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setResumeError('File size must be less than 5MB')
      return
    }

    setUploadingResume(true)

    try {
      const supabase = createClient()

      // Get the current user ID
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Create a unique file name
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/resume-${Date.now()}.${fileExt}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (uploadError) {
        // If bucket doesn't exist, show a helpful error
        if (uploadError.message.includes('Bucket not found')) {
          throw new Error('Resume storage not configured. Please contact support.')
        }
        throw uploadError
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName)

      // Update form data
      handleChange('resume_file_url', publicUrl)
    } catch (err) {
      setResumeError((err as Error).message || 'Failed to upload resume')
    } finally {
      setUploadingResume(false)
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleResumeDelete = async () => {
    if (!formData.resume_file_url) return

    try {
      const supabase = createClient()

      // Extract the file path from the URL
      const url = new URL(formData.resume_file_url)
      const pathParts = url.pathname.split('/storage/v1/object/public/resumes/')
      if (pathParts.length > 1) {
        const filePath = pathParts[1]
        await supabase.storage.from('resumes').remove([filePath])
      }

      // Clear the URL from form data
      handleChange('resume_file_url', '')
    } catch (err) {
      console.error('Error deleting resume:', err)
      // Still clear the URL even if delete fails
      handleChange('resume_file_url', '')
    }
  }

  const getResumeFileName = (url: string): string => {
    try {
      const urlObj = new URL(url)
      const path = urlObj.pathname
      const fileName = path.split('/').pop() || 'resume'
      // Remove the timestamp prefix if present
      return fileName.replace(/^resume-\d+-/, 'resume.')
    } catch {
      return 'resume'
    }
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
        resume_file_url: formData.resume_file_url || undefined,
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

      {/* Resume Upload */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Resume</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Upload your resume to share with employers. Accepted formats: PDF, DOC, DOCX (max 5MB).
        </p>

        {resumeError && (
          <div className="alert alert-error mb-4">{resumeError}</div>
        )}

        {formData.resume_file_url ? (
          <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]">
            <div className="w-10 h-10 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[var(--color-text-primary)] truncate">
                {getResumeFileName(formData.resume_file_url)}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Resume uploaded</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={formData.resume_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </a>
              <button
                type="button"
                onClick={handleResumeDelete}
                className="btn btn-ghost btn-sm text-red-500 hover:text-red-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleResumeUpload}
              disabled={uploadingResume}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              uploadingResume
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
            }`}>
              {uploadingResume ? (
                <>
                  <div className="spinner w-8 h-8 mx-auto mb-3" />
                  <p className="text-[var(--color-text-primary)]">Uploading...</p>
                </>
              ) : (
                <>
                  <svg className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-[var(--color-text-primary)] mb-1">
                    <span className="text-[var(--color-accent)] font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">PDF, DOC, or DOCX up to 5MB</p>
                </>
              )}
            </div>
          </div>
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
