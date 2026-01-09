-- Vibe Jobs Database Schema
-- Based on plans/implementation-plan.md and plans/auth-verification.md
-- Updated to match existing UI code expectations

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

create type user_type as enum ('employee', 'employer');
create type role_type as enum ('engineer', 'product', 'marketer', 'sales', 'ops', 'other');
create type availability_status as enum ('actively_looking', 'open', 'not_looking');
create type experience_level as enum ('entry', 'mid', 'senior', 'lead');
create type employment_type as enum ('full_time', 'part_time', 'contract');
create type location_type as enum ('remote', 'hybrid', 'onsite');
create type ai_proficiency as enum ('familiar', 'proficient', 'expert');
create type application_status as enum ('pending', 'reviewed', 'interviewing', 'rejected', 'offer', 'withdrawn');
create type job_status as enum ('draft', 'active', 'closed', 'paused');

-- ============================================
-- PROFILES TABLE (Employees/Job Seekers)
-- ============================================

create table profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Basic info (from JSON upload)
  first_name text not null,
  last_name text not null,
  email text not null,
  location text,
  linkedin_url text,

  -- Experience (JSONB array)
  experience jsonb default '[]'::jsonb,
  -- Structure: [{ company, title, start_date, end_date, description }]

  -- Education (JSONB array)
  education jsonb default '[]'::jsonb,
  -- Structure: [{ school, degree, field, year }]

  -- AI tools & role
  ai_tools text[] default '{}',
  portfolio_urls text[] default '{}',
  availability availability_status default 'actively_looking',
  role_type role_type not null,

  -- Original resume storage
  resume_url text,
  original_json jsonb,

  -- MCP API access
  api_token text unique,
  api_token_created_at timestamptz,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- COMPANIES TABLE (Employers)
-- ============================================

create table companies (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Company info
  name text not null,
  description text,
  logo_url text,
  website text,

  -- Domain verification (from auth-verification.md)
  email_domain text not null,
  domain_verified boolean default false,
  verified_at timestamptz,

  -- Company details
  size text, -- e.g., '1-10', '11-50', '51-200', '201-500', '500+'
  industry text,
  headquarters text,
  remote_policy text, -- e.g., 'remote-first', 'hybrid', 'office-first'

  -- AI culture
  ai_culture text, -- 'encouraged', 'expected', 'required'
  ai_tools_used text[] default '{}',

  -- MCP API access
  api_token text unique,
  api_token_created_at timestamptz,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- JOBS TABLE
-- ============================================

create table jobs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade not null,

  -- Basic info (from JSON upload)
  title text not null,
  description text not null,

  -- Location
  location_type location_type not null,
  location_details text,

  -- Role details
  role_category role_type not null,
  experience_level experience_level not null,
  employment_type employment_type not null,

  -- AI requirements
  ai_tools_required text[] default '{}',
  ai_proficiency ai_proficiency default 'familiar',

  -- Compensation (required - no "competitive salary" allowed)
  salary_min integer not null,
  salary_max integer not null,
  salary_currency text default 'USD',

  -- The differentiator
  how_youll_be_tested text not null,

  -- Additional job details
  requirements text[] default '{}',
  nice_to_have text[] default '{}',
  benefits text[] default '{}',

  -- Original job description storage
  original_description_url text,
  original_json jsonb,

  -- Status
  status job_status default 'active',

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Constraints
  constraint salary_range_valid check (salary_max >= salary_min)
);

-- ============================================
-- APPLICATIONS TABLE
-- ============================================

create table applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references jobs(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,

  -- Status
  status application_status default 'pending',

  -- Messages
  cover_message text,
  employer_notes text,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Prevent duplicate applications
  unique(job_id, profile_id)
);

-- ============================================
-- SAVED JOBS TABLE (for job seekers to bookmark jobs)
-- ============================================

create table saved_jobs (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  job_id uuid references jobs(id) on delete cascade not null,
  created_at timestamptz default now(),

  unique(profile_id, job_id)
);

-- ============================================
-- INDEXES
-- ============================================

-- Profiles
create index idx_profiles_user_id on profiles(user_id);
create index idx_profiles_role_type on profiles(role_type);
create index idx_profiles_availability on profiles(availability);
create index idx_profiles_ai_tools on profiles using gin(ai_tools);

-- Companies
create index idx_companies_user_id on companies(user_id);
create index idx_companies_email_domain on companies(email_domain);

-- Jobs
create index idx_jobs_company_id on jobs(company_id);
create index idx_jobs_role_category on jobs(role_category);
create index idx_jobs_experience_level on jobs(experience_level);
create index idx_jobs_location_type on jobs(location_type);
create index idx_jobs_status on jobs(status);
create index idx_jobs_ai_tools on jobs using gin(ai_tools_required);
create index idx_jobs_salary on jobs(salary_min, salary_max);
create index idx_jobs_created_at on jobs(created_at desc);

-- Applications
create index idx_applications_job_id on applications(job_id);
create index idx_applications_profile_id on applications(profile_id);
create index idx_applications_status on applications(status);

-- Saved Jobs
create index idx_saved_jobs_profile_id on saved_jobs(profile_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table profiles enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table saved_jobs enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = user_id);

-- Companies policies
create policy "Public company info is viewable by everyone"
  on companies for select
  using (true);

create policy "Users can update own company"
  on companies for update
  using (auth.uid() = user_id);

create policy "Users can insert own company"
  on companies for insert
  with check (auth.uid() = user_id);

-- Jobs policies
create policy "Active jobs are viewable by everyone"
  on jobs for select
  using (status = 'active');

create policy "Company owners can view all their jobs"
  on jobs for select
  using (
    exists (
      select 1 from companies
      where companies.id = jobs.company_id
      and companies.user_id = auth.uid()
    )
  );

create policy "Company owners can insert jobs"
  on jobs for insert
  with check (
    exists (
      select 1 from companies
      where companies.id = company_id
      and companies.user_id = auth.uid()
    )
  );

create policy "Company owners can update their jobs"
  on jobs for update
  using (
    exists (
      select 1 from companies
      where companies.id = jobs.company_id
      and companies.user_id = auth.uid()
    )
  );

-- Applications policies
create policy "Applicants can view own applications"
  on applications for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = applications.profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "Employers can view applications for their jobs"
  on applications for select
  using (
    exists (
      select 1 from jobs
      join companies on companies.id = jobs.company_id
      where jobs.id = applications.job_id
      and companies.user_id = auth.uid()
    )
  );

create policy "Applicants can insert applications"
  on applications for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "Applicants can update own applications"
  on applications for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = applications.profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "Employers can update application status"
  on applications for update
  using (
    exists (
      select 1 from jobs
      join companies on companies.id = jobs.company_id
      where jobs.id = applications.job_id
      and companies.user_id = auth.uid()
    )
  );

-- Saved jobs policies
create policy "Users can view own saved jobs"
  on saved_jobs for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = saved_jobs.profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "Users can save jobs"
  on saved_jobs for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = profile_id
      and profiles.user_id = auth.uid()
    )
  );

create policy "Users can unsave jobs"
  on saved_jobs for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = saved_jobs.profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables
create trigger update_profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_companies_updated_at
  before update on companies
  for each row execute function update_updated_at_column();

create trigger update_jobs_updated_at
  before update on jobs
  for each row execute function update_updated_at_column();

create trigger update_applications_updated_at
  before update on applications
  for each row execute function update_updated_at_column();

-- Generate API token
create or replace function generate_api_token()
returns text as $$
begin
  return encode(gen_random_bytes(32), 'hex');
end;
$$ language plpgsql;
