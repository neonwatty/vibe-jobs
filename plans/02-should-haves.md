# Should-Haves - Important Pre-Launch Features

## Overview

These features are not strictly blocking but significantly improve user experience and conversion. Complete these before major marketing pushes.

**Priority:** P1 - Complete before scaling user acquisition

---

## 1. Enhanced Profile Completeness System

### Current State
- Basic profile editor exists
- No clear completeness indicator beyond simple checks
- Users don't know what they're missing

### Proposed Enhancement

**Profile Completeness Score (0-100%)**

```typescript
interface ProfileCompletenessConfig {
  // Required fields (must have for profile to be "complete")
  required: {
    first_name: 10,
    last_name: 10,
    email: 10,
    location: 5,
    role_type: 10,
    availability: 5,
  },
  // Recommended fields (improve profile quality)
  recommended: {
    experience: 15,        // At least 1 experience entry
    education: 5,          // At least 1 education entry
    ai_tools: 15,          // At least 3 tools selected
    portfolio_urls: 10,    // At least 1 portfolio link
    linkedin_url: 5,       // LinkedIn profile
  }
}
```

**UI Components:**

```
┌─────────────────────────────────────────────────────────────┐
│  Profile Completeness                                        │
│  ─────────────────────────────────────────────────────────── │
│  [████████████░░░░░░░░] 65%                                  │
│                                                              │
│  ✓ Basic info complete                                       │
│  ✓ Added 2 AI tools                                          │
│  ○ Add at least 3 more AI tools (+15%)                       │
│  ○ Add a portfolio link (+10%)                               │
│  ○ Connect your LinkedIn (+5%)                               │
│                                                              │
│  [Complete Profile]                                          │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**

1. Create `src/lib/profile-completeness.ts`:
```typescript
export function calculateProfileCompleteness(profile: Profile): {
  score: number;
  completed: string[];
  missing: { field: string; points: number; message: string }[];
}
```

2. Create `src/components/dashboard/ProfileCompleteness.tsx`
   - Visual progress bar
   - Checklist of missing items
   - CTA buttons for each missing item

3. Add to dashboard and profile pages

**Files to Create/Modify:**
- `src/lib/profile-completeness.ts` (new)
- `src/components/dashboard/ProfileCompleteness.tsx` (new)
- `src/app/dashboard/page.tsx` (add component)
- `src/app/dashboard/profile/page.tsx` (add component)

---

## 2. Advanced Job Matching Algorithm

### Current State
- Simple tool overlap calculation exists
- Match percentage shown on job cards
- Basic implementation

### Proposed Enhancement

**Multi-Factor Matching Score**

```typescript
interface MatchScore {
  overall: number;           // 0-100 weighted average
  breakdown: {
    tools: number;           // AI tool overlap (40% weight)
    role: number;            // Role type match (25% weight)
    experience: number;      // Experience level fit (20% weight)
    location: number;        // Location compatibility (15% weight)
  };
  flags: {
    perfectToolMatch: boolean;
    overqualified: boolean;
    underqualified: boolean;
    remoteCompatible: boolean;
  };
}
```

**Matching Logic:**

```typescript
// Tool matching (40% of score)
function calculateToolMatch(userTools: string[], jobTools: string[]): number {
  if (jobTools.length === 0) return 100;

  const matched = userTools.filter(t =>
    jobTools.some(jt => normalizeToolName(t) === normalizeToolName(jt))
  );

  const matchRate = matched.length / jobTools.length;

  // Bonus for having all required tools
  if (matchRate >= 1.0) return 100;
  if (matchRate >= 0.75) return 85;
  if (matchRate >= 0.5) return 70;
  if (matchRate >= 0.25) return 50;
  return 30;
}

// Experience matching (20% of score)
function calculateExperienceMatch(
  userExperience: Experience[],
  jobLevel: 'entry' | 'mid' | 'senior' | 'lead'
): number {
  const yearsOfExperience = calculateYearsFromExperience(userExperience);

  const levelRanges = {
    entry: [0, 2],
    mid: [2, 5],
    senior: [5, 10],
    lead: [8, 99],
  };

  const [min, max] = levelRanges[jobLevel];

  if (yearsOfExperience >= min && yearsOfExperience <= max) return 100;
  if (yearsOfExperience < min) return 60; // Underqualified
  return 80; // Overqualified (still good, just flag it)
}
```

**UI Enhancements:**

```
┌─────────────────────────────────────────────────────────────┐
│  Job Card with Enhanced Matching                             │
│  ─────────────────────────────────────────────────────────── │
│  Senior Frontend Engineer                                    │
│  Acme Corp · Remote · $150k-$180k                            │
│                                                              │
│  [85% Match]                                                 │
│  ─────────────────────                                       │
│  Tools: ████████░░ 80%  (Cursor, Claude matched)             │
│  Role:  ██████████ 100% (Engineer)                           │
│  Level: ████████░░ 75%  (You have 4 yrs, seeking 5+)         │
│                                                              │
│  [View Job]                                                  │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**

1. Create `src/lib/job-matching.ts`:
   - Multi-factor scoring
   - Tool name normalization (e.g., "Cursor" = "cursor" = "Cursor AI")
   - Experience year calculation

2. Update `src/components/jobs/JobCard.tsx`:
   - Show match breakdown on hover/expand
   - Add match explanation tooltip

3. Add match sorting option to job list

**Files to Create/Modify:**
- `src/lib/job-matching.ts` (new)
- `src/components/jobs/JobCard.tsx` (enhance)
- `src/components/jobs/MatchBreakdown.tsx` (new)
- `src/app/jobs/page.tsx` (add sort by match)

---

## 3. Employer Candidate View Enhancement

### Current State
- Employers can see applicants for their jobs
- Basic profile preview in applicant list
- Limited candidate browsing in `/talent`

### Proposed Enhancement

**Full Candidate Profile View**

```
┌─────────────────────────────────────────────────────────────┐
│  Candidate Profile (Employer View)                           │
│  ─────────────────────────────────────────────────────────── │
│  ┌──────┐  Sarah Chen                                        │
│  │ Photo│  Senior Software Engineer                          │
│  └──────┘  San Francisco, CA · Actively Looking              │
│                                                              │
│  [Download Resume]  [Contact]  [Invite to Apply]             │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  AI Tools                                                    │
│  [Cursor] [Claude] [GitHub Copilot] [ChatGPT]                │
│                                                              │
│  Experience                                                  │
│  ● Senior Engineer at Stripe (2021-Present)                  │
│    Led payments infrastructure team...                       │
│  ● Software Engineer at Airbnb (2018-2021)                   │
│    Built search ranking systems...                           │
│                                                              │
│  Education                                                   │
│  ● BS Computer Science, Stanford (2018)                      │
│                                                              │
│  Portfolio                                                   │
│  [github.com/sarahchen] [sarahchen.dev]                      │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Match with Your Jobs                                        │
│  ● Senior Frontend Engineer: 92% match                       │
│  ● Staff Engineer: 78% match                                 │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  [Invite to Apply for Senior Frontend Engineer]              │
└─────────────────────────────────────────────────────────────┘
```

**Features:**

1. **Resume Download**
   - Download original uploaded resume
   - Track download for analytics

2. **Contact/Message** (Future)
   - Simple contact form or email reveal
   - Track contacts for analytics

3. **Invite to Apply**
   - Employer can invite candidate to specific job
   - Candidate gets notification
   - Higher conversion than cold outreach

4. **Match Analysis**
   - Show how candidate matches each of employer's open jobs
   - Help employers route candidates to right roles

**Implementation:**

1. Create `/talent/[id]/page.tsx` for public talent profiles
2. Create `/company/talent/[id]/page.tsx` for employer-enhanced view
3. Add resume download API endpoint
4. Add invite-to-apply functionality

**Files to Create/Modify:**
- `src/app/talent/[id]/page.tsx` (new - public profile)
- `src/app/company/talent/[id]/page.tsx` (new - employer view)
- `src/app/api/profiles/[id]/resume/route.ts` (new - resume download)
- `src/components/talent/CandidateProfile.tsx` (new)
- `src/components/talent/InviteToApply.tsx` (new)

---

## 4. Saved Searches & Job Alerts

### Current State
- Users can save individual jobs
- No saved search functionality
- No email alerts for new jobs

### Proposed Enhancement

**Saved Searches**

```typescript
interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  filters: {
    role_type?: string[];
    ai_tools?: string[];
    location_type?: string[];
    experience_level?: string[];
    salary_min?: number;
  };
  alert_frequency: 'daily' | 'weekly' | 'none';
  created_at: string;
  last_alerted_at: string;
}
```

**UI Flow:**

```
┌─────────────────────────────────────────────────────────────┐
│  Jobs Filter Panel                                           │
│  ─────────────────────────────────────────────────────────── │
│  Role: [Engineer ▼]                                          │
│  Tools: [Cursor] [Claude] [+]                                │
│  Location: [Remote ▼]                                        │
│  Salary: [$120k+]                                            │
│                                                              │
│  Showing 24 jobs                                             │
│                                                              │
│  [Save This Search]  [Get Alerts]                            │
└─────────────────────────────────────────────────────────────┘
```

**Save Search Modal:**
```
┌─────────────────────────────────────────────────────────────┐
│  Save Search                                                 │
│  ─────────────────────────────────────────────────────────── │
│  Name: [Remote Engineer Jobs with Cursor          ]          │
│                                                              │
│  Get email alerts?                                           │
│  ○ Daily - New jobs every morning                            │
│  ○ Weekly - Digest every Monday                              │
│  ○ No alerts - Just save for later                           │
│                                                              │
│  [Cancel]  [Save Search]                                     │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**

1. Add `saved_searches` table to database
2. Create save search UI in job filters
3. Create saved searches list in dashboard
4. Set up background job for email alerts (can use Vercel cron)

**Files to Create/Modify:**
- `supabase/migrations/xxx_add_saved_searches.sql` (new)
- `src/lib/database.types.ts` (update)
- `src/components/jobs/SaveSearchButton.tsx` (new)
- `src/components/jobs/SaveSearchModal.tsx` (new)
- `src/app/dashboard/searches/page.tsx` (new)
- `src/app/api/cron/job-alerts/route.ts` (new - for email alerts)

---

## 5. Application Notes & Status History

### Current State
- Employers can change application status
- No way to add notes about candidates
- No history of status changes

### Proposed Enhancement

**Application Notes System**

```typescript
interface ApplicationNote {
  id: string;
  application_id: string;
  author_id: string;  // Employer user who wrote note
  content: string;
  created_at: string;
}

interface ApplicationStatusChange {
  id: string;
  application_id: string;
  from_status: string;
  to_status: string;
  changed_by: string;
  note?: string;
  created_at: string;
}
```

**UI:**

```
┌─────────────────────────────────────────────────────────────┐
│  Application: Sarah Chen → Senior Engineer                   │
│  ─────────────────────────────────────────────────────────── │
│  Status: [Interviewing ▼]                                    │
│                                                              │
│  Timeline                                                    │
│  ─────────────────────────────────────────────────────────── │
│  Jan 14 · Moved to Interviewing                              │
│           "Great first call, scheduling technical"           │
│                                                              │
│  Jan 12 · Moved to Reviewed                                  │
│           "Strong Cursor experience, good culture fit"       │
│                                                              │
│  Jan 10 · Applied                                            │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Add Note                                                    │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Write a note about this candidate...               │     │
│  └─────────────────────────────────────────────────────┘     │
│  [Add Note]                                                  │
└─────────────────────────────────────────────────────────────┘
```

**Implementation:**

1. Add `application_notes` and `application_status_changes` tables
2. Create timeline component
3. Auto-log status changes
4. Add note input

**Files to Create/Modify:**
- `supabase/migrations/xxx_add_application_notes.sql` (new)
- `src/components/applications/ApplicationTimeline.tsx` (new)
- `src/components/applications/AddNoteForm.tsx` (new)
- `src/app/company/jobs/[id]/applications/page.tsx` (update)

---

## Implementation Order

1. **Profile Completeness** (2 hours)
   - High impact on profile quality
   - Simple implementation

2. **Advanced Matching** (2-3 hours)
   - Improves job recommendations
   - Better user experience

3. **Application Notes** (2 hours)
   - Critical for employer workflow
   - Improves hiring process

4. **Candidate Profile View** (3 hours)
   - Enables employer talent browsing
   - Required for invite-to-apply

5. **Saved Searches** (3-4 hours)
   - Nice engagement feature
   - Email alerts need cron setup

**Total estimated effort:** 12-14 hours

---

## Success Criteria

- [ ] Profile completeness shows accurate score with actionable items
- [ ] Job matching explains why jobs are matched
- [ ] Employers can view full candidate profiles
- [ ] Employers can add notes to applications
- [ ] Status changes are logged with history
- [ ] (Optional) Saved searches work with email alerts

---

## Database Schema Additions

```sql
-- Profile completeness (no new tables, just logic)

-- Application notes
CREATE TABLE application_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application status changes (audit log)
CREATE TABLE application_status_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved searches
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  alert_frequency TEXT DEFAULT 'none',
  last_alerted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```
