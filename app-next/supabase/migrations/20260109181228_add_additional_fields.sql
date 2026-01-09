-- Add additional fields to match UI requirements

-- =============================================================================
-- COMPANIES TABLE - Additional fields
-- =============================================================================

-- Industry and remote policy
alter table companies add column if not exists industry text;
alter table companies add column if not exists remote_policy text;

-- AI culture level and tools used by the company
alter table companies add column if not exists ai_culture text; -- 'encouraged' | 'expected' | 'required'
alter table companies add column if not exists ai_tools_used text[] not null default '{}';

-- =============================================================================
-- JOBS TABLE - Add status field for more granular control
-- =============================================================================

-- Add status field (active, paused, closed, draft)
-- This complements is_active for more granular job state management
alter table jobs add column if not exists status text not null default 'active';

-- Update existing rows: set status based on is_active
update jobs set status = case when is_active then 'active' else 'closed' end;

-- =============================================================================
-- PROFILES TABLE - Additional fields
-- =============================================================================

-- Add headline for quick summary
alter table profiles add column if not exists headline text;

-- Add profile completion flag
alter table profiles add column if not exists profile_complete boolean not null default false;

-- =============================================================================
-- APPLICATIONS TABLE - Rename cover_note to cover_message for consistency
-- =============================================================================

-- Rename the column if it exists as cover_note
do $$
begin
  if exists (select 1 from information_schema.columns where table_name = 'applications' and column_name = 'cover_note') then
    alter table applications rename column cover_note to cover_message;
  end if;
end $$;
