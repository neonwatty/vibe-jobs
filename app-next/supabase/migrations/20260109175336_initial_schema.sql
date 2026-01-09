-- Vibe Jobs Initial Schema
-- Tables: profiles (employees), companies (employers), jobs, applications

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================================================
-- DROP EXISTING OBJECTS (for idempotent migrations)
-- =============================================================================

-- Drop tables in reverse dependency order
drop table if exists api_tokens cascade;
drop table if exists applications cascade;
drop table if exists jobs cascade;
drop table if exists companies cascade;
drop table if exists profiles cascade;

-- Drop function if exists
drop function if exists update_updated_at_column() cascade;

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

-- Drop existing types if they exist
drop type if exists user_type cascade;
drop type if exists availability_status cascade;
drop type if exists role_category cascade;
drop type if exists experience_level cascade;
drop type if exists employment_type cascade;
drop type if exists location_type cascade;
drop type if exists ai_proficiency cascade;
drop type if exists application_status cascade;

create type user_type as enum ('employee', 'employer');
create type availability_status as enum ('actively_looking', 'open', 'not_looking');
create type role_category as enum ('engineer', 'product', 'marketer', 'sales', 'ops', 'other');
create type experience_level as enum ('entry', 'mid', 'senior', 'lead');
create type employment_type as enum ('full_time', 'part_time', 'contract');
create type location_type as enum ('remote', 'hybrid', 'onsite');
create type ai_proficiency as enum ('familiar', 'proficient', 'expert');
create type application_status as enum ('pending', 'reviewing', 'interviewing', 'offered', 'rejected', 'withdrawn');

-- =============================================================================
-- PROFILES TABLE (Employees/Job Seekers)
-- =============================================================================

create table profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Basic info
  first_name text not null,
  last_name text not null,
  email text not null,
  location text,
  linkedin_url text,

  -- Professional info
  role_type role_category not null default 'other',
  availability availability_status not null default 'open',

  -- Experience (stored as JSONB array)
  experience jsonb not null default '[]'::jsonb,
  -- Schema: [{ company, title, start_date, end_date, description }]

  -- Education (stored as JSONB array)
  education jsonb not null default '[]'::jsonb,
  -- Schema: [{ school, degree, field, year }]

  -- AI Tools (array of tool names)
  ai_tools text[] not null default '{}',

  -- Portfolio URLs
  portfolio_urls text[] not null default '{}',

  -- Original resume file (stored in Supabase Storage)
  resume_file_url text,

  -- Raw JSON submitted by user
  raw_json jsonb,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for searching
create index profiles_role_type_idx on profiles(role_type);
create index profiles_availability_idx on profiles(availability);
create index profiles_ai_tools_idx on profiles using gin(ai_tools);

-- =============================================================================
-- COMPANIES TABLE (Employers)
-- =============================================================================

create table companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,

  -- Company info
  name text not null,
  website text,
  logo_url text,
  description text,

  -- Domain verification
  email_domain text not null,
  domain_verified boolean not null default false,
  verified_at timestamptz,

  -- Location
  headquarters text,

  -- Size and stage
  company_size text, -- e.g., "1-10", "11-50", "51-200", etc.

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for domain lookup
create index companies_email_domain_idx on companies(email_domain);

-- =============================================================================
-- JOBS TABLE
-- =============================================================================

create table jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references companies(id) on delete cascade not null,

  -- Job details
  title text not null,
  description text not null,

  -- Categorization
  role_category role_category not null,
  experience_level experience_level not null,
  employment_type employment_type not null default 'full_time',

  -- Location
  location_type location_type not null,
  location_details text, -- e.g., "San Francisco, CA" or "US timezones only"

  -- AI requirements
  ai_tools_required text[] not null default '{}',
  ai_proficiency ai_proficiency not null default 'proficient',

  -- Compensation (required per plan)
  salary_min integer not null,
  salary_max integer not null,
  salary_currency text not null default 'USD',

  -- THE DIFFERENTIATOR: How candidates will be tested
  how_youll_be_tested text not null,

  -- Original job description file (stored in Supabase Storage)
  job_description_file_url text,

  -- Raw JSON submitted by employer
  raw_json jsonb,

  -- Status
  is_active boolean not null default true,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,

  -- Constraints
  constraint salary_range_valid check (salary_max >= salary_min)
);

-- Indexes for filtering/searching
create index jobs_company_id_idx on jobs(company_id);
create index jobs_role_category_idx on jobs(role_category);
create index jobs_experience_level_idx on jobs(experience_level);
create index jobs_location_type_idx on jobs(location_type);
create index jobs_is_active_idx on jobs(is_active);
create index jobs_ai_tools_idx on jobs using gin(ai_tools_required);
create index jobs_created_at_idx on jobs(created_at desc);

-- =============================================================================
-- APPLICATIONS TABLE
-- =============================================================================

create table applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,

  -- Application status
  status application_status not null default 'pending',

  -- Optional cover letter or note
  cover_note text,

  -- Employer notes (private)
  employer_notes text,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Prevent duplicate applications
  unique(job_id, profile_id)
);

-- Indexes
create index applications_job_id_idx on applications(job_id);
create index applications_profile_id_idx on applications(profile_id);
create index applications_status_idx on applications(status);
create index applications_created_at_idx on applications(created_at desc);

-- =============================================================================
-- API TOKENS TABLE (for MCP access)
-- =============================================================================

create table api_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,

  -- Token info
  name text not null default 'Default',
  token_hash text not null unique, -- Store hashed token
  last_four text not null, -- Last 4 chars for display

  -- Permissions
  scopes text[] not null default '{"read"}',

  -- Usage tracking
  last_used_at timestamptz,

  -- Timestamps
  created_at timestamptz not null default now(),
  expires_at timestamptz -- null means no expiry
);

create index api_tokens_user_id_idx on api_tokens(user_id);
create index api_tokens_token_hash_idx on api_tokens(token_hash);

-- =============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply trigger to all tables with updated_at
create trigger profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger companies_updated_at before update on companies
  for each row execute function update_updated_at_column();

create trigger jobs_updated_at before update on jobs
  for each row execute function update_updated_at_column();

create trigger applications_updated_at before update on applications
  for each row execute function update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table companies enable row level security;
alter table jobs enable row level security;
alter table applications enable row level security;
alter table api_tokens enable row level security;

-- -----------------------------------------------------------------------------
-- PROFILES POLICIES
-- -----------------------------------------------------------------------------

-- Anyone can view profiles (public job board)
create policy "Profiles are viewable by everyone"
  on profiles for select
  using (true);

-- Users can insert their own profile
create policy "Users can create their own profile"
  on profiles for insert
  with check (auth.uid() = user_id);

-- Users can update their own profile
create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = user_id);

-- Users can delete their own profile
create policy "Users can delete their own profile"
  on profiles for delete
  using (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- COMPANIES POLICIES
-- -----------------------------------------------------------------------------

-- Anyone can view companies
create policy "Companies are viewable by everyone"
  on companies for select
  using (true);

-- Users can create their own company
create policy "Users can create their own company"
  on companies for insert
  with check (auth.uid() = user_id);

-- Users can update their own company
create policy "Users can update their own company"
  on companies for update
  using (auth.uid() = user_id);

-- Users can delete their own company
create policy "Users can delete their own company"
  on companies for delete
  using (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- JOBS POLICIES
-- -----------------------------------------------------------------------------

-- Anyone can view active jobs
create policy "Active jobs are viewable by everyone"
  on jobs for select
  using (is_active = true);

-- Company owners can view all their jobs (including inactive)
create policy "Company owners can view all their jobs"
  on jobs for select
  using (
    exists (
      select 1 from companies
      where companies.id = jobs.company_id
      and companies.user_id = auth.uid()
    )
  );

-- Company owners can create jobs
create policy "Company owners can create jobs"
  on jobs for insert
  with check (
    exists (
      select 1 from companies
      where companies.id = company_id
      and companies.user_id = auth.uid()
    )
  );

-- Company owners can update their jobs
create policy "Company owners can update their jobs"
  on jobs for update
  using (
    exists (
      select 1 from companies
      where companies.id = jobs.company_id
      and companies.user_id = auth.uid()
    )
  );

-- Company owners can delete their jobs
create policy "Company owners can delete their jobs"
  on jobs for delete
  using (
    exists (
      select 1 from companies
      where companies.id = jobs.company_id
      and companies.user_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- APPLICATIONS POLICIES
-- -----------------------------------------------------------------------------

-- Applicants can view their own applications
create policy "Applicants can view their own applications"
  on applications for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = applications.profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- Company owners can view applications to their jobs
create policy "Company owners can view applications to their jobs"
  on applications for select
  using (
    exists (
      select 1 from jobs
      join companies on companies.id = jobs.company_id
      where jobs.id = applications.job_id
      and companies.user_id = auth.uid()
    )
  );

-- Users with profiles can create applications
create policy "Users can apply to jobs"
  on applications for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- Applicants can update their own applications (e.g., withdraw)
create policy "Applicants can update their own applications"
  on applications for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = applications.profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- Company owners can update applications (e.g., change status)
create policy "Company owners can update applications to their jobs"
  on applications for update
  using (
    exists (
      select 1 from jobs
      join companies on companies.id = jobs.company_id
      where jobs.id = applications.job_id
      and companies.user_id = auth.uid()
    )
  );

-- Applicants can delete/withdraw their applications
create policy "Applicants can delete their applications"
  on applications for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = applications.profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- API TOKENS POLICIES
-- -----------------------------------------------------------------------------

-- Users can only view their own tokens
create policy "Users can view their own tokens"
  on api_tokens for select
  using (auth.uid() = user_id);

-- Users can create their own tokens
create policy "Users can create their own tokens"
  on api_tokens for insert
  with check (auth.uid() = user_id);

-- Users can delete their own tokens
create policy "Users can delete their own tokens"
  on api_tokens for delete
  using (auth.uid() = user_id);
