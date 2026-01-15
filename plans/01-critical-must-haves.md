# Critical Must-Haves - Pre-Launch Requirements

## Overview

These features are **blocking for public launch**. Without them, the product lacks the marketing funnel and user education needed to convert visitors.

**Priority:** P0 - Must complete before any public launch or outreach

---

## 1. Landing Pages Hub (`/for/talent` and `/for/employers`)

### Purpose
Route visitors to the right experience and communicate core value proposition clearly.

### `/for/talent` - Job Seeker Hub

**Route:** `/for/talent`
**File:** `src/app/for/talent/page.tsx`

**Content Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                │
│  ─────────────────────────────────────────────────────────── │
│  Headline: "Find jobs where employers want you to use AI."   │
│  Subhead: "No more hiding your tools. No more LeetCode       │
│           theater. Just practical skills with the tools      │
│           you actually use."                                 │
│                                                              │
│  [Browse Jobs]  [Create Profile]                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  VALUE PROPS (3 cards)                                       │
│  ─────────────────────────────────────────────────────────── │
│  1. "Know How You'll Be Tested"                              │
│     Every job shows the exact evaluation format.             │
│     No surprises, no gotchas, no whiteboard tricks.          │
│                                                              │
│  2. "Match on Your AI Toolkit"                               │
│     See your tool overlap percentage instantly.              │
│     Cursor, Claude, Copilot - we filter by what you use.     │
│                                                              │
│  3. "Verified AI-Forward Employers"                          │
│     Companies that actually embrace your workflow.           │
│     Domain-verified with declared AI culture.                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ROLE SELECTOR                                               │
│  ─────────────────────────────────────────────────────────── │
│  "What's your role?"                                         │
│                                                              │
│  [Engineer]          [Product]          [Other]              │
│  Link to /jobs       Link to /jobs      Link to /jobs        │
│  ?role=engineer      ?role=product                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HOW IT WORKS (3 steps)                                      │
│  ─────────────────────────────────────────────────────────── │
│  1. Create your profile                                      │
│     Upload your resume, parse it with AI, done.              │
│                                                              │
│  2. Browse AI-forward jobs                                   │
│     Filter by tools, salary, role. See test formats.         │
│                                                              │
│  3. Apply with one click                                     │
│     Your profile goes straight to the hiring team.           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SAMPLE JOB CARDS (2-3 real/mock jobs)                       │
│  ─────────────────────────────────────────────────────────── │
│  Show actual JobCard components with:                        │
│  - Company name, role, salary                                │
│  - AI tools required                                         │
│  - "How You'll Be Tested" preview                            │
│  - Match percentage badge                                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CTA SECTION                                                 │
│  ─────────────────────────────────────────────────────────── │
│  "Ready to find jobs that want your AI skills?"              │
│                                                              │
│  [Create Profile - It's Free]                                │
└─────────────────────────────────────────────────────────────┘
```

**Components Needed:**
- `src/components/landing/HeroSection.tsx` (reusable)
- `src/components/landing/ValuePropCard.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/RoleSelector.tsx`

**Implementation Steps:**
1. Create shared landing page components
2. Build `/for/talent/page.tsx` using components
3. Add responsive design (mobile-first)
4. Add sample job cards (can be hardcoded initially, or pull from DB)
5. Wire up CTAs to auth/jobs pages

---

### `/for/employers` - Employer Hub

**Route:** `/for/employers`
**File:** `src/app/for/employers/page.tsx`

**Content Structure:**

```
┌─────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                │
│  ─────────────────────────────────────────────────────────── │
│  Headline: "Hire people who already work the way you         │
│            want them to."                                    │
│  Subhead: "Find engineers and product people who ship        │
│           faster with AI. No LeetCode theater required."     │
│                                                              │
│  [Post a Job - Free]  [Browse Talent]                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  VALUE PROPS (3 cards)                                       │
│  ─────────────────────────────────────────────────────────── │
│  1. "Pre-Filtered AI Fluency"                                │
│     Every candidate parsed their own resume with AI.         │
│     That's your first filter, built in.                      │
│                                                              │
│  2. "Define Your Test Format"                                │
│     Tell candidates exactly how you'll evaluate them.        │
│     Attract people who thrive in your interview style.       │
│                                                              │
│  3. "Match on Tools, Not Keywords"                           │
│     Filter by Cursor, Claude, Copilot usage.                 │
│     Find candidates who use what your team uses.             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  WHO'S HIRING HERE                                           │
│  ─────────────────────────────────────────────────────────── │
│  "Join AI-forward companies already on Vibe Jobs"            │
│                                                              │
│  [Company logos or placeholder]                              │
│  (Can be empty initially: "Be the first to post")            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HOW IT WORKS (3 steps)                                      │
│  ─────────────────────────────────────────────────────────── │
│  1. Post your job                                            │
│     Upload job description, parse with AI, add test format.  │
│                                                              │
│  2. Define how you'll test                                   │
│     "1-hour live build with AI tools" or your own format.    │
│                                                              │
│  3. Get AI-fluent applicants                                 │
│     Candidates who aren't afraid to use their tools.         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SAMPLE CANDIDATE CARDS (2-3 profiles)                       │
│  ─────────────────────────────────────────────────────────── │
│  Show ProfileCard components with:                           │
│  - Name, headline, role type                                 │
│  - AI tools listed                                           │
│  - Availability badge                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  PRICING SECTION                                             │
│  ─────────────────────────────────────────────────────────── │
│  "Currently free for all employers."                         │
│  "Post unlimited jobs while we're in early access."          │
│                                                              │
│  [Post Your First Job]                                       │
└─────────────────────────────────────────────────────────────┘
```

**Implementation Steps:**
1. Reuse landing components from `/for/talent`
2. Build `/for/employers/page.tsx`
3. Add sample candidate cards (mock or real data)
4. Wire up CTAs to auth/company pages

---

## 2. About/Manifesto Page (`/about`)

### Purpose
Explain the philosophy behind Vibe Jobs. This differentiates us from Indeed/LinkedIn and resonates with our target audience.

**Route:** `/about`
**File:** `src/app/about/page.tsx`

### Content Structure

```markdown
# The Vibe Jobs Manifesto

## The Problem

The way we interview is broken.

If you're an engineer, you've probably spent hundreds of hours grinding
LeetCode. Memorizing algorithms you'll never use. Pretending you don't
know what a binary tree looks like so you can "discover" it on a whiteboard.

If you're in product, you've answered the same hypothetical case study
a dozen times. "How would you prioritize features for a theoretical
product?" As if anyone works that way anymore.

Meanwhile, the tools we actually use every day - Claude, Cursor, ChatGPT,
Copilot - are "cheating." Hide them. Pretend you don't use them.
Prove you can work without them, even though you never do.

**This is absurd.**

## The Reality

The best engineers use AI tools. They ship faster. They write better
code. They focus on the hard problems instead of boilerplate.

The best product people use AI to draft specs, research competitors,
synthesize user feedback, and move faster than ever before.

This isn't cheating. This is how modern work gets done.

## Our Bet

We believe the companies worth working for already know this.

They don't want to watch you struggle without your tools. They want
to see how you work *with* them. They want to know if you can ship -
not if you can memorize solutions to problems that have been solved
a thousand times.

## How Vibe Jobs Works

**For job seekers:**
- Every job shows "How You'll Be Tested" - no surprises
- Filter by the AI tools you actually use
- Find employers who want your AI-augmented workflow

**For employers:**
- Post jobs with transparent test formats
- Attract candidates who aren't hiding their tools
- Every applicant already proved AI fluency by parsing their own resume

## The Name

"Vibe coding" is what people call building with AI. You describe
what you want, iterate with your tools, and ship.

Vibe Jobs is where vibe coders find jobs. Simple as that.

## Join Us

We're early. We're free. We're building the job board for the way
people actually work now.

[Find a Job] [Post a Job]
```

**Design Notes:**
- Long-form content, optimized for reading
- Minimal navigation distractions
- Pull quotes for key statements
- CTAs at the bottom

**Implementation Steps:**
1. Create `src/app/about/page.tsx`
2. Add proper typography/prose styling
3. Add CTAs at bottom
4. Consider adding founder story or team section (optional)

---

## 3. Help/FAQ Page (`/help`)

### Purpose
Answer common questions and provide JSON parsing instructions. This reduces support burden and helps users succeed.

**Route:** `/help`
**File:** `src/app/help/page.tsx`

### Content Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HERO                                                        │
│  ─────────────────────────────────────────────────────────── │
│  "Help Center"                                               │
│  "Everything you need to get started on Vibe Jobs."         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  QUICK LINKS                                                 │
│  ─────────────────────────────────────────────────────────── │
│  [For Job Seekers]  [For Employers]  [JSON Parsing Guide]    │
└─────────────────────────────────────────────────────────────┘

## For Job Seekers

### How do I create a profile?
1. Sign up with Google or GitHub
2. Upload your resume (PDF or DOCX)
3. Use ChatGPT, Claude, or any AI to parse it into our JSON format
4. Paste the JSON and submit

### What's the JSON format?
[Collapsible section with schema and example]

### How do I parse my resume?
**Prompt to use:**
"Parse this resume into the following JSON format: [schema].
Return only valid JSON, no explanation."

[Copy button for prompt]

### How does job matching work?
We calculate a match percentage based on:
- AI tools overlap (your tools vs. required tools)
- Role type match
- Experience level alignment

### What does "How You'll Be Tested" mean?
Every job on Vibe Jobs includes a transparent description of how
you'll be evaluated. No surprise whiteboard questions. No gotchas.

### How do I apply?
Click "Apply" on any job. Your profile is sent directly to the
employer. You can add a cover message if you want.

---

## For Employers

### How do I post a job?
1. Sign up and create your company profile
2. Upload your job description (PDF or DOCX)
3. Parse it into JSON using any AI tool
4. Add your "How You'll Be Tested" section
5. Publish

### What's the job JSON format?
[Collapsible section with schema and example]

### What should I put in "How You'll Be Tested"?
Be specific about your interview process. Examples:
- "1-hour live coding session. Use any tools you want."
- "24-hour take-home project. Build a small feature end-to-end."
- "30-minute portfolio review. Walk us through past work."

### How do I manage applicants?
Go to Company Dashboard → Your Jobs → Click on a job → View Applicants.
You can update status (Pending → Reviewed → Interviewing → Offer/Rejected).

### Is Vibe Jobs free?
Yes, currently free for all employers. Post unlimited jobs while
we're in early access.

---

## JSON Parsing Guide

### The Philosophy
If you can't use an LLM to parse a document, you might not be our
target user. This is intentional - it's a soft filter for AI fluency.

### For Job Seekers

**Step 1:** Copy this prompt:
```
Parse the following resume into this exact JSON format:
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "location": "string",
  "linkedin_url": "string or null",
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
      "year": number
    }
  ],
  "ai_tools": ["array of tool names you use"],
  "portfolio_urls": ["array of URLs"],
  "availability": "actively_looking | open | not_looking",
  "role_type": "engineer | product | marketer | sales | ops | other"
}

Return ONLY valid JSON. No explanation.
```

**Step 2:** Paste your resume after the prompt

**Step 3:** Send to ChatGPT, Claude, or your preferred AI

**Step 4:** Copy the JSON output and paste it into Vibe Jobs

### For Employers

[Similar section with employer JSON schema and prompt]

---

## Still Have Questions?

Email us at hello@vibejobs.co (or appropriate contact)
```

**Components Needed:**
- `src/components/help/FAQAccordion.tsx`
- `src/components/help/CopyableCodeBlock.tsx`
- `src/components/help/JSONSchemaDisplay.tsx`

**Implementation Steps:**
1. Create `src/app/help/page.tsx`
2. Build collapsible FAQ components
3. Add copyable code blocks for JSON schemas and prompts
4. Add anchor links for quick navigation
5. Style for readability

---

## Implementation Order

1. **Shared landing components** (1-2 hours)
   - HeroSection, ValuePropCard, HowItWorks

2. **`/for/talent`** (1 hour)
   - Assemble components, add content

3. **`/for/employers`** (1 hour)
   - Reuse components, customize content

4. **`/about`** (30 min)
   - Mostly content, minimal components

5. **`/help`** (1-2 hours)
   - FAQ accordion, copyable code blocks

**Total estimated effort:** 4-6 hours

---

## Success Criteria

- [ ] `/for/talent` renders with all sections
- [ ] `/for/employers` renders with all sections
- [ ] `/about` manifesto is readable and compelling
- [ ] `/help` has working FAQ accordion and copyable prompts
- [ ] All pages are mobile-responsive
- [ ] CTAs link to correct destinations
- [ ] Navigation includes links to new pages

---

## Future Enhancements (Not Blocking)

- A/B test different headlines
- Add testimonials section (when we have users)
- Add video walkthrough
- Localization for international markets
