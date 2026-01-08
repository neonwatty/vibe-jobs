# Vibe Jobs - Pages Overview

## Landing Page Hierarchy

```
/
├── /for/talent (employee hub)
│   ├── /for/engineers
│   └── /for/product
│
└── /for/employers (employer hub)
    ├── /hire/engineers
    └── /hire/product
```

---

## Main Landing `/`

**Purpose:** Route visitors to the right path

**Elements:**
- Brief value prop (one line)
- Split CTA:
  - "Find a job" → `/for/talent`
  - "Post a job" → `/for/employers`

---

## Employee Hub `/for/talent`

**Headline:**
- "Find jobs where employers want you to use AI."

**Subhead:**
- "No more hiding your tools. No more LeetCode theater."

**Choose your path:**
- "I'm an Engineer" → `/for/engineers`
- "I'm in Product" → `/for/product`

---

## Employer Hub `/for/employers`

**Headline:**
- "Hire people who already work the way you want them to."

**Subhead:**
- "Find engineers and product people who ship faster with AI."

**Choose your path:**
- "Hire an Engineer" → `/hire/engineers`
- "Hire a Product Person" → `/hire/product`

---

## Role-Specific: Engineers (Employee) `/for/engineers`

**Headline options:**
- "No LeetCode. No whiteboard. Just build something."
- "Jobs where Cursor isn't cheating - it's expected."
- "Your interviewer will watch you use Claude. That's the test."

**Subhead:**
- "Companies here don't care if you memorized binary tree traversal. They care if you can ship."

**Key elements:**
- Direct confrontation of LeetCode/whiteboard culture
- CTA: "Browse engineering jobs" → `/jobs?role=engineer`
- How it works (brief)
- Sample job cards showing "How You'll Be Tested"

---

## Role-Specific: Product (Employee) `/for/product`

**Headline options:**
- "No hypotheticals. No whiteboards. Just make something real."
- "Product interviews where you can actually use your tools."
- "They'll give you a problem and 2 hours. Use whatever you want."

**Subhead:**
- "Companies here don't want to hear how you'd theoretically approach it. They want to see you do it."

**Key elements:**
- Direct confrontation of hypothetical case study culture
- CTA: "Browse product jobs" → `/jobs?role=product`
- How it works (brief)
- Sample job cards showing "How You'll Be Tested"

---

## Role-Specific: Engineers (Employer) `/hire/engineers`

**Headline options:**
- "Hire engineers who ship with AI, not despite it."
- "Find devs who use Cursor, Claude, and Copilot daily."

**Subhead:**
- "Post a job. Tell them how you'll test them. Get applicants who aren't afraid to show their workflow."

**Key elements:**
- CTA: "Post an engineering role" → `/company/jobs/new?role=engineer`
- How the test format works
- Sample candidate profiles

---

## Role-Specific: Product (Employer) `/hire/product`

**Headline options:**
- "Hire product people who build, not just theorize."
- "Find PMs who use AI to ship specs, research, and strategy faster."

**Subhead:**
- "Post a role. Define your challenge. See how they actually work."

**Key elements:**
- CTA: "Post a product role" → `/company/jobs/new?role=product`
- How the test format works
- Sample candidate profiles

---

## Public Pages

### Job Listings `/jobs`
- Filter by: role type, AI tools, location, experience level, **minimum salary**
- Salary is required on all posts (no "competitive salary" allowed)
- Job cards: title, company, tools required, salary range (prominent), test format preview
- Click through to detail

### Job Detail `/jobs/[id]`
- Full job description (original upload viewable)
- AI tools required + proficiency level
- **"How You'll Be Tested"** section (prominent)
- Company info sidebar
- Apply button (requires account)

### Talent Listings `/talent`
- Filter by: role type, AI tools, availability, location
- Profile cards: name, headline, tools, availability
- Click through to detail

### Talent Detail `/talent/[id]`
- Full profile: experience, education, AI tools
- Portfolio links
- Resume download (original upload)
- Contact / invite to apply (requires employer account)

---

## Auth Pages

### Sign Up `/signup`
- Choose: "I'm looking for work" or "I'm hiring"
- OAuth options (primary):
  - **Google** - works for everyone
  - **GitHub** - especially relevant for engineers
- Email + password as fallback
- Redirects to profile creation (JSON upload flow)

### Log In `/login`
- OAuth options: Google, GitHub
- Email + password fallback
- Redirects to appropriate dashboard

### Auth Notes
- Supabase handles OAuth out of the box
- GitHub OAuth is on-brand: if you're an engineer on Vibe Jobs, you probably have GitHub
- Google OAuth covers everyone else (product, marketing, sales, employers)
- No friction: one click to sign up, then straight to JSON profile upload

---

## Employee Dashboard

### Dashboard Home `/dashboard`
- Profile completeness indicator
- Application stats: applied, in review, interviews, offers
- Quick actions: edit profile, browse jobs

### Profile Editor `/dashboard/profile`
- View current JSON profile
- Re-upload resume + JSON to update
- Edit AI tools, portfolio links, availability manually

### My Applications `/dashboard/applications`
- List of jobs applied to
- Status: pending, reviewed, interviewing, rejected, offer
- Click through to job detail

### API/MCP Settings `/dashboard/mcp`
- View current API token (masked)
- Generate new token
- Refresh/revoke token
- Link to MCP docs

---

## Employer Dashboard

### Dashboard Home `/company`
- Active job count
- Total applicants
- Quick actions: post job, view applicants

### Company Profile `/company/profile`
- Company name, description, logo
- AI culture badge (encouraged/expected/required)
- Tools your team uses

### Manage Jobs `/company/jobs`
- List of posted jobs (active, closed, draft)
- Applicant count per job
- Edit / close / repost actions

### Post New Job `/company/jobs/new`
- Upload job description + JSON (per employer-upload.md flow)
- Add "How You'll Be Tested"
- Preview and publish

### Edit Job `/company/jobs/[id]/edit`
- Same as post, pre-filled

### View Applicants `/company/jobs/[id]/applicants`
- List of applicants for this job
- Profile preview: name, headline, tools
- Click through to full profile
- Update status: reviewed, interviewing, rejected, offer

### API/MCP Settings `/company/mcp`
- View current API token (masked)
- Generate new token
- Refresh/revoke token
- Link to MCP docs

---

## Utility Pages

### About `/about`
- Why we built this (manifesto)
- Team (optional)

### FAQ/Help `/help`
- How to create profile (JSON parsing instructions)
- How to post a job
- How filtering works

---

## MCP Documentation

### MCP Overview `/docs/mcp`
- What is MCP and why we support it
- "Search for jobs using Claude, ChatGPT, or any LLM"
- Auth requirement explained
- Link to setup guide

### MCP Setup `/docs/mcp/setup`
- Step 1: Sign up / log in
- Step 2: Generate your API token
- Step 3: Add to your MCP config (with copy-paste examples)
- Supported clients: Claude Desktop, etc.

### MCP for Job Seekers `/docs/mcp/job-seekers`
- Available commands: search jobs, view job, apply, check status
- Example prompts and usage

### MCP for Employers `/docs/mcp/employers`
- Available commands: search talent, view profile, post job, view applicants
- Example prompts and usage
