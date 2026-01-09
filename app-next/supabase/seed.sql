-- Seed data for Vibe Jobs
-- Run with: supabase db reset (which runs migrations + seed)
-- Or manually: psql -f supabase/seed.sql

-- Create fake user IDs (these won't have auth accounts but allow us to test the UI)
-- In production, companies/profiles are created after OAuth signup

-- Insert into auth.users first (required for foreign keys to users table)
-- These are fake auth accounts for testing purposes only
INSERT INTO auth.users (id, instance_id, email, encrypted_password, email_confirmed_at, created_at, updated_at, aud, role, raw_app_meta_data, raw_user_meta_data, is_super_admin, confirmation_token)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'company1@aistartup.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'company2@techcorp.io', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'company3@devtoolslabs.dev', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000000', 'alex.chen@example.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000000', 'sarah.j@example.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000000', 'marcus.w@example.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000000', 'emily.r@example.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, ''),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000000', 'david.kim@example.com', crypt('password123', gen_salt('bf')), now(), now(), now(), 'authenticated', 'authenticated', '{"provider":"email","providers":["email"]}', '{}', false, '')
ON CONFLICT (id) DO NOTHING;

-- Also insert into auth.identities (required for email login)
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'company1@aistartup.com', '{"sub":"00000000-0000-0000-0000-000000000001","email":"company1@aistartup.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'company2@techcorp.io', '{"sub":"00000000-0000-0000-0000-000000000002","email":"company2@techcorp.io"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'company3@devtoolslabs.dev', '{"sub":"00000000-0000-0000-0000-000000000003","email":"company3@devtoolslabs.dev"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', 'alex.chen@example.com', '{"sub":"00000000-0000-0000-0000-000000000011","email":"alex.chen@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000012', 'sarah.j@example.com', '{"sub":"00000000-0000-0000-0000-000000000012","email":"sarah.j@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000013', 'marcus.w@example.com', '{"sub":"00000000-0000-0000-0000-000000000013","email":"marcus.w@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000014', 'emily.r@example.com', '{"sub":"00000000-0000-0000-0000-000000000014","email":"emily.r@example.com"}', 'email', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000015', 'david.kim@example.com', '{"sub":"00000000-0000-0000-0000-000000000015","email":"david.kim@example.com"}', 'email', now(), now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert users table records (links to auth.users)
INSERT INTO users (id, email, role)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'company1@aistartup.com', 'employer'),
  ('00000000-0000-0000-0000-000000000002', 'company2@techcorp.io', 'employer'),
  ('00000000-0000-0000-0000-000000000003', 'company3@devtoolslabs.dev', 'employer'),
  ('00000000-0000-0000-0000-000000000011', 'alex.chen@example.com', 'employee'),
  ('00000000-0000-0000-0000-000000000012', 'sarah.j@example.com', 'employee'),
  ('00000000-0000-0000-0000-000000000013', 'marcus.w@example.com', 'employee'),
  ('00000000-0000-0000-0000-000000000014', 'emily.r@example.com', 'employee'),
  ('00000000-0000-0000-0000-000000000015', 'david.kim@example.com', 'employee')
ON CONFLICT (id) DO NOTHING;

-- Insert companies
INSERT INTO companies (id, user_id, name, email_domain, description, website, company_size, industry, headquarters, remote_policy, ai_culture, ai_tools_used, domain_verified)
VALUES
  (
    'a1000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'AI Startup Inc',
    'aistartup.com',
    'Building the future of AI-assisted development. We believe every developer should ship 10x faster.',
    'https://aistartup.com',
    '11-50',
    'Technology',
    'San Francisco, CA',
    'Remote-first',
    'AI tools are required for all engineering work',
    ARRAY['Claude Code', 'Cursor', 'GitHub Copilot', 'v0'],
    true
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'TechCorp Solutions',
    'techcorp.io',
    'Enterprise software solutions powered by AI. We help Fortune 500 companies modernize their tech stack.',
    'https://techcorp.io',
    '51-200',
    'Enterprise Software',
    'New York, NY',
    'Hybrid (3 days in office)',
    'AI tools encouraged for productivity',
    ARRAY['GitHub Copilot', 'ChatGPT'],
    true
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'DevTools Labs',
    'devtoolslabs.dev',
    'Creating developer tools that make coding enjoyable. Small team, big impact.',
    'https://devtoolslabs.dev',
    '1-10',
    'Developer Tools',
    'Austin, TX',
    'Fully Remote',
    'We live and breathe AI-assisted development',
    ARRAY['Claude Code', 'Cursor', 'Windsurf', 'Replit Agent'],
    true
  )
ON CONFLICT (id) DO NOTHING;

-- Insert jobs
INSERT INTO jobs (id, company_id, title, description, role_category, experience_level, location_type, location_details, employment_type, salary_min, salary_max, salary_currency, ai_tools_required, ai_proficiency, how_youll_be_tested, requirements, nice_to_have, benefits, status)
VALUES
  (
    'b1000000-0000-0000-0000-000000000001',
    'a1000000-0000-0000-0000-000000000001',
    'Senior Full-Stack Engineer',
    E'We''re looking for a senior engineer who ships fast with AI tools. You''ll work on our core product, building features end-to-end.\n\nThis role is perfect for someone who:\n- Loves shipping features quickly\n- Uses AI coding tools daily\n- Wants to work on challenging problems\n- Values autonomy and ownership',
    'engineer',
    'senior',
    'remote',
    'US timezones preferred',
    'full_time',
    180000,
    250000,
    'USD',
    ARRAY['Claude Code', 'Cursor', 'GitHub Copilot'],
    'proficient',
    E'1-hour live build: We''ll give you a design and watch you build it with your AI tools. No whiteboard puzzles - just real coding with the tools you actually use.',
    ARRAY['5+ years of full-stack development experience', 'Proficient with React and Node.js/Python', 'Experience shipping production applications', 'Daily use of AI coding tools'],
    ARRAY['Experience with TypeScript', 'Open source contributions', 'Previous startup experience'],
    ARRAY['Competitive salary + equity', 'Unlimited PTO', 'Health, dental, and vision', '$5k annual learning budget', 'Remote-first culture'],
    'active'
  ),
  (
    'b1000000-0000-0000-0000-000000000002',
    'a1000000-0000-0000-0000-000000000002',
    'Product Manager - AI Features',
    E'Lead product development for our AI-powered features. Work directly with engineering and design to ship features that users love.\n\nYou''ll be responsible for:\n- Defining product roadmap for AI features\n- Working with customers to understand needs\n- Collaborating with engineering on implementation\n- Measuring and improving feature adoption',
    'product',
    'mid',
    'hybrid',
    'New York, NY (3 days/week)',
    'full_time',
    140000,
    180000,
    'USD',
    ARRAY['ChatGPT', 'v0'],
    'familiar',
    E'Product case study: You''ll analyze a real product challenge we faced and present your approach. Focus on user research, prioritization, and metrics.',
    ARRAY['3+ years of product management experience', 'Experience with B2B SaaS products', 'Strong analytical skills', 'Excellent communication'],
    ARRAY['Technical background', 'Experience with AI/ML products', 'Previous experience at a startup'],
    ARRAY['Competitive compensation', 'Equity package', 'Comprehensive benefits', 'Hybrid flexibility'],
    'active'
  ),
  (
    'b1000000-0000-0000-0000-000000000003',
    'a1000000-0000-0000-0000-000000000003',
    'Founding Engineer',
    E'Join as one of our first engineers and help build the foundation of our product. This is a unique opportunity to shape technical decisions and company culture.\n\nWhat you''ll do:\n- Build core product features from scratch\n- Make architectural decisions\n- Work directly with founders\n- Help hire the engineering team',
    'engineer',
    'lead',
    'remote',
    'Anywhere in the world',
    'full_time',
    200000,
    300000,
    'USD',
    ARRAY['Claude Code', 'Cursor', 'Windsurf'],
    'expert',
    E'Paid project: Build a small feature over a week using our stack. We''ll pay you $2,000 and you''ll get a real sense of how we work.',
    ARRAY['7+ years of engineering experience', 'Experience as tech lead or architect', 'Expert-level AI tool usage', 'Full-stack capabilities'],
    ARRAY['Startup founding experience', 'Open source maintainer', 'Technical writing skills'],
    ARRAY['Top-tier salary', 'Significant equity (1-2%)', 'Unlimited PTO', 'Work from anywhere', '$10k equipment budget'],
    'active'
  ),
  (
    'b1000000-0000-0000-0000-000000000004',
    'a1000000-0000-0000-0000-000000000001',
    'Junior Frontend Developer',
    E'Great opportunity for someone early in their career who''s eager to learn and grow. You''ll work alongside senior engineers and ship real features.\n\nPerfect for you if:\n- You''re hungry to learn\n- You''ve been using AI tools to accelerate your learning\n- You want mentorship from experienced engineers\n- You''re excited about building user interfaces',
    'engineer',
    'entry',
    'remote',
    'US only',
    'full_time',
    80000,
    110000,
    'USD',
    ARRAY['GitHub Copilot', 'ChatGPT'],
    'familiar',
    E'Take-home project: Build a small React component (2-3 hours). We want to see how you think and use AI tools to solve problems.',
    ARRAY['1+ years of development experience (bootcamp counts!)', 'Familiarity with React', 'Basic understanding of HTML/CSS/JavaScript', 'Eagerness to learn'],
    ARRAY['Personal projects or portfolio', 'TypeScript experience', 'Design sensibility'],
    ARRAY['Competitive entry-level salary', 'Mentorship program', 'Learning budget', 'Health benefits', 'Remote flexibility'],
    'active'
  ),
  (
    'b1000000-0000-0000-0000-000000000005',
    'a1000000-0000-0000-0000-000000000003',
    'Growth Marketing Manager',
    'Drive user acquisition and growth for our developer tools. You''ll own the entire marketing funnel from awareness to activation.',
    'marketer',
    'mid',
    'remote',
    'US timezones',
    'full_time',
    120000,
    160000,
    'USD',
    ARRAY['ChatGPT'],
    'familiar',
    'Marketing plan presentation: Create a 90-day growth plan for a new feature launch. Present your strategy and expected results.',
    ARRAY['4+ years of growth marketing experience', 'Experience with developer-focused products', 'Data-driven mindset', 'Content creation skills'],
    ARRAY['Technical background', 'Community building experience', 'SEO expertise'],
    ARRAY['Competitive salary', 'Equity', 'Remote work', 'Marketing budget ownership'],
    'active'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert profiles (candidates)
INSERT INTO profiles (id, user_id, first_name, last_name, email, headline, location, role_type, ai_tools, availability, portfolio_urls, linkedin_url, profile_complete, experience, education)
VALUES
  (
    'd1000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000011',
    'Alex',
    'Chen',
    'alex.chen@example.com',
    'Senior Engineer who ships 3x faster with AI tools',
    'San Francisco, CA',
    'engineer',
    ARRAY['Claude Code', 'Cursor', 'GitHub Copilot', 'ChatGPT'],
    'actively_looking',
    ARRAY['https://github.com/alexchen', 'https://alexchen.dev'],
    'https://linkedin.com/in/alexchen',
    true,
    '[{"company": "TechCorp", "title": "Senior Software Engineer", "start_date": "2021-03", "end_date": "present"}, {"company": "StartupXYZ", "title": "Software Engineer", "start_date": "2018-06", "end_date": "2021-02"}]'::jsonb,
    '[{"school": "UC Berkeley", "degree": "B.S.", "field": "Computer Science", "year": 2018}]'::jsonb
  ),
  (
    'd1000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000012',
    'Sarah',
    'Johnson',
    'sarah.j@example.com',
    'Product Manager passionate about AI-powered tools',
    'New York, NY',
    'product',
    ARRAY['ChatGPT', 'v0', 'Notion AI'],
    'open',
    ARRAY[]::text[],
    'https://linkedin.com/in/sarahjohnson',
    true,
    '[{"company": "BigTech Inc", "title": "Product Manager", "start_date": "2020-01", "end_date": "present"}]'::jsonb,
    '[{"school": "Stanford", "degree": "MBA", "field": "Business", "year": 2019}]'::jsonb
  ),
  (
    'd1000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000013',
    'Marcus',
    'Williams',
    'marcus.w@example.com',
    'Full-stack dev building with Cursor daily',
    'Austin, TX',
    'engineer',
    ARRAY['Cursor', 'Claude Code', 'Windsurf'],
    'actively_looking',
    ARRAY['https://github.com/marcusw'],
    'https://linkedin.com/in/marcuswilliams',
    true,
    '[{"company": "DevShop", "title": "Full-Stack Developer", "start_date": "2019-08", "end_date": "present"}]'::jsonb,
    '[{"school": "Georgia Tech", "degree": "B.S.", "field": "Computer Science", "year": 2019}]'::jsonb
  ),
  (
    'd1000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000014',
    'Emily',
    'Rodriguez',
    'emily.r@example.com',
    'Growth marketer with a technical edge',
    'Remote',
    'marketer',
    ARRAY['ChatGPT', 'Jasper'],
    'open',
    ARRAY[]::text[],
    'https://linkedin.com/in/emilyrodriguez',
    true,
    '[{"company": "GrowthCo", "title": "Growth Marketing Manager", "start_date": "2020-05", "end_date": "present"}]'::jsonb,
    '[{"school": "UCLA", "degree": "B.A.", "field": "Marketing", "year": 2018}]'::jsonb
  ),
  (
    'd1000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000015',
    'David',
    'Kim',
    'david.kim@example.com',
    'Junior developer eager to learn and ship',
    'Seattle, WA',
    'engineer',
    ARRAY['GitHub Copilot', 'ChatGPT', 'Replit Agent'],
    'actively_looking',
    ARRAY['https://github.com/davidkim'],
    'https://linkedin.com/in/davidkim',
    true,
    '[{"company": "Bootcamp Project", "title": "Student Developer", "start_date": "2023-06", "end_date": "2023-12"}]'::jsonb,
    '[{"school": "Coding Bootcamp", "degree": "Certificate", "field": "Full-Stack Development", "year": 2023}]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;

-- Output summary
DO $$
BEGIN
  RAISE NOTICE 'Seed complete!';
  RAISE NOTICE 'Created % companies', (SELECT COUNT(*) FROM companies WHERE id::text LIKE 'a1000000%');
  RAISE NOTICE 'Created % jobs', (SELECT COUNT(*) FROM jobs WHERE id::text LIKE 'b1000000%');
  RAISE NOTICE 'Created % profiles', (SELECT COUNT(*) FROM profiles WHERE id::text LIKE 'd1000000%');
END $$;
