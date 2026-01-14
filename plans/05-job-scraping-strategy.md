# Job Scraping & Initial Seeding Strategy

## Overview

Before launching, you need jobs on the platform. An empty job board converts no one. This plan covers how to find, source, and add initial AI-forward job postings.

**Goal:** 50-100 real, high-quality job postings before public launch

**Approach:** Multi-pronged - manual curation + browser automation + API sources

---

## Phase 1: Identify Target Jobs

### What Makes a Job "Vibe Jobs Worthy"?

**Strong Signals (Include):**
- Job explicitly mentions AI tools (Cursor, Claude, Copilot, ChatGPT)
- Company blog posts about using AI in workflows
- Job description says "no LeetCode" or "practical interview"
- Company is in AI/ML space
- YC-backed company (especially recent batches)
- Startup with modern tech stack

**Weak Signals (Maybe):**
- "AI experience preferred"
- "Familiar with modern tooling"
- Remote-first company
- Mentions automation

**Exclude:**
- Jobs that require LeetCode-style interviews (if known)
- Enterprise companies with traditional hiring
- AI research roles (different audience)
- Entry-level roles at large companies (usually traditional hiring)

---

## Phase 2: Source Identification

### High-Value Sources

| Source | Quality | Volume | How to Access |
|--------|---------|--------|---------------|
| **YC Work at a Startup** | Very High | Medium | workatastartup.com |
| **Wellfound (AngelList)** | High | High | wellfound.com |
| **LinkedIn (filtered)** | Medium | High | Browser automation |
| **GitHub Jobs** | High | Low | GitHub repos with HIRING.md |
| **Hacker News "Who is Hiring"** | Very High | Medium | Monthly threads |
| **Company career pages** | Very High | Low | Direct scraping |
| **Twitter/X** | High | Low | Search for hiring tweets |
| **AI Tool Discords** | High | Low | #hiring channels |

### Source Details

#### 1. YC Work at a Startup (workatastartup.com)
- **Why:** YC companies are heavily AI-forward
- **How:** Browse startup list, filter for AI/engineering roles
- **Quality:** Very high - these companies ship fast with modern tools
- **Access:** Public, can browse without login

#### 2. Wellfound (AngelList Talent)
- **Why:** Startup-focused, often AI-forward
- **How:** Search with keywords like "AI", "Cursor", "Claude"
- **Quality:** High - startup culture aligns with Vibe Jobs
- **Access:** Requires account, but free to browse

#### 3. LinkedIn
- **Why:** Largest job board, but need to filter heavily
- **How:** Search for "Cursor" OR "Claude" OR "AI tools" in job descriptions
- **Quality:** Mixed - need to curate carefully
- **Access:** Browser automation possible, rate limits apply

#### 4. GitHub Hiring
- **Why:** Developer-focused companies often post in repos
- **How:** Search for HIRING.md, JOBS.md files
- **Quality:** High - tech-forward companies
- **Access:** Public via GitHub API or search

#### 5. Hacker News "Who is Hiring"
- **Why:** Monthly threads with startup jobs
- **How:** Parse comments from monthly thread
- **Quality:** Very high - HN audience is AI-forward
- **Access:** HN API, public

#### 6. Company Career Pages
- **Why:** Direct source, most accurate info
- **How:** Compile list of AI-forward companies, scrape career pages
- **Quality:** Very high
- **Access:** Varies, most are public

---

## Phase 3: Data Collection Strategy

### Manual Curation (Recommended First)

**Why Manual First:**
- Ensures quality control
- Helps you understand what good jobs look like
- Builds intuition for the platform
- Avoids legal/ethical issues with scraping

**Process:**
1. Visit source (e.g., workatastartup.com)
2. Browse jobs that match criteria
3. Copy job details into JSON format
4. Add "How You'll Be Tested" (infer from job description or leave blank)
5. Import into Vibe Jobs

**Target:** 20-30 high-quality jobs manually curated

### Browser Automation (Claude in Chrome)

**Use Cases:**
- Faster data collection from structured sources
- Navigating pages with pagination
- Extracting job details into structured format

**Workflow with Claude in Chrome:**
```
1. Navigate to job board (e.g., Wellfound)
2. Search for relevant keywords
3. For each job:
   a. Click into job detail page
   b. Extract: title, company, location, description, salary
   c. Determine if AI-forward based on description
   d. If yes, format as JSON
4. Compile list of qualifying jobs
5. Review and import
```

**Important Notes:**
- Respect rate limits
- Don't hammer servers
- Some sites prohibit automated access (check ToS)
- LinkedIn is particularly strict

### API Sources

**Hacker News API:**
```javascript
// Get "Who is Hiring" threads
// https://hacker-news.firebaseio.com/v0/item/{id}.json

// Monthly threads usually titled "Ask HN: Who is hiring? (Month Year)"
// Parse comments for job posts
```

**GitHub API:**
```javascript
// Search for hiring files
// GET /search/code?q=HIRING.md+extension:md
```

---

## Phase 4: Data Transformation

### Target Schema

Jobs need to match Vibe Jobs schema:

```typescript
interface JobSeed {
  // Required
  company_name: string;
  job_title: string;
  location_type: 'remote' | 'hybrid' | 'onsite';
  role_category: 'engineer' | 'product' | 'marketer' | 'sales' | 'ops' | 'other';
  experience_level: 'entry' | 'mid' | 'senior' | 'lead';
  employment_type: 'full_time' | 'part_time' | 'contract';
  description: string;
  salary_min: number;
  salary_max: number;

  // Optional but valuable
  location_details?: string;
  ai_tools_required?: string[];
  ai_proficiency?: 'familiar' | 'proficient' | 'expert';
  how_youll_be_tested?: string;

  // Source tracking
  source_url: string;
  source_platform: string;
  scraped_at: string;
}
```

### Transformation Prompt

Use this prompt with Claude to transform raw job descriptions:

```
Convert this job posting into the following JSON format. Infer values where not
explicitly stated. For salary, estimate based on role, level, and location if
not provided. For ai_tools_required, extract any AI tools mentioned.

Job posting:
[PASTE JOB DESCRIPTION]

JSON Schema:
{
  "company_name": "string",
  "job_title": "string",
  "location_type": "remote | hybrid | onsite",
  "location_details": "string or null",
  "role_category": "engineer | product | marketer | sales | ops | other",
  "experience_level": "entry | mid | senior | lead",
  "employment_type": "full_time | part_time | contract",
  "description": "string (cleaned up, 2-3 paragraphs)",
  "salary_min": number,
  "salary_max": number,
  "ai_tools_required": ["array of AI tools mentioned"],
  "ai_proficiency": "familiar | proficient | expert",
  "how_youll_be_tested": "string (infer from interview process if mentioned, or null)"
}

Return only valid JSON.
```

---

## Phase 5: Import Process

### Option A: Admin Import Script

Create a script to bulk import jobs:

```typescript
// scripts/import-jobs.ts
import { createClient } from '@supabase/supabase-js';
import jobs from './seed-jobs.json';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // Use service key for admin access
);

async function importJobs() {
  // Create a "system" company for seeded jobs
  // Or create companies for each unique company_name

  for (const job of jobs) {
    // Check if company exists
    let company = await getOrCreateCompany(job.company_name);

    // Insert job
    await supabase.from('jobs').insert({
      company_id: company.id,
      title: job.job_title,
      description: job.description,
      location_type: job.location_type,
      location_details: job.location_details,
      role_category: job.role_category,
      experience_level: job.experience_level,
      employment_type: job.employment_type,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      ai_tools_required: job.ai_tools_required,
      how_youll_be_tested: job.how_youll_be_tested,
      status: 'active',
      is_seeded: true, // Flag to identify seeded jobs
      source_url: job.source_url,
    });
  }
}
```

### Option B: Admin UI

Create an admin page for manual job entry:

```
/admin/jobs/new - Form to add seeded jobs
/admin/jobs - List and manage seeded jobs
```

### Database Additions

```sql
-- Add source tracking to jobs
ALTER TABLE jobs ADD COLUMN is_seeded BOOLEAN DEFAULT false;
ALTER TABLE jobs ADD COLUMN source_url TEXT;
ALTER TABLE jobs ADD COLUMN source_platform TEXT;

-- Create placeholder companies for seeded jobs
ALTER TABLE companies ADD COLUMN is_placeholder BOOLEAN DEFAULT false;
```

---

## Phase 6: Execution Plan

### Week 1: Manual Curation (Target: 30 jobs)

**Day 1-2: YC Companies**
1. Go to workatastartup.com
2. Browse recent YC companies
3. Find 10-15 engineering/product roles
4. Manually transform and import

**Day 3-4: Wellfound**
1. Search for AI-related keywords
2. Find 10-15 relevant jobs
3. Transform and import

**Day 5: Hacker News**
1. Find latest "Who is Hiring" thread
2. Parse for AI-forward jobs
3. Add 5-10 quality posts

### Week 2: Automation & Expansion (Target: 50 more jobs)

**Day 1-2: LinkedIn Automation**
1. Use Claude in Chrome to navigate LinkedIn Jobs
2. Search for "Cursor developer" or "AI tools"
3. Extract qualifying jobs
4. Transform and import

**Day 3-4: Company Career Pages**
1. Compile list of known AI-forward companies:
   - Anthropic, OpenAI (if hiring non-research)
   - Vercel, Supabase, Resend
   - YC AI companies
   - Companies that blog about AI tools
2. Visit career pages
3. Extract relevant jobs

**Day 5: Quality Review**
1. Review all imported jobs
2. Remove duplicates
3. Fill in missing "How You'll Be Tested" sections
4. Verify salary ranges are reasonable

---

## Phase 7: Browser Automation Specifics (Claude in Chrome)

### LinkedIn Jobs Workflow

```
Objective: Find AI-forward engineering jobs on LinkedIn

Steps:
1. Navigate to linkedin.com/jobs
2. Search for: "senior engineer" "cursor" OR "claude" OR "AI tools"
3. Filter: Remote, Posted in last week
4. For each result (first 20):
   a. Click to open job details
   b. Check if job mentions:
      - Specific AI tools (Cursor, Claude, Copilot)
      - "AI-forward" or "AI-native"
      - Modern interview process
   c. If qualifying, extract:
      - Job title
      - Company name
      - Location
      - Description (first 500 words)
      - Salary (if shown)
   d. Take screenshot for reference
5. Compile into structured JSON
```

### Wellfound Workflow

```
Objective: Extract startup jobs from Wellfound

Steps:
1. Navigate to wellfound.com/jobs
2. Filter: Engineering, Remote
3. Search: "AI" or browse AI-tagged companies
4. For each job:
   a. Click into detail view
   b. Extract all job fields
   c. Note salary range (usually shown)
   d. Check company profile for AI signals
5. Compile qualifying jobs
```

### Hacker News Workflow

```
Objective: Parse "Who is Hiring" thread

Steps:
1. Navigate to news.ycombinator.com
2. Search for "Who is hiring" January 2025 (or current month)
3. Open the thread
4. Scroll through comments
5. For each top-level comment (job post):
   a. Check if it mentions AI tools
   b. Check if it's engineer/product role
   c. If qualifying, extract:
      - Company name (usually first line)
      - Role title
      - Location/remote status
      - Salary (often included)
      - Contact/apply method
   d. Format as JSON
```

---

## Phase 8: Legal & Ethical Considerations

### What's OK:
- Reading publicly accessible job posts
- Manually copying job information
- Linking to original source
- Aggregating public data

### Be Careful:
- Automated scraping at high volume
- Bypassing login walls
- Violating site ToS
- Not attributing sources

### Recommendations:
1. Always include `source_url` with imported jobs
2. Don't claim these are "posted by" the company
3. Mark jobs as "curated" or "discovered" vs "posted directly"
4. Respect robots.txt for automated collection
5. When companies join, let them claim/update their listings

---

## Phase 9: Attribution & Transparency

### How to Display Seeded Jobs

```
┌─────────────────────────────────────────────────────────────┐
│  Senior Software Engineer                                    │
│  Acme Corp · Remote · $150k-$180k                            │
│                                                              │
│  [Cursor] [Claude] [GitHub Copilot]                          │
│                                                              │
│  "Join our AI-forward engineering team..."                   │
│                                                              │
│  ─────────────────────────────────────────────────────────── │
│  📍 Discovered on Wellfound · [View Original →]              │
│  (Company hasn't claimed this listing yet)                   │
└─────────────────────────────────────────────────────────────┘
```

### When Company Claims Listing

1. Company signs up
2. We match them to existing seeded jobs by domain
3. They can "claim" their listings
4. Claimed listings become regular job posts
5. Attribution badge is removed

---

## Success Criteria

- [ ] 50+ jobs imported before launch
- [ ] Jobs span multiple sources (not all from one place)
- [ ] Mix of role types (engineer, product, other)
- [ ] All jobs have reasonable salary ranges
- [ ] Source attribution is tracked
- [ ] Quality is high (no spam, no irrelevant jobs)

---

## Sample Target Companies

### Known AI-Forward (High Priority)

**AI Companies:**
- Anthropic
- OpenAI (non-research roles)
- Perplexity
- Runway
- Stability AI
- Midjourney (if hiring)

**Developer Tools (AI-forward culture):**
- Vercel
- Supabase
- Resend
- Neon
- Planetscale
- Railway

**YC Companies (Recent Batches):**
- Search YC directory for AI-tagged companies
- Focus on W23, S23, W24, S24 batches

**Companies Known to Use AI Tools:**
- Linear (known Cursor users)
- Retool
- Figma (AI features team)
- Notion (AI features team)

### Search Terms for Discovery

**On LinkedIn:**
- "cursor developer"
- "AI tools engineer"
- "claude coding"
- "copilot" + "senior engineer"
- "no leetcode"

**On Wellfound:**
- Filter: AI/ML category
- Filter: Developer Tools category
- Search: "AI-first" or "AI-native"

**On Twitter:**
- "we're hiring" + "cursor"
- "join our team" + "AI tools"
- "engineering" + "vibe coding"

---

## Next Steps

1. Start with manual curation (Week 1)
2. Use Claude in Chrome for LinkedIn/Wellfound when ready
3. Build import script for bulk loading
4. Set up attribution display
5. Monitor and refresh jobs periodically (jobs expire!)
