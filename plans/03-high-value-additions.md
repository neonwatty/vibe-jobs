# High-Value Additions - Differentiating Features

## Overview

These features provide significant competitive differentiation. MCP integration is particularly unique - no other job board offers LLM-native job search.

**Priority:** P1 - High impact on user acquisition and retention

---

## 1. MCP (Model Context Protocol) Integration

### What is MCP?
MCP allows AI assistants (Claude, ChatGPT via plugins, etc.) to interact with external services. For Vibe Jobs, this means users could:
- Search for jobs from within Claude Desktop
- Apply to jobs via conversation
- Check application status
- Employers could search talent, post jobs, etc.

### Why This Matters
- **Unique differentiator** - No other job board has this
- **On-brand** - We're the AI-native job board, our users live in AI tools
- **Viral potential** - "I found my job by asking Claude" is a great story
- **Reduces friction** - No context switching

---

### MCP Server Architecture

**Directory Structure:**
```
vibe-jobs-mcp/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── auth.ts               # Token validation
│   ├── tools/
│   │   ├── jobs.ts           # Job search/view tools
│   │   ├── applications.ts   # Apply/status tools
│   │   ├── profile.ts        # Profile management
│   │   └── employer.ts       # Employer-specific tools
│   ├── resources/
│   │   ├── job-listings.ts   # Job resources
│   │   └── applications.ts   # Application resources
│   └── types.ts
└── README.md
```

**Note:** MCP server can be a separate package or integrated into the main app. Recommend separate package for cleaner deployment.

---

### MCP Tools Specification

#### For Job Seekers

**`search_jobs`**
```typescript
{
  name: "search_jobs",
  description: "Search for jobs on Vibe Jobs. Returns matching job listings.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Search query (e.g., 'senior engineer cursor')"
      },
      role_type: {
        type: "string",
        enum: ["engineer", "product", "marketer", "sales", "ops", "other"]
      },
      ai_tools: {
        type: "array",
        items: { type: "string" },
        description: "Filter by required AI tools"
      },
      location_type: {
        type: "string",
        enum: ["remote", "hybrid", "onsite"]
      },
      salary_min: {
        type: "number",
        description: "Minimum salary filter"
      },
      limit: {
        type: "number",
        default: 10,
        maximum: 25
      }
    }
  }
}
```

**`view_job`**
```typescript
{
  name: "view_job",
  description: "Get full details of a specific job listing.",
  inputSchema: {
    type: "object",
    properties: {
      job_id: { type: "string", required: true }
    }
  }
}
```

**`apply_to_job`**
```typescript
{
  name: "apply_to_job",
  description: "Apply to a job using your Vibe Jobs profile.",
  inputSchema: {
    type: "object",
    properties: {
      job_id: { type: "string", required: true },
      cover_message: {
        type: "string",
        description: "Optional message to include with application"
      }
    }
  }
}
```

**`my_applications`**
```typescript
{
  name: "my_applications",
  description: "View your job applications and their status.",
  inputSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["all", "pending", "reviewed", "interviewing", "offer", "rejected"]
      }
    }
  }
}
```

**`my_profile`**
```typescript
{
  name: "my_profile",
  description: "View or update your Vibe Jobs profile.",
  inputSchema: {
    type: "object",
    properties: {
      action: {
        type: "string",
        enum: ["view", "update"]
      },
      updates: {
        type: "object",
        description: "Fields to update (if action is 'update')"
      }
    }
  }
}
```

#### For Employers

**`search_talent`**
```typescript
{
  name: "search_talent",
  description: "Search for candidates on Vibe Jobs.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" },
      role_type: { type: "string" },
      ai_tools: { type: "array", items: { type: "string" } },
      availability: {
        type: "string",
        enum: ["actively_looking", "open", "not_looking"]
      },
      limit: { type: "number", default: 10 }
    }
  }
}
```

**`my_job_postings`**
```typescript
{
  name: "my_job_postings",
  description: "View your company's job postings.",
  inputSchema: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["all", "active", "draft", "paused", "closed"]
      }
    }
  }
}
```

**`view_applicants`**
```typescript
{
  name: "view_applicants",
  description: "View applicants for a specific job posting.",
  inputSchema: {
    type: "object",
    properties: {
      job_id: { type: "string", required: true },
      status: { type: "string" }
    }
  }
}
```

**`update_application_status`**
```typescript
{
  name: "update_application_status",
  description: "Update the status of a job application.",
  inputSchema: {
    type: "object",
    properties: {
      application_id: { type: "string", required: true },
      status: {
        type: "string",
        enum: ["pending", "reviewed", "interviewing", "offer", "rejected"],
        required: true
      },
      note: { type: "string" }
    }
  }
}
```

---

### API Token System

**Token Generation Flow:**

```
┌─────────────────────────────────────────────────────────────┐
│  MCP Settings (/dashboard/mcp or /company/mcp)              │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Your API Token                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ vj_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx                  │ [👁] │
│  └─────────────────────────────────────────────────────┘     │
│  [Copy Token]  [Regenerate]                                  │
│                                                              │
│  ⚠️  Keep this token secret. It provides full access to     │
│     your account via MCP.                                    │
│                                                              │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Quick Setup (Claude Desktop)                                │
│                                                              │
│  1. Open Claude Desktop settings                             │
│  2. Go to "MCP Servers"                                      │
│  3. Add this configuration:                                  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ {                                                   │     │
│  │   "mcpServers": {                                   │     │
│  │     "vibe-jobs": {                                  │     │
│  │       "command": "npx",                             │     │
│  │       "args": ["-y", "@vibejobs/mcp"],              │     │
│  │       "env": {                                      │     │
│  │         "VIBEJOBS_API_TOKEN": "vj_sk_xxx..."        │     │
│  │       }                                             │     │
│  │     }                                               │     │
│  │   }                                                 │     │
│  │ }                                                   │     │
│  └─────────────────────────────────────────────────────┘     │
│  [Copy Configuration]                                        │
│                                                              │
│  [View Full Documentation →]                                 │
└─────────────────────────────────────────────────────────────┘
```

**Token Database Schema:**

```sql
-- API tokens table
CREATE TABLE api_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  token_hash TEXT NOT NULL,  -- Store hashed, not plaintext
  token_prefix TEXT NOT NULL, -- e.g., "vj_sk_abc..." for display
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  revoked_at TIMESTAMPTZ
);

-- Index for fast lookup
CREATE INDEX idx_api_tokens_hash ON api_tokens(token_hash);
```

**Token Generation:**
```typescript
import { createHash, randomBytes } from 'crypto';

function generateApiToken(): { token: string; hash: string; prefix: string } {
  const token = `vj_sk_${randomBytes(32).toString('hex')}`;
  const hash = createHash('sha256').update(token).digest('hex');
  const prefix = token.substring(0, 12) + '...';

  return { token, hash, prefix };
}

function verifyApiToken(token: string, hash: string): boolean {
  const inputHash = createHash('sha256').update(token).digest('hex');
  return inputHash === hash;
}
```

---

### MCP API Endpoints

The MCP server will call these API endpoints:

```
POST /api/mcp/jobs/search
POST /api/mcp/jobs/:id
POST /api/mcp/applications
POST /api/mcp/applications/:id
POST /api/mcp/profile
POST /api/mcp/talent/search
POST /api/mcp/employer/jobs
POST /api/mcp/employer/applicants/:jobId
```

All endpoints require `Authorization: Bearer <token>` header.

---

### Implementation Steps

1. **Database Setup** (30 min)
   - Add `api_tokens` table
   - Add token generation/verification utilities

2. **Token Management UI** (2 hours)
   - Update `/dashboard/mcp` page
   - Update `/company/mcp` page
   - Add copy-to-clipboard, regenerate, reveal functionality

3. **MCP API Endpoints** (3 hours)
   - Create `/api/mcp/*` routes
   - Add token authentication middleware
   - Implement all tool endpoints

4. **MCP Server Package** (4 hours)
   - Create `@vibejobs/mcp` package
   - Implement all tools
   - Handle auth flow
   - Test with Claude Desktop

5. **Documentation** (2 hours)
   - Create `/docs/mcp` pages
   - Setup guide with screenshots
   - Example prompts and usage

**Total estimated effort:** 12-15 hours

---

### MCP Documentation Pages

**`/docs/mcp`** - Overview
- What is MCP?
- Why Vibe Jobs supports it
- What you can do with it
- Link to setup guide

**`/docs/mcp/setup`** - Installation
- Step-by-step with screenshots
- Claude Desktop configuration
- Other MCP clients (future)

**`/docs/mcp/job-seekers`** - Commands for Job Seekers
- Example prompts
- Available tools
- Tips and tricks

**`/docs/mcp/employers`** - Commands for Employers
- Example prompts
- Available tools
- Tips and tricks

---

## 2. Email Notification System

### Current State
- Resend is integrated (`src/lib/resend.ts` exists)
- Some email sending may be implemented
- Need to verify end-to-end functionality

### Email Types Needed

#### For Job Seekers

| Trigger | Email | Priority |
|---------|-------|----------|
| New application submitted | "Application received" confirmation | High |
| Application status changed | "Update on your application" | High |
| Invited to apply | "You've been invited to apply" | High |
| New job matches saved search | "New jobs matching your search" | Medium |
| Profile incomplete reminder | "Complete your profile" | Low |

#### For Employers

| Trigger | Email | Priority |
|---------|-------|----------|
| New application received | "New applicant for [Job]" | High |
| Job posted successfully | "Your job is live" | Medium |
| Weekly applicant digest | "This week's applicants" | Medium |

---

### Email Templates

**Application Received (Job Seeker)**
```
Subject: Application submitted to [Company] for [Job Title]

Hi [First Name],

Your application has been submitted!

Job: [Job Title]
Company: [Company Name]
Submitted: [Date]

What's next?
The hiring team will review your application. You'll receive an email
when there's an update.

Track your application:
[View Application Status →]

Good luck!
The Vibe Jobs Team
```

**Application Status Update (Job Seeker)**
```
Subject: Update on your [Job Title] application

Hi [First Name],

There's an update on your application to [Company Name].

Job: [Job Title]
Status: [New Status]

[if status == "interviewing"]
Great news! The team wants to move forward. Check your email for
scheduling details or reach out to the hiring team.
[/if]

[if status == "offer"]
Congratulations! 🎉 You've received an offer. Review the details
with the hiring team.
[/if]

[if status == "rejected"]
Unfortunately, the team has decided to move forward with other
candidates. Don't be discouraged - there are more opportunities
on Vibe Jobs.

[Browse More Jobs →]
[/if]

[View Application →]

The Vibe Jobs Team
```

**New Applicant (Employer)**
```
Subject: New applicant for [Job Title]: [Candidate Name]

Hi [Employer Name],

You have a new applicant for [Job Title]!

Candidate: [Name]
Role: [Role Type]
AI Tools: [Tool 1], [Tool 2], [Tool 3]
Match Score: [X]%

[View Application →]

---
Applicant Summary:
- [X] years of experience
- Currently at [Current Company]
- [Availability]

The Vibe Jobs Team
```

---

### Implementation

**Email Service Architecture:**

```typescript
// src/lib/email/index.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  template,
  data,
}: {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, unknown>;
}) {
  const html = renderTemplate(template, data);

  await resend.emails.send({
    from: 'Vibe Jobs <notifications@vibejobs.co>',
    to,
    subject,
    html,
  });
}

// Email templates
export enum EmailTemplate {
  APPLICATION_RECEIVED = 'application-received',
  APPLICATION_STATUS_UPDATE = 'application-status-update',
  NEW_APPLICANT = 'new-applicant',
  INVITED_TO_APPLY = 'invited-to-apply',
  JOB_POSTED = 'job-posted',
  JOB_ALERTS = 'job-alerts',
}
```

**Email Templates Directory:**
```
src/lib/email/
├── index.ts
├── templates/
│   ├── base.tsx           # Base layout (React Email)
│   ├── application-received.tsx
│   ├── application-status-update.tsx
│   ├── new-applicant.tsx
│   ├── invited-to-apply.tsx
│   ├── job-posted.tsx
│   └── job-alerts.tsx
└── send.ts
```

**Using React Email:**
```typescript
// src/lib/email/templates/application-received.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface ApplicationReceivedProps {
  firstName: string;
  jobTitle: string;
  companyName: string;
  applicationUrl: string;
}

export default function ApplicationReceived({
  firstName,
  jobTitle,
  companyName,
  applicationUrl,
}: ApplicationReceivedProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>Application Submitted!</Text>
          <Text style={paragraph}>Hi {firstName},</Text>
          <Text style={paragraph}>
            Your application to {companyName} for {jobTitle} has been submitted.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={applicationUrl}>
              View Application Status
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>The Vibe Jobs Team</Text>
        </Container>
      </Body>
    </Html>
  );
}
```

---

### Trigger Points

**When to send emails:**

1. **Application submitted** → `src/app/api/applications/route.ts`
   ```typescript
   // After successful application insert
   await sendEmail({
     to: applicant.email,
     subject: `Application submitted to ${company.name}`,
     template: EmailTemplate.APPLICATION_RECEIVED,
     data: { ... }
   });
   ```

2. **Application status changed** → Update the status update logic
   ```typescript
   // After status update
   await sendEmail({
     to: applicant.email,
     subject: `Update on your ${job.title} application`,
     template: EmailTemplate.APPLICATION_STATUS_UPDATE,
     data: { status: newStatus, ... }
   });
   ```

3. **New applicant** → Same trigger as #1
   ```typescript
   // After successful application insert
   await sendEmail({
     to: employer.email,
     subject: `New applicant for ${job.title}`,
     template: EmailTemplate.NEW_APPLICANT,
     data: { ... }
   });
   ```

---

### Email Preferences

**User preferences table:**
```sql
CREATE TABLE email_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  application_updates BOOLEAN DEFAULT true,
  new_applicants BOOLEAN DEFAULT true,
  job_alerts BOOLEAN DEFAULT true,
  marketing BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Preferences UI in settings:**
```
┌─────────────────────────────────────────────────────────────┐
│  Email Preferences                                           │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  [✓] Application updates                                     │
│      Receive emails when your application status changes     │
│                                                              │
│  [✓] Job alerts                                              │
│      Receive emails about new jobs matching your searches    │
│                                                              │
│  [ ] Marketing emails                                        │
│      Occasional updates about Vibe Jobs features             │
│                                                              │
│  [Save Preferences]                                          │
└─────────────────────────────────────────────────────────────┘
```

---

### Implementation Steps

1. **Verify Resend Setup** (30 min)
   - Check environment variables
   - Test send capability
   - Verify domain configuration

2. **Create Email Templates** (3 hours)
   - Install @react-email/components
   - Create base layout
   - Create each template

3. **Add Email Service** (1 hour)
   - Create email sending utility
   - Template rendering
   - Error handling

4. **Wire Up Triggers** (2 hours)
   - Application submitted
   - Status changed
   - New applicant

5. **Email Preferences** (2 hours)
   - Database table
   - Settings UI
   - Check preferences before sending

**Total estimated effort:** 8-10 hours

---

## Success Criteria

### MCP Integration
- [ ] API tokens can be generated and managed
- [ ] MCP server package published to npm
- [ ] Job search works from Claude Desktop
- [ ] Apply to job works from Claude Desktop
- [ ] Documentation is complete and clear

### Email Notifications
- [ ] Application confirmation emails send
- [ ] Status update emails send
- [ ] New applicant emails send to employers
- [ ] Email preferences are respected
- [ ] Unsubscribe links work

---

## Files to Create

### MCP
```
supabase/migrations/xxx_add_api_tokens.sql
src/lib/api-tokens.ts
src/app/dashboard/mcp/page.tsx (update)
src/app/company/mcp/page.tsx (update)
src/app/api/mcp/*/route.ts (multiple)
src/app/docs/mcp/page.tsx
src/app/docs/mcp/setup/page.tsx
src/app/docs/mcp/job-seekers/page.tsx
src/app/docs/mcp/employers/page.tsx

# Separate package
packages/mcp/
├── package.json
├── src/index.ts
├── src/tools/*.ts
└── README.md
```

### Email
```
src/lib/email/index.ts
src/lib/email/send.ts
src/lib/email/templates/base.tsx
src/lib/email/templates/application-received.tsx
src/lib/email/templates/application-status-update.tsx
src/lib/email/templates/new-applicant.tsx
supabase/migrations/xxx_add_email_preferences.sql
src/app/dashboard/settings/page.tsx (or add to profile)
```
