'use client'

import { useState, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import type { Json } from '@/lib/database.types'
import { UNIQUE_AI_TOOLS } from '@/lib/constants'

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

interface Project {
  id: string
  name: string
  description: string
  repo_url: string
  demo_url: string
  tech_stack: string[]
}

export default function ProfileEditor() {
  const { profile, updateProfile, createProfile } = useAuth()

  // Extract github_url from portfolio_urls (first URL if it's a GitHub URL)
  const existingGithubUrl = profile?.portfolio_urls?.find((url: string) => url.includes('github.com')) || ''
  // Extract projects from raw_json
  const existingProjects = (profile?.raw_json as { projects?: Project[] })?.projects || []

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: profile?.email || '',
    headline: profile?.headline || '',
    location: profile?.location || '',
    linkedin_url: profile?.linkedin_url || '',
    github_url: existingGithubUrl,
    role_type: profile?.role_type || 'engineer',
    availability: profile?.availability || 'open',
    ai_tools: profile?.ai_tools || [],
    resume_file_url: profile?.resume_file_url || '',
    projects: existingProjects as Project[],
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [showAllTools, setShowAllTools] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get tools to display based on expanded state
  const displayedTools = showAllTools ? UNIQUE_AI_TOOLS : POPULAR_TOOLS

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

  // Project management functions
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      repo_url: '',
      demo_url: '',
      tech_stack: [],
    }
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }))
    setSuccess(false)
  }

  const removeProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    try {
      // Build portfolio_urls array with GitHub URL
      const portfolioUrls: string[] = []
      if (formData.github_url) {
        portfolioUrls.push(formData.github_url)
      }
      // Add any demo URLs from projects
      formData.projects.forEach(p => {
        if (p.demo_url && !portfolioUrls.includes(p.demo_url)) {
          portfolioUrls.push(p.demo_url)
        }
      })

      // Build raw_json with projects (cast to Json-compatible format)
      const rawJson: Json = {
        projects: formData.projects
          .filter(p => p.name)
          .map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            repo_url: p.repo_url,
            demo_url: p.demo_url,
            tech_stack: p.tech_stack,
          })),
      }

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
        portfolio_urls: portfolioUrls,
        raw_json: rawJson,
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
          {displayedTools.map(tool => (
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

        {formData.ai_tools.length > 0 && (
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            {formData.ai_tools.length} tool{formData.ai_tools.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      {/* Portfolio & Projects */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-2">Portfolio & Projects</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          Showcase your work with links to GitHub and your best projects.
        </p>

        {/* GitHub Profile */}
        <div className="mb-6">
          <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
            GITHUB PROFILE
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="url"
              value={formData.github_url}
              onChange={(e) => handleChange('github_url', e.target.value)}
              placeholder="https://github.com/yourusername"
              className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg pl-12 pr-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        {/* Projects List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-mono text-xs text-[var(--color-text-muted)]">
              PROJECTS
            </label>
            <button
              type="button"
              onClick={addProject}
              className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </button>
          </div>

          {formData.projects.length === 0 ? (
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6 text-center">
              <svg className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-[var(--color-text-muted)] mb-2">No projects yet</p>
              <button
                type="button"
                onClick={addProject}
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Add your first project
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">
                      Project {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="text-red-500 hover:text-red-400 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[var(--color-text-muted)] block mb-1">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                        placeholder="e.g., AI Code Assistant"
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-text-muted)] block mb-1">
                        Description
                      </label>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        placeholder="Brief description of what you built and how AI tools helped"
                        rows={2}
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-[var(--color-text-muted)] block mb-1">
                          Repository URL
                        </label>
                        <input
                          type="url"
                          value={project.repo_url}
                          onChange={(e) => updateProject(project.id, 'repo_url', e.target.value)}
                          placeholder="https://github.com/you/project"
                          className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-[var(--color-text-muted)] block mb-1">
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={project.demo_url}
                          onChange={(e) => updateProject(project.id, 'demo_url', e.target.value)}
                          placeholder="https://myproject.vercel.app"
                          className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-[var(--color-text-muted)] block mb-1">
                        Tech Stack (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={project.tech_stack.join(', ')}
                        onChange={(e) => updateProject(project.id, 'tech_stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="React, TypeScript, Claude Code, Vercel"
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
