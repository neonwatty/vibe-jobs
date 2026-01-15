/**
 * Database Seed Script
 * Run with: npx tsx scripts/seed.ts
 *
 * This script seeds the database with:
 * 1. Sample companies
 * 2. Sample jobs (original + scraped from job-seeds.json)
 * 3. Sample profiles
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { Database } from '../lib/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Load scraped jobs from seed file
interface ScrapedJob {
  job_title: string
  company_name: string
  company_description: string
  location_type: 'remote' | 'hybrid' | 'onsite'
  location_details: string
  role_category: string
  experience_level: string
  employment_type: string
  salary_min: number
  salary_max: number
  description: string
  ai_tools_required: string[]
  ai_proficiency: 'familiar' | 'proficient' | 'expert'
  how_youll_be_tested: string
  benefits: string[]
  source_url?: string
}

interface SeedFile {
  scraped_at: string
  source: string
  jobs: ScrapedJob[]
}

function loadScrapedJobs(): ScrapedJob[] {
  try {
    const seedPath = join(__dirname, '../../scraped-jobs/job-seeds.json')
    const seedData = JSON.parse(readFileSync(seedPath, 'utf-8')) as SeedFile
    console.log(`Loaded ${seedData.jobs.length} scraped jobs from ${seedData.source}`)
    return seedData.jobs
  } catch (error) {
    console.warn('Could not load scraped jobs:', error)
    return []
  }
}

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

  // Get real user IDs from the database
  console.log('Fetching existing users...')
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('id, email, role')

  if (usersError || !users || users.length === 0) {
    console.error('Error: Could not fetch users. Make sure test users exist in the database.')
    console.error('Run the create-test-employee script first if needed.')
    process.exit(1)
  }

  // Find employer and employee user IDs
  const employerUser = users.find(u => u.role === 'employer')
  const employeeUser = users.find(u => u.role === 'employee')

  if (!employerUser) {
    console.error('Error: No employer user found in the database.')
    process.exit(1)
  }

  console.log(`  Using employer: ${employerUser.email} (${employerUser.id})`)
  if (employeeUser) {
    console.log(`  Using employee: ${employeeUser.email} (${employeeUser.id})`)
  }

  const employerUserId = employerUser.id
  const employeeUserId = employeeUser?.id

  // Check if sample data already exists (skip if so to make script idempotent)
  const { data: existingCompanies } = await supabase.from('companies').select('id').limit(1)
  const { data: existingProfiles } = await supabase.from('profiles').select('id').limit(1)

  if (existingCompanies && existingCompanies.length > 0) {
    console.log('\nSkipping sample companies: Data already exists')
    console.log('Skipping sample jobs: Data already exists')
  } else {
    // Insert companies
    console.log('\nInserting companies...')
    const companyIds: string[] = []
    for (const company of companies) {
      const { data, error } = await supabase
        .from('companies')
        .insert({
          ...company,
          user_id: employerUserId,
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
  }

  // Insert profiles (skip if data already exists)
  if (existingProfiles && existingProfiles.length > 0) {
    console.log('\nSkipping sample profiles: Data already exists')
  } else if (!employeeUserId) {
    console.log('\nSkipping profiles: No employee user found')
  } else {
    console.log('\nInserting profiles...')
    // Only insert one profile since we only have one employee user
    const profile = profiles[0]
    const { error } = await supabase
      .from('profiles')
      .insert({
        ...profile,
        user_id: employeeUserId,
      })

    if (error) {
      console.error(`  Error inserting ${profile.first_name} ${profile.last_name}:`, error.message)
    } else {
      console.log(`  Created: ${profile.first_name} ${profile.last_name}`)
    }
  }

  // =========================================================================
  // IMPORT SCRAPED JOBS
  // =========================================================================
  console.log('\n--- Importing Scraped Jobs ---\n')

  const scrapedJobs = loadScrapedJobs()
  if (scrapedJobs.length === 0) {
    console.log('No scraped jobs to import.')
  } else {
    // Get or create a company for scraped jobs
    // Due to schema constraints (one company per user), we use the existing employer's company
    console.log('Finding company for scraped jobs...')

    let scrapedJobsCompanyId: string

    // First, try to find an existing company for this employer
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id, name')
      .eq('user_id', employerUserId)
      .single()

    if (existingCompany) {
      scrapedJobsCompanyId = existingCompany.id
      console.log(`  Using existing company: ${existingCompany.name}`)
    } else {
      // Create a new company for the employer
      const { data: newCompany, error: createError } = await supabase
        .from('companies')
        .insert({
          name: 'Vibe Jobs Demo Company',
          description: 'Demo company for showcasing AI-native job listings',
          email_domain: 'vibejobs.demo',
          user_id: employerUserId,
          domain_verified: false,
          ai_tools_used: ['Cursor', 'Claude Code', 'GitHub Copilot'],
        })
        .select('id')
        .single()

      if (createError || !newCompany) {
        console.error('  Error creating company for scraped jobs:', createError?.message)
        process.exit(1)
      }

      scrapedJobsCompanyId = newCompany.id
      console.log('  Created new company: Vibe Jobs Demo Company')
    }

    // Helper to map role_category string to enum
    const mapRoleCategory = (category: string): 'engineer' | 'product' | 'marketer' | 'sales' | 'ops' | 'other' => {
      const mapping: Record<string, 'engineer' | 'product' | 'marketer' | 'sales' | 'ops' | 'other'> = {
        engineer: 'engineer',
        product: 'product',
        marketer: 'marketer',
        sales: 'sales',
        ops: 'ops',
        instructor: 'other',
        other: 'other',
      }
      return mapping[category.toLowerCase()] || 'other'
    }

    // Helper to map experience_level string to enum
    const mapExperienceLevel = (level: string): 'entry' | 'mid' | 'senior' | 'lead' => {
      const mapping: Record<string, 'entry' | 'mid' | 'senior' | 'lead'> = {
        junior: 'entry',
        entry: 'entry',
        mid: 'mid',
        senior: 'senior',
        lead: 'lead',
      }
      return mapping[level.toLowerCase()] || 'mid'
    }

    // Helper to map employment_type string to enum
    const mapEmploymentType = (type: string): 'full_time' | 'part_time' | 'contract' => {
      const mapping: Record<string, 'full_time' | 'part_time' | 'contract'> = {
        full_time: 'full_time',
        part_time: 'part_time',
        contract: 'contract',
        contractor: 'contract',
      }
      return mapping[type.toLowerCase()] || 'full_time'
    }

    // Insert scraped jobs (skip duplicates by checking title)
    console.log('\nInserting scraped jobs...')
    for (const job of scrapedJobs) {
      // Check if job already exists (by title only to avoid all duplicates)
      const { data: existing } = await supabase
        .from('jobs')
        .select('id')
        .eq('title', job.job_title)
        .limit(1)

      if (existing && existing.length > 0) {
        console.log(`  Skipped (exists): ${job.job_title}`)
        continue
      }

      const { error } = await supabase
        .from('jobs')
        .insert({
          company_id: scrapedJobsCompanyId,
          title: job.job_title,
          description: job.description,
          role_category: mapRoleCategory(job.role_category),
          experience_level: mapExperienceLevel(job.experience_level),
          employment_type: mapEmploymentType(job.employment_type),
          location_type: job.location_type,
          location_details: job.location_details,
          salary_min: job.salary_min,
          salary_max: job.salary_max,
          salary_currency: 'USD',
          ai_tools_required: job.ai_tools_required,
          ai_proficiency: job.ai_proficiency,
          how_youll_be_tested: job.how_youll_be_tested,
          benefits: job.benefits,
          source_url: job.source_url || null,
          status: 'active',
          is_active: true,
        })

      if (error) {
        console.error(`  Error inserting ${job.job_title}:`, error.message)
      } else {
        console.log(`  Created: ${job.job_title} at ${job.company_name}`)
      }
    }
  }

  console.log('\nSeed complete!')
}

seed().catch(console.error)
