-- Saved Jobs table for bookmarking jobs
-- Allows job seekers to save jobs for later review

-- Drop if exists for idempotent migration
drop table if exists saved_jobs cascade;

create table saved_jobs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade not null,
  job_id uuid references jobs(id) on delete cascade not null,
  created_at timestamptz not null default now(),

  -- Prevent duplicate saves
  unique(profile_id, job_id)
);

-- Indexes
create index saved_jobs_profile_id_idx on saved_jobs(profile_id);
create index saved_jobs_job_id_idx on saved_jobs(job_id);

-- Enable RLS
alter table saved_jobs enable row level security;

-- Users can view their own saved jobs
create policy "Users can view their own saved jobs"
  on saved_jobs for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = saved_jobs.profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- Users can save jobs
create policy "Users can save jobs"
  on saved_jobs for insert
  with check (
    exists (
      select 1 from profiles
      where profiles.id = profile_id
      and profiles.user_id = auth.uid()
    )
  );

-- Users can unsave jobs
create policy "Users can unsave their saved jobs"
  on saved_jobs for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = saved_jobs.profile_id
      and profiles.user_id = auth.uid()
    )
  );
