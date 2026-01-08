/**
 * Vibe Jobs Utility Functions
 */

/**
 * Format salary for display
 * @param {number} min - Minimum salary (or single amount)
 * @param {number} max - Maximum salary (optional)
 * @returns {string} Formatted salary string
 */
export function formatSalary(min, max) {
  if (!min && !max) return ''

  const formatK = (n) => `$${Math.round(n / 1000)}k`

  if (!max || min === max) {
    return formatK(min)
  }

  return `${formatK(min)} - ${formatK(max)}`
}

/**
 * Format a single salary amount
 * @param {number} amount - Salary amount
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted salary string
 */
export function formatSalaryAmount(amount, currency = 'USD') {
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
 * @param {number} min - Minimum salary
 * @param {number} max - Maximum salary
 * @returns {string} Formatted range string
 */
export function formatSalaryRange(min, max) {
  if (!min && !max) return ''
  if (!max || min === max) return formatSalary(min)
  return `${formatSalary(min)} - ${formatSalary(max)}`
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  if (!date) return ''

  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  }

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date))
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} Relative time string
 */
export function getRelativeTime(date) {
  if (!date) return ''

  const now = new Date()
  const then = new Date(date)
  const diffMs = now - then
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
 * @param {string[]} userTools - User's AI tools
 * @param {string[]} requiredTools - Job's required tools
 * @returns {number} Match percentage (0-100)
 */
export function calculateToolMatch(userTools = [], requiredTools = []) {
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
 * @param {number} percent - Match percentage
 * @returns {object} Match level with label and color
 */
export function getMatchLevel(percent) {
  if (percent >= 100) return { label: 'Perfect match!', color: 'success' }
  if (percent >= 75) return { label: 'Great match', color: 'accent' }
  if (percent >= 50) return { label: 'Good match', color: 'secondary' }
  if (percent >= 25) return { label: 'Partial match', color: 'secondary' }
  return { label: 'Low match', color: 'error' }
}

/**
 * Validate JSON string
 * @param {string} jsonString - JSON string to validate
 * @returns {object} Result with valid boolean and parsed data or error
 */
export function validateJSON(jsonString) {
  try {
    const parsed = JSON.parse(jsonString)
    return { valid: true, data: parsed, error: null }
  } catch (e) {
    return { valid: false, data: null, error: e.message }
  }
}

/**
 * Validate employee profile JSON against schema
 * @param {object} data - Parsed profile data
 * @returns {object} Validation result with errors array
 */
export function validateProfileData(data) {
  const errors = []

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

/**
 * Validate job posting JSON against schema
 * @param {object} data - Parsed job data
 * @returns {object} Validation result with errors array
 */
export function validateJobData(data) {
  const errors = []

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
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Initials (e.g., "JD")
 */
export function getInitials(firstName, lastName) {
  const first = firstName?.charAt(0)?.toUpperCase() || ''
  const last = lastName?.charAt(0)?.toUpperCase() || ''
  return `${first}${last}`
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Pluralize a word based on count
 * @param {number} count - Number to check
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional, defaults to singular + 's')
 * @returns {string} Pluralized string
 */
export function pluralize(count, singular, plural) {
  if (count === 1) return `${count} ${singular}`
  return `${count} ${plural || singular + 's'}`
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout
  return function executedFunction(...args) {
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
 * @param {...(string|object|array)} args - Class names or objects
 * @returns {string} Combined class string
 */
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .map(arg => {
      if (typeof arg === 'string') return arg
      if (typeof arg === 'object') {
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
