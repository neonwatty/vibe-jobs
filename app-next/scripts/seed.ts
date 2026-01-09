/**
 * Database Seed Script
 * Run with: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey)

// Sample companies
const companies = [
  {
    name: 'AI Startup Inc',
    email_domain: 'aistartup.com',
    description: 'Building the future of AI-assisted development. We believe every developer should ship 10x faster.',
    website: 'https://aistartup.com',
    company_size: '11-50',
    industry: 'Technology',
    headquarters: 'San Francisco, CA',
    remote_policy: 'Remote-first',
    ai_culture: 'AI tools are required for all engineering work',
    ai_tools_used: ['Claude Code', 'Cursor', 'GitHub Copilot', 'v0'],
    domain_verified: true,
  },
  {
    name: 'TechCorp Solutions',
    email_domain: 'techcorp.io',
    description: 'Enterprise software solutions powered by AI. We help Fortune 500 companies modernize their tech stack.',
    website: 'https://techcorp.io',
    company_size: '51-200',
    industry: 'Enterprise Software',
    headquarters: 'New York, NY',
    remote_policy: 'Hybrid (3 days in office)',
    ai_culture: 'AI tools encouraged for productivity',
    ai_tools_used: ['GitHub Copilot', 'ChatGPT'],
    domain_verified: true,
  },
  {
    name: 'DevTools Labs',
    email_domain: 'devtoolslabs.dev',
    description: 'Creating developer tools that make coding enjoyable. Small team, big impact.',
    website: 'https://devtoolslabs.dev',
    company_size: '1-10',
    industry: 'Developer Tools',
    headquarters: 'Austin, TX',
    remote_policy: 'Fully Remote',
    ai_culture: 'We live and breathe AI-assisted development',
    ai_tools_used: ['Claude Code', 'Cursor', 'Windsurf', 'Replit Agent'],
    domain_verified: true,
  },
]

// Sample jobs (will be linked to companies)
const jobTemplates = [
  {
    title: 'Senior Full-Stack Engineer',
    description: `We're looking for a senior engineer who ships fast with AI tools. You'll work on our core product, building features end-to-end.

This role is perfect for someone who:
- Loves shipping features quickly
- Uses AI coding tools daily
- Wants to work on challenging problems
- Values autonomy and ownership`,
    role_category: 'engineer' as const,
    experience_level: 'senior' as const,
    location_type: 'remote' as const,
    location_details: 'US timezones preferred',
    employment_type: 'full_time' as const,
    salary_min: 180000,
    salary_max: 250000,
    salary_currency: 'USD',
    ai_tools_required: ['Claude Code', 'Cursor', 'GitHub Copilot'],
    ai_proficiency: 'proficient' as const,
    how_youll_be_tested: '1-hour live build: We\'ll give you a design and watch you build it with your AI tools. No whiteboard puzzles - just real coding with the tools you actually use.',
    requirements: [
      '5+ years of full-stack development experience',
      'Proficient with React and Node.js/Python',
      'Experience shipping production applications',
      'Daily use of AI coding tools',
    ],
    nice_to_have: [
      'Experience with TypeScript',
      'Open source contributions',
      'Previous startup experience',
    ],
    benefits: [
      'Competitive salary + equity',
      'Unlimited PTO',
      'Health, dental, and vision',
      '$5k annual learning budget',
      'Remote-first culture',
    ],
    status: 'active',
  },
  {
    title: 'Product Manager - AI Features',
    description: `Lead product development for our AI-powered features. Work directly with engineering and design to ship features that users love.

You'll be responsible for:
- Defining product roadmap for AI features
- Working with customers to understand needs
- Collaborating with engineering on implementation
- Measuring and improving feature adoption`,
    role_category: 'product' as const,
    experience_level: 'mid' as const,
    location_type: 'hybrid' as const,
    location_details: 'New York, NY (3 days/week)',
    employment_type: 'full_time' as const,
    salary_min: 140000,
    salary_max: 180000,
    salary_currency: 'USD',
    ai_tools_required: ['ChatGPT', 'v0'],
    ai_proficiency: 'familiar' as const,
    how_youll_be_tested: 'Product case study: You\'ll analyze a real product challenge we faced and present your approach. Focus on user research, prioritization, and metrics.',
    requirements: [
      '3+ years of product management experience',
      'Experience with B2B SaaS products',
      'Strong analytical skills',
      'Excellent communication',
    ],
    nice_to_have: [
      'Technical background',
      'Experience with AI/ML products',
      'Previous experience at a startup',
    ],
    benefits: [
      'Competitive compensation',
      'Equity package',
      'Comprehensive benefits',
      'Hybrid flexibility',
    ],
    status: 'active',
  },
  {
    title: 'Founding Engineer',
    description: `Join as one of our first engineers and help build the foundation of our product. This is a unique opportunity to shape technical decisions and company culture.

What you'll do:
- Build core product features from scratch
- Make architectural decisions
- Work directly with founders
- Help hire the engineering team`,
    role_category: 'engineer' as const,
    experience_level: 'lead' as const,
    location_type: 'remote' as const,
    location_details: 'Anywhere in the world',
    employment_type: 'full_time' as const,
    salary_min: 200000,
    salary_max: 300000,
    salary_currency: 'USD',
    ai_tools_required: ['Claude Code', 'Cursor', 'Windsurf'],
    ai_proficiency: 'expert' as const,
    how_youll_be_tested: 'Paid project: Build a small feature over a week using our stack. We\'ll pay you $2,000 and you\'ll get a real sense of how we work.',
    requirements: [
      '7+ years of engineering experience',
      'Experience as tech lead or architect',
      'Expert-level AI tool usage',
      'Full-stack capabilities',
    ],
    nice_to_have: [
      'Startup founding experience',
      'Open source maintainer',
      'Technical writing skills',
    ],
    benefits: [
      'Top-tier salary',
      'Significant equity (1-2%)',
      'Unlimited PTO',
      'Work from anywhere',
      '$10k equipment budget',
    ],
    status: 'active',
  },
  {
    title: 'Junior Frontend Developer',
    description: `Great opportunity for someone early in their career who's eager to learn and grow. You'll work alongside senior engineers and ship real features.

Perfect for you if:
- You're hungry to learn
- You've been using AI tools to accelerate your learning
- You want mentorship from experienced engineers
- You're excited about building user interfaces`,
    role_category: 'engineer' as const,
    experience_level: 'entry' as const,
    location_type: 'remote' as const,
    location_details: 'US only',
    employment_type: 'full_time' as const,
    salary_min: 80000,
    salary_max: 110000,
    salary_currency: 'USD',
    ai_tools_required: ['GitHub Copilot', 'ChatGPT'],
    ai_proficiency: 'familiar' as const,
    how_youll_be_tested: 'Take-home project: Build a small React component (2-3 hours). We want to see how you think and use AI tools to solve problems.',
    requirements: [
      '1+ years of development experience (bootcamp counts!)',
      'Familiarity with React',
      'Basic understanding of HTML/CSS/JavaScript',
      'Eagerness to learn',
    ],
    nice_to_have: [
      'Personal projects or portfolio',
      'TypeScript experience',
      'Design sensibility',
    ],
    benefits: [
      'Competitive entry-level salary',
      'Mentorship program',
      'Learning budget',
      'Health benefits',
      'Remote flexibility',
    ],
    status: 'active',
  },
  {
    title: 'Growth Marketing Manager',
    description: `Drive user acquisition and growth for our developer tools. You'll own the entire marketing funnel from awareness to activation.`,
    role_category: 'marketer' as const,
    experience_level: 'mid' as const,
    location_type: 'remote' as const,
    location_details: 'US timezones',
    employment_type: 'full_time' as const,
    salary_min: 120000,
    salary_max: 160000,
    salary_currency: 'USD',
    ai_tools_required: ['ChatGPT'],
    ai_proficiency: 'familiar' as const,
    how_youll_be_tested: 'Marketing plan presentation: Create a 90-day growth plan for a new feature launch. Present your strategy and expected results.',
    requirements: [
      '4+ years of growth marketing experience',
      'Experience with developer-focused products',
      'Data-driven mindset',
      'Content creation skills',
    ],
    nice_to_have: [
      'Technical background',
      'Community building experience',
      'SEO expertise',
    ],
    benefits: [
      'Competitive salary',
      'Equity',
      'Remote work',
      'Marketing budget ownership',
    ],
    status: 'active',
  },
]

// Sample profiles (candidates)
const profiles = [
  {
    first_name: 'Alex',
    last_name: 'Chen',
    email: 'alex.chen@example.com',
    headline: 'Senior Engineer who ships 3x faster with AI tools',
    location: 'San Francisco, CA',
    role_type: 'engineer' as const,
    ai_tools: ['Claude Code', 'Cursor', 'GitHub Copilot', 'ChatGPT'],
    availability: 'actively_looking' as const,
    portfolio_urls: ['https://github.com/alexchen', 'https://alexchen.dev'],
    linkedin_url: 'https://linkedin.com/in/alexchen',
    profile_complete: true,
    experience: JSON.stringify([
      { company: 'TechCorp', title: 'Senior Software Engineer', start_date: '2021-03', end_date: 'present' },
      { company: 'StartupXYZ', title: 'Software Engineer', start_date: '2018-06', end_date: '2021-02' },
    ]),
    education: JSON.stringify([
      { school: 'UC Berkeley', degree: 'B.S.', field: 'Computer Science', year: 2018 },
    ]),
  },
  {
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.j@example.com',
    headline: 'Product Manager passionate about AI-powered tools',
    location: 'New York, NY',
    role_type: 'product' as const,
    ai_tools: ['ChatGPT', 'v0', 'Notion AI'],
    availability: 'open' as const,
    portfolio_urls: [],
    linkedin_url: 'https://linkedin.com/in/sarahjohnson',
    profile_complete: true,
    experience: JSON.stringify([
      { company: 'BigTech Inc', title: 'Product Manager', start_date: '2020-01', end_date: 'present' },
    ]),
    education: JSON.stringify([
      { school: 'Stanford', degree: 'MBA', field: 'Business', year: 2019 },
    ]),
  },
  {
    first_name: 'Marcus',
    last_name: 'Williams',
    email: 'marcus.w@example.com',
    headline: 'Full-stack dev building with Cursor daily',
    location: 'Austin, TX',
    role_type: 'engineer' as const,
    ai_tools: ['Cursor', 'Claude Code', 'Windsurf'],
    availability: 'actively_looking' as const,
    portfolio_urls: ['https://github.com/marcusw'],
    linkedin_url: 'https://linkedin.com/in/marcuswilliams',
    profile_complete: true,
    experience: JSON.stringify([
      { company: 'DevShop', title: 'Full-Stack Developer', start_date: '2019-08', end_date: 'present' },
    ]),
    education: JSON.stringify([
      { school: 'Georgia Tech', degree: 'B.S.', field: 'Computer Science', year: 2019 },
    ]),
  },
  {
    first_name: 'Emily',
    last_name: 'Rodriguez',
    email: 'emily.r@example.com',
    headline: 'Growth marketer with a technical edge',
    location: 'Remote',
    role_type: 'marketer' as const,
    ai_tools: ['ChatGPT', 'Jasper'],
    availability: 'open' as const,
    portfolio_urls: [],
    linkedin_url: 'https://linkedin.com/in/emilyrodriguez',
    profile_complete: true,
    experience: JSON.stringify([
      { company: 'GrowthCo', title: 'Growth Marketing Manager', start_date: '2020-05', end_date: 'present' },
    ]),
    education: JSON.stringify([
      { school: 'UCLA', degree: 'B.A.', field: 'Marketing', year: 2018 },
    ]),
  },
  {
    first_name: 'David',
    last_name: 'Kim',
    email: 'david.kim@example.com',
    headline: 'Junior developer eager to learn and ship',
    location: 'Seattle, WA',
    role_type: 'engineer' as const,
    ai_tools: ['GitHub Copilot', 'ChatGPT', 'Replit Agent'],
    availability: 'actively_looking' as const,
    portfolio_urls: ['https://github.com/davidkim'],
    linkedin_url: 'https://linkedin.com/in/davidkim',
    profile_complete: true,
    experience: JSON.stringify([
      { company: 'Bootcamp Project', title: 'Student Developer', start_date: '2023-06', end_date: '2023-12' },
    ]),
    education: JSON.stringify([
      { school: 'Coding Bootcamp', degree: 'Certificate', field: 'Full-Stack Development', year: 2023 },
    ]),
  },
]

async function seed() {
  console.log('Starting database seed...\n')

  // Create a fake user ID for seeding (we'll use a placeholder since we can't create auth users)
  const fakeUserId = '00000000-0000-0000-0000-000000000001'

  // Insert companies
  console.log('Inserting companies...')
  const companyIds: string[] = []
  for (const company of companies) {
    const { data, error } = await supabase
      .from('companies')
      .insert({
        ...company,
        user_id: fakeUserId,
      })
      .select('id')
      .single()

    if (error) {
      console.error(`  Error inserting ${company.name}:`, error.message)
    } else {
      console.log(`  Created: ${company.name}`)
      companyIds.push(data.id)
    }
  }

  // Insert jobs
  console.log('\nInserting jobs...')
  for (let i = 0; i < jobTemplates.length; i++) {
    const job = jobTemplates[i]
    const companyId = companyIds[i % companyIds.length] // Distribute jobs across companies

    const { error } = await supabase
      .from('jobs')
      .insert({
        ...job,
        company_id: companyId,
      })

    if (error) {
      console.error(`  Error inserting ${job.title}:`, error.message)
    } else {
      console.log(`  Created: ${job.title}`)
    }
  }

  // Insert profiles
  console.log('\nInserting profiles...')
  for (const profile of profiles) {
    const fakeProfileUserId = `00000000-0000-0000-0000-00000000000${profiles.indexOf(profile) + 2}`

    const { error } = await supabase
      .from('profiles')
      .insert({
        ...profile,
        user_id: fakeProfileUserId,
      })

    if (error) {
      console.error(`  Error inserting ${profile.first_name} ${profile.last_name}:`, error.message)
    } else {
      console.log(`  Created: ${profile.first_name} ${profile.last_name}`)
    }
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
