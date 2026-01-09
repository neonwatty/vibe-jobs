/**
 * Zod Validation Schemas for Vibe Jobs
 * Used to validate JSON uploads from users
 */

import { z } from 'zod'

// =============================================================================
// SHARED SCHEMAS
// =============================================================================

export const roleCategory = z.enum(['engineer', 'product', 'marketer', 'sales', 'ops', 'other'])
export const availabilityStatus = z.enum(['actively_looking', 'open', 'not_looking'])
export const experienceLevel = z.enum(['entry', 'mid', 'senior', 'lead'])
export const employmentType = z.enum(['full_time', 'part_time', 'contract'])
export const locationType = z.enum(['remote', 'hybrid', 'onsite'])
export const aiProficiency = z.enum(['familiar', 'proficient', 'expert'])

// =============================================================================
// PROFILE SCHEMAS (for JSON upload)
// =============================================================================

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  title: z.string().min(1, 'Job title is required'),
  start_date: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
  end_date: z.string().regex(/^(\d{4}-\d{2}|present)$/, 'End date must be in YYYY-MM format or "present"'),
  description: z.string().optional().default('')
})

export const educationSchema = z.object({
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().optional().default(''),
  year: z.number().int().min(1900).max(2100).optional()
})

export const profileJsonSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  location: z.string().optional(),
  linkedin_url: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  ai_tools: z.array(z.string()).default([]),
  portfolio_urls: z.array(z.string().url('Invalid URL')).default([]),
  availability: availabilityStatus.optional().default('open'),
  role_type: roleCategory.optional().default('other')
})

export type ProfileJson = z.infer<typeof profileJsonSchema>

// =============================================================================
// JOB SCHEMAS (for JSON upload)
// =============================================================================

export const jobJsonSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  job_title: z.string().min(1, 'Job title is required'),
  location_type: locationType,
  location_details: z.string().optional(),
  role_category: roleCategory,
  experience_level: experienceLevel,
  employment_type: employmentType.optional().default('full_time'),
  description: z.string().min(10, 'Job description must be at least 10 characters'),
  ai_tools_required: z.array(z.string()).default([]),
  ai_proficiency: aiProficiency.optional().default('proficient'),
  salary_min: z.number().int().positive('Salary must be a positive number'),
  salary_max: z.number().int().positive('Salary must be a positive number'),
  how_youll_be_tested: z.string().min(20, 'Test description must be at least 20 characters')
}).refine(data => data.salary_max >= data.salary_min, {
  message: 'Maximum salary must be greater than or equal to minimum salary',
  path: ['salary_max']
})

export type JobJson = z.infer<typeof jobJsonSchema>

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

export function validateProfileJson(json: unknown): {
  success: true
  data: ProfileJson
} | {
  success: false
  errors: z.ZodIssue[]
} {
  const result = profileJsonSchema.safeParse(json)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error.issues }
}

export function validateJobJson(json: unknown): {
  success: true
  data: JobJson
} | {
  success: false
  errors: z.ZodIssue[]
} {
  const result = jobJsonSchema.safeParse(json)
  if (result.success) {
    return { success: true, data: result.data }
  }
  return { success: false, errors: result.error.issues }
}

/**
 * Format Zod errors into user-friendly messages
 */
export function formatZodErrors(errors: z.ZodIssue[]): string[] {
  return errors.map((err: z.ZodIssue) => {
    const path = err.path.join('.')
    return path ? `${path}: ${err.message}` : err.message
  })
}

/**
 * Parse JSON string safely
 */
export function parseJsonSafely(jsonString: string): {
  success: true
  data: unknown
} | {
  success: false
  error: string
} {
  try {
    const data = JSON.parse(jsonString)
    return { success: true, data }
  } catch (e) {
    return { success: false, error: (e as Error).message }
  }
}

// =============================================================================
// EXAMPLE JSON TEMPLATES
// =============================================================================

export const PROFILE_JSON_EXAMPLE: ProfileJson = {
  first_name: "Alex",
  last_name: "Chen",
  email: "alex@example.com",
  location: "San Francisco, CA",
  linkedin_url: "https://linkedin.com/in/alexchen",
  experience: [
    {
      company: "TechCorp",
      title: "Senior Software Engineer",
      start_date: "2021-03",
      end_date: "present",
      description: "Building AI-powered developer tools. Ship features 3x faster using Claude Code and Cursor."
    },
    {
      company: "StartupXYZ",
      title: "Software Engineer",
      start_date: "2018-06",
      end_date: "2021-02",
      description: "Full-stack development with React and Node.js."
    }
  ],
  education: [
    {
      school: "UC Berkeley",
      degree: "B.S.",
      field: "Computer Science",
      year: 2018
    }
  ],
  ai_tools: ["Claude Code", "Cursor", "ChatGPT", "GitHub Copilot"],
  portfolio_urls: ["https://github.com/alexchen", "https://alexchen.dev"],
  availability: "open",
  role_type: "engineer"
}

export const JOB_JSON_EXAMPLE: JobJson = {
  company_name: "AI Startup Inc",
  job_title: "Senior Full-Stack Engineer",
  location_type: "remote",
  location_details: "US timezones preferred",
  role_category: "engineer",
  experience_level: "senior",
  employment_type: "full_time",
  description: "We're looking for an engineer who ships fast with AI tools. You'll work on our core product, building features end-to-end. We use Claude Code and Cursor daily - if you're not already using AI coding tools, this isn't the right fit.",
  ai_tools_required: ["Claude Code", "Cursor", "GitHub Copilot"],
  ai_proficiency: "proficient",
  salary_min: 180000,
  salary_max: 250000,
  how_youll_be_tested: "1-hour live build: We'll give you a design and watch you build it with your AI tools. No whiteboard puzzles - just real coding with the tools you actually use."
}
