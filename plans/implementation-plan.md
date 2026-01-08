# Vibe Jobs - Implementation Plan

## Overview

**Vibe Jobs** - A job board for AI-fluent workers. The anti-LeetCode job board.

**Core philosophy:**
- Employers want people who ship with AI, not despite it
- Interviews test real work, not whiteboard puzzles
- Both sides prove they can use AI tools (by parsing their own data into JSON)

**Monetization:** Free for v1 (both sides)
**Domain ideas:** vibejobs.co, vibejobs.io, getvibejobs.com

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **Icons:** Lucide React
- **Auth:** OAuth (Google, GitHub) + email/password fallback
- **Database:** TBD (deferring backend decision)

---

## Core Features

### 1. JSON Upload Flow (Both Sides)

**Philosophy:** If you can't use an LLM to parse your own resume/job description, you're not the target user.

**Employees:**
- Upload resume (we keep original)
- Paste JSON-parsed version (using ChatGPT, Claude, etc.)
- We validate against schema
- Profile created, one-click apply thereafter

**Employers:**
- Upload job description (we keep original)
- Paste JSON-parsed version
- Add "How You'll Be Tested" section
- Job posted

### 2. "How You'll Be Tested" (Differentiator)

Every job post includes a transparent test format. No hidden interview surprises.

**Example formats by role:**

Engineers:
- "1-hour live build: We give you a problem, watch you solve it with your AI tools."
- "24-hour take-home: Build a small feature end-to-end. Use whatever you want."

Product:
- "2-hour PRD sprint: Write a spec for a feature we describe. Any tools allowed."
- "Strategy walkthrough: Show us a past decision and how you'd use AI to improve it."

### 3. MCP Access (Auth Required)

Users can search jobs/talent via their LLM tools through MCP.

- Requires account + API token
- Token managed in dashboard (`/dashboard/mcp` or `/company/mcp`)
- Full CRUD for authenticated users

---

## Data Models

### Employee Profile (JSON Schema)

```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "location": "string",
  "linkedin_url": "string (optional)",
  "experience": [
    {
      "company": "string",
      "title": "string",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM or present",
      "description": "string"
    }
  ],
  "education": [
    {
      "school": "string",
      "degree": "string",
      "field": "string",
      "year": "number"
    }
  ],
  "ai_tools": ["string"],
  "portfolio_urls": ["string"],
  "availability": "actively_looking | open | not_looking",
  "role_type": "engineer | product | marketer | sales | ops | other"
}
```

### Job Posting (JSON Schema)

```json
{
  "company_name": "string",
  "job_title": "string",
  "location_type": "remote | hybrid | onsite",
  "location_details": "string (optional)",
  "role_category": "engineer | product | marketer | sales | ops | other",
  "experience_level": "entry | mid | senior | lead",
  "employment_type": "full_time | part_time | contract",
  "description": "string",
  "ai_tools_required": ["string"],
  "ai_proficiency": "familiar | proficient | expert",
  "salary_min": "number (required)",
  "salary_max": "number (required)",
  "how_youll_be_tested": "string"
}
```

### Additional Tables Needed

- **users** - Auth, role (employee/employer), API token
- **applications** - job_id, profile_id, status, created_at

---

## Page Structure (28 pages)

### Landing Pages
```
/                         Main landing (Find a job / Post a job)
/for/talent               Employee hub → choose role
/for/engineers            Engineer-specific pitch (anti-LeetCode)
/for/product              Product-specific pitch (anti-hypotheticals)
/for/employers            Employer hub → choose who to hire
/hire/engineers           Pitch: hire AI-fluent engineers
/hire/product             Pitch: hire AI-fluent product people
```

### Public Browse
```
/jobs                     Browse all jobs (filterable)
/jobs/[id]                Job detail + "How You'll Be Tested" + apply
/talent                   Browse all candidates (filterable)
/talent/[id]              Candidate profile + resume download
```

### Auth
```
/signup                   Choose role, OAuth (Google/GitHub), or email
/login                    OAuth or email
```

### Employee Dashboard
```
/dashboard                Home: stats, quick actions
/dashboard/profile        Edit profile, re-upload JSON
/dashboard/applications   Track my applications
/dashboard/mcp            API token management
```

### Employer Dashboard
```
/company                  Home: job stats, quick actions
/company/profile          Edit company info
/company/jobs             Manage all job posts
/company/jobs/new         Post new job (JSON upload)
/company/jobs/[id]/edit   Edit existing job
/company/jobs/[id]/applicants   View/manage applicants
/company/mcp              API token management
```

### Utility & Docs
```
/about                    Manifesto
/help                     FAQ, JSON parsing instructions
/docs/mcp                 MCP overview
/docs/mcp/setup           Installation guide
/docs/mcp/job-seekers     Commands for job seekers
/docs/mcp/employers       Commands for employers
```

---

## AI Tools Reference (Hardcoded Initially)

### Coding
Claude Code, Cursor, GitHub Copilot, Codeium, Windsurf, Replit AI

### Chat/Research
Claude, ChatGPT, Gemini, Perplexity

### Writing/Content
Claude, ChatGPT, Jasper, Copy.ai, Notion AI

### Image/Design
Midjourney, DALL-E, Stable Diffusion, Figma AI, Canva AI

### Video/Audio
Runway, Pika, ElevenLabs, Descript

### Automation
Zapier AI, Make (Integromat), n8n, Bardeen

### Data/Analytics
Julius AI, ChatGPT Code Interpreter, Tableau AI

---

## Key Components

```
/components
  /ui
    Button.tsx
    Input.tsx
    Select.tsx
    Badge.tsx
    Card.tsx
  /jobs
    JobCard.tsx
    JobFilters.tsx
    JobForm.tsx
    HowYoullBeTested.tsx
  /profiles
    ProfileCard.tsx
    ProfileForm.tsx
    AIToolSelector.tsx
    JSONUploader.tsx
  /applications
    ApplicationCard.tsx
    ApplicationStatus.tsx
  /layout
    Header.tsx
    Footer.tsx
    DashboardNav.tsx
  /mcp
    TokenManager.tsx
```

---

## Decisions Made

1. **Name:** Vibe Jobs
2. **Monetization:** Free for v1
3. **Target roles (v1):** Engineers and Product
4. **Verification:** Self-reported via JSON upload (soft filter)
5. **Portfolio:** Required for engineers, optional for product
6. **"How You'll Be Tested":** Required on all job posts
7. **MCP:** Auth required (API token)
8. **OAuth:** Google + GitHub
9. **Backend:** TBD (deferred)

---

## Related Plans

- `employee-upload.md` - Full JSON upload flow for job seekers
- `employer-upload.md` - Full JSON upload flow for employers
- `pages-overview.md` - Detailed page specs with copy/messaging
