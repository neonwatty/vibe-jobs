/**
 * Vibe Jobs Utility Functions
 */

/**
 * Format salary for display
 */
export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return ''

  const formatK = (n: number) => `$${Math.round(n / 1000)}k`

  if (!max || min === max) {
    return formatK(min!)
  }

  return `${formatK(min!)} - ${formatK(max)}`
}

/**
 * Format a single salary amount
 */
export function formatSalaryAmount(amount?: number | null, currency: string = 'USD'): string {
  if (!amount) return ''

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  })

  // For large numbers, use K notation
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}k`
  }

  return formatter.format(amount)
}

/**
 * Format salary range for display
 */
export function formatSalaryRange(min?: number | null, max?: number | null): string {
  if (!min && !max) return ''
  if (!max || min === max) return formatSalary(min)
  return `${formatSalary(min)} - ${formatSalary(max)}`
}

/**
 * Format date for display
 */
export function formatDate(date?: string | Date | null, options: Intl.DateTimeFormatOptions = {}): string {
  if (!date) return ''

  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date))
}

/**
 * Get relative time string (e.g., "2 days ago")
 */
export function getRelativeTime(date?: string | Date | null): string {
  if (!date) return ''

  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Alias for getRelativeTime
export const formatRelativeDate = getRelativeTime

/**
 * Calculate match percentage between user tools and job requirements
 */
export function calculateToolMatch(userTools: string[] = [], requiredTools: string[] = []): number {
  if (!requiredTools.length) return 100
  if (!userTools.length) return 0

  const userToolsLower = userTools.map(t => t.toLowerCase())
  const matchCount = requiredTools.filter(tool =>
    userToolsLower.includes(tool.toLowerCase())
  ).length

  return Math.round((matchCount / requiredTools.length) * 100)
}

/**
 * Get match level label based on percentage
 */
export function getMatchLevel(percent: number): { label: string; color: string } {
  if (percent >= 100) return { label: 'Perfect match!', color: 'success' }
  if (percent >= 75) return { label: 'Great match', color: 'accent' }
  if (percent >= 50) return { label: 'Good match', color: 'secondary' }
  if (percent >= 25) return { label: 'Partial match', color: 'secondary' }
  return { label: 'Low match', color: 'error' }
}

/**
 * Validate JSON string
 */
export function validateJSON(jsonString: string): { valid: boolean; data: unknown; error: string | null } {
  try {
    const parsed = JSON.parse(jsonString)
    return { valid: true, data: parsed, error: null }
  } catch (e) {
    return { valid: false, data: null, error: (e as Error).message }
  }
}

interface ProfileData {
  first_name?: string
  last_name?: string
  email?: string
  role_type?: string
}

/**
 * Validate employee profile JSON against schema
 */
export function validateProfileData(data: ProfileData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.first_name?.trim()) {
    errors.push('First name is required')
  }
  if (!data.last_name?.trim()) {
    errors.push('Last name is required')
  }
  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }
  if (!data.role_type) {
    errors.push('Role type is required')
  }

  return { valid: errors.length === 0, errors }
}

interface JobData {
  company_name?: string
  job_title?: string
  role_category?: string
  employment_type?: string
  description?: string
}

/**
 * Validate job posting JSON against schema
 */
export function validateJobData(data: JobData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.company_name?.trim()) {
    errors.push('Company name is required')
  }
  if (!data.job_title?.trim()) {
    errors.push('Job title is required')
  }
  if (!data.role_category) {
    errors.push('Role category is required')
  }
  if (!data.employment_type) {
    errors.push('Employment type is required')
  }
  if (!data.description?.trim()) {
    errors.push('Job description is required')
  }

  return { valid: errors.length === 0, errors }
}

/**
 * Generate initials from name
 */
export function getInitials(firstName?: string | null, lastName?: string | null): string {
  const first = firstName?.charAt(0)?.toUpperCase() || ''
  const last = lastName?.charAt(0)?.toUpperCase() || ''
  return `${first}${last}`
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text?: string | null, maxLength: number = 100): string {
  if (!text || text.length <= maxLength) return text || ''
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Pluralize a word based on count
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || singular + 's'}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number = 300): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Class names utility (simple version of clsx)
 */
export function cn(...args: (string | Record<string, boolean> | undefined | null | false)[]): string {
  return args
    .flat()
    .filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') return arg
      if (typeof arg === 'object' && arg !== null) {
        return Object.entries(arg)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
}
