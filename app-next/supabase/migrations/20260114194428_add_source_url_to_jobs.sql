-- Add source_url field to jobs table for linking back to original job postings
-- This is useful for:
-- 1. Attribution to original sources
-- 2. Allowing users to verify job details
-- 3. Providing a path to apply through the original posting

ALTER TABLE jobs ADD COLUMN IF NOT EXISTS source_url text;

-- Add comment for documentation
COMMENT ON COLUMN jobs.source_url IS 'URL to the original job posting (for scraped/imported jobs)';
