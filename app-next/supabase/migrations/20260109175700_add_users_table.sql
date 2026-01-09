-- Users table for app-specific user data
-- Links to auth.users and stores role selection

-- Drop if exists for idempotent migration
drop table if exists users cascade;

create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role user_type not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Index for role filtering
create index users_role_idx on users(role);

-- Apply updated_at trigger
create trigger users_updated_at before update on users
  for each row execute function update_updated_at_column();

-- Enable RLS
alter table users enable row level security;

-- Users can read their own record
create policy "Users can view their own record"
  on users for select
  using (auth.uid() = id);

-- Users can create their own record
create policy "Users can create their own record"
  on users for insert
  with check (auth.uid() = id);

-- Users can update their own record
create policy "Users can update their own record"
  on users for update
  using (auth.uid() = id);
