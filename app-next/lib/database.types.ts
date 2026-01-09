/**
 * Database Types for Vibe Jobs
 * Based on Supabase schema (supabase/migrations/001_initial_schema.sql)
 */

export type UserType = 'employee' | 'employer'
export type RoleType = 'engineer' | 'product' | 'marketer' | 'sales' | 'ops' | 'other'
export type AvailabilityStatus = 'actively_looking' | 'open' | 'not_looking'
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead'
export type EmploymentType = 'full_time' | 'part_time' | 'contract'
export type LocationType = 'remote' | 'hybrid' | 'onsite'
export type AIProficiency = 'familiar' | 'proficient' | 'expert'
export type ApplicationStatus = 'pending' | 'reviewed' | 'interviewing' | 'rejected' | 'offer' | 'withdrawn'
export type JobStatus = 'draft' | 'active' | 'closed' | 'paused'

export interface Experience {
  company: string
  title: string
  start_date: string // YYYY-MM
  end_date: string // YYYY-MM or "present"
  description: string
}

export interface Education {
  school: string
  degree: string
  field: string
  year: number
}

export interface Profile {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  location: string | null
  linkedin_url: string | null
  experience: Experience[]
  education: Education[]
  ai_tools: string[]
  portfolio_urls: string[]
  availability: AvailabilityStatus
  role_type: RoleType
  resume_url: string | null
  original_json: Record<string, unknown> | null
  api_token: string | null
  api_token_created_at: string | null
  created_at: string
  updated_at: string
}

export interface Company {
  id: string
  user_id: string
  name: string
  description: string | null
  logo_url: string | null
  website: string | null
  email_domain: string
  domain_verified: boolean
  verified_at: string | null
  size: string | null
  industry: string | null
  headquarters: string | null
  remote_policy: string | null
  ai_culture: string | null
  ai_tools_used: string[]
  api_token: string | null
  api_token_created_at: string | null
  created_at: string
  updated_at: string
}

export interface Job {
  id: string
  company_id: string
  title: string
  description: string
  location_type: LocationType
  location_details: string | null
  role_category: RoleType
  experience_level: ExperienceLevel
  employment_type: EmploymentType
  ai_tools_required: string[]
  ai_proficiency: AIProficiency
  salary_min: number
  salary_max: number
  salary_currency: string
  how_youll_be_tested: string
  requirements: string[]
  nice_to_have: string[]
  benefits: string[]
  original_description_url: string | null
  original_json: Record<string, unknown> | null
  status: JobStatus
  created_at: string
  updated_at: string
  // Joined fields
  company?: Company
}

export interface Application {
  id: string
  job_id: string
  profile_id: string
  status: ApplicationStatus
  cover_message: string | null
  employer_notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  job?: Job
  profile?: Profile
}

export interface SavedJob {
  id: string
  profile_id: string
  job_id: string
  created_at: string
  // Joined fields
  job?: Job
}

// JSON schema for profile upload (employee)
export interface ProfileUploadSchema {
  first_name: string
  last_name: string
  email: string
  location?: string
  linkedin_url?: string
  experience: Experience[]
  education: Education[]
  ai_tools: string[]
  portfolio_urls: string[]
  availability: AvailabilityStatus
  role_type: RoleType
}

// JSON schema for job upload (employer)
export interface JobUploadSchema {
  company_name: string
  job_title: string
  location_type: LocationType
  location_details?: string
  role_category: RoleType
  experience_level: ExperienceLevel
  employment_type: EmploymentType
  description: string
  ai_tools_required: string[]
  ai_proficiency: AIProficiency
  salary_min: number
  salary_max: number
  how_youll_be_tested: string
}

// Database schema for Supabase client
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Company, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
      }
      jobs: {
        Row: Job
        Insert: Omit<Job, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Job, 'id' | 'company_id' | 'created_at' | 'updated_at'>>
      }
      applications: {
        Row: Application
        Insert: Omit<Application, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Application, 'id' | 'job_id' | 'profile_id' | 'created_at' | 'updated_at'>>
      }
      saved_jobs: {
        Row: SavedJob
        Insert: Omit<SavedJob, 'id' | 'created_at'>
        Update: never
      }
    }
    Enums: {
      user_type: UserType
      role_type: RoleType
      availability_status: AvailabilityStatus
      experience_level: ExperienceLevel
      employment_type: EmploymentType
      location_type: LocationType
      ai_proficiency: AIProficiency
      application_status: ApplicationStatus
      job_status: JobStatus
    }
  }
}
