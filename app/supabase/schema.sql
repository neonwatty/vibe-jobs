-- ===========================================
-- VIBE JOBS DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ===========================================

-- ===========================================
-- EXTENSIONS
-- ===========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- ENUM TYPES
-- ===========================================
CREATE TYPE user_role AS ENUM ('employee', 'employer');
CREATE TYPE availability_status AS ENUM ('actively_looking', 'open', 'not_looking');
CREATE TYPE role_category AS ENUM ('engineer', 'designer', 'product', 'marketer', 'sales', 'ops', 'writer', 'other');
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'lead');
CREATE TYPE employment_type AS ENUM ('full_time', 'part_time', 'contract', 'freelance');
CREATE TYPE location_type AS ENUM ('remote', 'hybrid', 'onsite');
CREATE TYPE ai_proficiency_level AS ENUM ('familiar', 'proficient', 'expert');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'interviewing', 'rejected', 'offer', 'withdrawn');
CREATE TYPE job_status AS ENUM ('draft', 'active', 'paused', 'closed');
CREATE TYPE ai_culture AS ENUM ('encouraged', 'expected', 'required');

-- ===========================================
-- USERS TABLE (extends auth.users)
-- ===========================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- PROFILES TABLE (for employees/job seekers)
-- ===========================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Basic info from JSON upload
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  location TEXT,
  linkedin_url TEXT,

  -- Role and experience
  role_type role_category NOT NULL,
  years_experience INTEGER,

  -- AI tools (stored as JSONB array)
  ai_tools JSONB DEFAULT '[]'::JSONB,
  skills JSONB DEFAULT '[]'::JSONB,

  -- Portfolio and links
  portfolio_urls JSONB DEFAULT '[]'::JSONB,

  -- Parsed resume data (full JSON from upload)
  experience JSONB DEFAULT '[]'::JSONB,
  education JSONB DEFAULT '[]'::JSONB,

  -- Original resume file (stored in Supabase Storage)
  resume_file_url TEXT,

  -- Status
  availability availability_status DEFAULT 'open',
  profile_complete BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- COMPANIES TABLE (for employers)
-- ===========================================
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Company info
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  logo_url TEXT,

  -- Size and industry
  size TEXT, -- e.g., "1-10", "11-50", "51-200", etc.
  industry TEXT,

  -- Location
  headquarters TEXT,
  remote_policy TEXT, -- e.g., "remote-first", "hybrid", "onsite"

  -- AI culture indicator
  ai_culture ai_culture DEFAULT 'expected',
  ai_tools_used JSONB DEFAULT '[]'::JSONB,

  -- Domain verification
  email_domain TEXT NOT NULL,
  domain_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================
-- JOBS TABLE
-- ===========================================
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,

  -- Basic job info
  title TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Categorization
  role_category role_category NOT NULL,
  experience_level experience_level NOT NULL,
  employment_type employment_type NOT NULL,

  -- Location
  location_type location_type NOT NULL,
  location_details TEXT,

  -- Salary (required - no "competitive salary" allowed)
  salary_min INTEGER NOT NULL,
  salary_max INTEGER NOT NULL,
  salary_currency TEXT DEFAULT 'USD',

  -- AI requirements
  ai_tools_required JSONB DEFAULT '[]'::JSONB,
  ai_proficiency ai_proficiency_level DEFAULT 'proficient',

  -- The differentiator
  how_youll_be_tested TEXT NOT NULL,

  -- Additional details from JSON
  requirements JSONB DEFAULT '[]'::JSONB,
  nice_to_have JSONB DEFAULT '[]'::JSONB,
  benefits JSONB DEFAULT '[]'::JSONB,

  -- Original job description file
  original_jd_url TEXT,

  -- Status and visibility
  status job_status DEFAULT 'draft',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT salary_range_valid CHECK (salary_max >= salary_min),
  CONSTRAINT salary_positive CHECK (salary_min > 0 AND salary_max > 0),
  CONSTRAINT how_youll_be_tested_length CHECK (char_length(how_youll_be_tested) >= 50)
);

-- ===========================================
-- APPLICATIONS TABLE
-- ===========================================
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Application status
  status application_status DEFAULT 'pending',

  -- Optional cover message
  cover_message TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,

  -- Unique constraint: one application per job per profile
  UNIQUE(job_id, profile_id)
);

-- ===========================================
-- API TOKENS TABLE (for MCP access)
-- ===========================================
CREATE TABLE public.api_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Token (hashed - we only store the hash)
  token_hash TEXT NOT NULL,
  token_prefix TEXT NOT NULL, -- First 8 chars for identification

  -- Metadata
  name TEXT DEFAULT 'Default Token',
  last_used_at TIMESTAMPTZ,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

-- ===========================================
-- SAVED JOBS TABLE (employee bookmarks)
-- ===========================================
CREATE TABLE public.saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, job_id)
);

-- ===========================================
-- INDEXES FOR PERFORMANCE
-- ===========================================

-- Users
CREATE INDEX idx_users_role ON public.users(role);

-- Profiles
CREATE INDEX idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX idx_profiles_role_type ON public.profiles(role_type);
CREATE INDEX idx_profiles_availability ON public.profiles(availability);
CREATE INDEX idx_profiles_ai_tools ON public.profiles USING GIN(ai_tools);

-- Companies
CREATE INDEX idx_companies_user_id ON public.companies(user_id);
CREATE INDEX idx_companies_email_domain ON public.companies(email_domain);

-- Jobs
CREATE INDEX idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX idx_jobs_status ON public.jobs(status);
CREATE INDEX idx_jobs_role_category ON public.jobs(role_category);
CREATE INDEX idx_jobs_location_type ON public.jobs(location_type);
CREATE INDEX idx_jobs_experience_level ON public.jobs(experience_level);
CREATE INDEX idx_jobs_salary_range ON public.jobs(salary_min, salary_max);
CREATE INDEX idx_jobs_ai_tools ON public.jobs USING GIN(ai_tools_required);
CREATE INDEX idx_jobs_created_at ON public.jobs(created_at DESC);

-- Applications
CREATE INDEX idx_applications_job_id ON public.applications(job_id);
CREATE INDEX idx_applications_profile_id ON public.applications(profile_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);

-- API Tokens
CREATE INDEX idx_api_tokens_user_id ON public.api_tokens(user_id);
CREATE INDEX idx_api_tokens_token_hash ON public.api_tokens(token_hash);
CREATE INDEX idx_api_tokens_is_active ON public.api_tokens(is_active);

-- ===========================================
-- UPDATED_AT TRIGGER FUNCTION
-- ===========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_jobs ENABLE ROW LEVEL SECURITY;

-- USERS TABLE POLICIES
CREATE POLICY "Users can view own record"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own record"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- PROFILES TABLE POLICIES
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can create own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);

-- COMPANIES TABLE POLICIES
CREATE POLICY "Companies are viewable by everyone"
  ON public.companies FOR SELECT
  USING (true);

CREATE POLICY "Users can create own company"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own company"
  ON public.companies FOR UPDATE
  USING (auth.uid() = user_id);

-- JOBS TABLE POLICIES
CREATE POLICY "Active jobs are viewable by everyone"
  ON public.jobs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Company owners can view all their jobs"
  ON public.jobs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owners can create jobs"
  ON public.jobs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owners can update their jobs"
  ON public.jobs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Company owners can delete their jobs"
  ON public.jobs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.user_id = auth.uid()
    )
  );

-- APPLICATIONS TABLE POLICIES
CREATE POLICY "Applicants can view own applications"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = applications.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Employers can view applications to their jobs"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      JOIN public.companies ON companies.id = jobs.company_id
      WHERE jobs.id = applications.job_id
      AND companies.user_id = auth.uid()
    )
  );

CREATE POLICY "Applicants can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Applicants can update own applications"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = applications.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Employers can update application status"
  ON public.applications FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.jobs
      JOIN public.companies ON companies.id = jobs.company_id
      WHERE jobs.id = applications.job_id
      AND companies.user_id = auth.uid()
    )
  );

-- API TOKENS TABLE POLICIES
CREATE POLICY "Users can view own tokens"
  ON public.api_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tokens"
  ON public.api_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON public.api_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens"
  ON public.api_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- SAVED JOBS TABLE POLICIES
CREATE POLICY "Users can view own saved jobs"
  ON public.saved_jobs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = saved_jobs.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can save jobs"
  ON public.saved_jobs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = profile_id
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can unsave jobs"
  ON public.saved_jobs FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = saved_jobs.profile_id
      AND profiles.user_id = auth.uid()
    )
  );
