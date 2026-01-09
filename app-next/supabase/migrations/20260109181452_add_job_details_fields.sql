-- Add additional job detail fields for rich job descriptions

-- Requirements (things candidates must have)
alter table jobs add column if not exists requirements text[] not null default '{}';

-- Nice to have (optional qualifications)
alter table jobs add column if not exists nice_to_have text[] not null default '{}';

-- Benefits (perks of the job)
alter table jobs add column if not exists benefits text[] not null default '{}';
