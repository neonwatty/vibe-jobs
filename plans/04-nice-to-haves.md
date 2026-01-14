# Nice-to-Haves - Post-Launch Enhancements

## Overview

These features improve user experience and growth but are not blocking for initial launch. Implement after core functionality is proven and you have initial users.

**Priority:** P2 - Post-launch, as resources allow

---

## 1. Role-Specific Landing Pages

### Purpose
SEO optimization and targeted messaging for specific roles. These pages help capture search traffic and speak directly to user segments.

### Pages to Create

**For Job Seekers:**
- `/for/engineers` - "No LeetCode. No whiteboard. Just build."
- `/for/product` - "No hypotheticals. Just make something real."
- `/for/marketers` - "Marketing roles where AI fluency is valued."
- `/for/designers` - "Design roles that embrace AI tools."

**For Employers:**
- `/hire/engineers` - "Hire engineers who ship with AI."
- `/hire/product` - "Hire product people who use AI daily."
- `/hire/marketers` - "Hire marketers fluent in AI tools."

### Content Structure (Example: `/for/engineers`)

```
┌─────────────────────────────────────────────────────────────┐
│  HERO                                                        │
│  ─────────────────────────────────────────────────────────── │
│  Headline: "No LeetCode. No whiteboard. Just build."         │
│                                                              │
│  Subhead: "Find engineering jobs where Cursor isn't          │
│           cheating - it's expected. Your interviewer will    │
│           watch you use Claude. That's the test."            │
│                                                              │
│  [Browse Engineering Jobs]                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  THE PROBLEM (Confrontational)                               │
│  ─────────────────────────────────────────────────────────── │
│  "You've spent 200 hours on LeetCode.                        │
│   Memorizing algorithms you'll never use.                    │
│   Pretending you don't know what a binary tree is.           │
│                                                              │
│   Meanwhile, you ship production code with Cursor daily.     │
│   But that's 'cheating.'                                     │
│                                                              │
│   We think that's absurd."                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  HOW VIBE JOBS IS DIFFERENT                                  │
│  ─────────────────────────────────────────────────────────── │
│  1. Every job shows "How You'll Be Tested"                   │
│     Real builds, pair programming with AI, take-homes.       │
│     Never "implement quicksort on a whiteboard."             │
│                                                              │
│  2. Filter by the tools you actually use                     │
│     Cursor, Claude, Copilot, ChatGPT.                        │
│     Find jobs that want your workflow.                       │
│                                                              │
│  3. Companies that get it                                    │
│     Verified AI-forward employers.                           │
│     They want to see how you really work.                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  SAMPLE ENGINEERING JOBS (Live data)                         │
│  ─────────────────────────────────────────────────────────── │
│  [JobCard - filtered to role=engineer]                       │
│  [JobCard - filtered to role=engineer]                       │
│  [JobCard - filtered to role=engineer]                       │
│                                                              │
│  [View All Engineering Jobs →]                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  TESTIMONIALS (When available)                               │
│  ─────────────────────────────────────────────────────────── │
│  "Finally, an interview where I could use my actual tools.   │
│   Got the job in 2 weeks."                                   │
│   - Sarah, Senior Engineer at [Company]                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  CTA                                                         │
│  ─────────────────────────────────────────────────────────── │
│  "Ready to find jobs that want your AI skills?"              │
│                                                              │
│  [Create Your Profile]  [Browse Jobs]                        │
└─────────────────────────────────────────────────────────────┘
```

### SEO Strategy

**Target Keywords:**
- `/for/engineers`: "AI engineer jobs", "no leetcode jobs", "cursor developer jobs"
- `/for/product`: "AI product manager jobs", "PM jobs using AI"
- `/hire/engineers`: "hire AI developers", "hire cursor developers"

**Meta Tags:**
```tsx
export const metadata: Metadata = {
  title: 'Engineering Jobs That Embrace AI Tools | Vibe Jobs',
  description: 'Find engineering jobs where Cursor, Claude, and Copilot are expected, not forbidden. No LeetCode, no whiteboard interviews.',
  keywords: ['AI engineer jobs', 'cursor developer jobs', 'no leetcode jobs'],
};
```

### Implementation

**Shared Components:**
- `src/components/landing/RoleLandingPage.tsx` - Reusable template
- `src/components/landing/ProblemSection.tsx` - The confrontational section
- `src/components/landing/TestimonialCard.tsx` - For future testimonials

**Pages:**
- `src/app/for/engineers/page.tsx`
- `src/app/for/product/page.tsx`
- `src/app/hire/engineers/page.tsx`
- `src/app/hire/product/page.tsx`

**Effort:** 4-6 hours (reusable template + content variations)

---

## 2. Referral System

### Purpose
Incentivize users to invite others. Job seekers can refer friends; employers can refer other companies.

### How It Works

**For Job Seekers:**
- Get a unique referral link
- When someone signs up with your link and completes a profile, you both get credit
- Credits could unlock:
  - Priority visibility to employers
  - "Referred" badge on profile
  - Future: Premium features

**For Employers:**
- Refer other companies
- When referred company posts their first job, you both get credit
- Credits could unlock:
  - Featured job placement
  - Extended job visibility
  - Future: Premium features

### Database Schema

```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES auth.users(id),
  referred_id UUID REFERENCES auth.users(id),
  referral_code TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, completed, expired
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Add referral_code to users
ALTER TABLE users ADD COLUMN referral_code TEXT UNIQUE;
ALTER TABLE users ADD COLUMN referred_by UUID REFERENCES auth.users(id);
ALTER TABLE users ADD COLUMN referral_credits INTEGER DEFAULT 0;
```

### UI Components

**Referral Dashboard (Employee):**
```
┌─────────────────────────────────────────────────────────────┐
│  Invite Friends                                              │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Your referral link:                                         │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ https://vibejobs.co/r/sarah-abc123                  │     │
│  └─────────────────────────────────────────────────────┘     │
│  [Copy Link]  [Share on Twitter]  [Share on LinkedIn]        │
│                                                              │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Your Referrals                          Credits: 3          │
│  ─────────────────────────────────────────────────────────── │
│  ✓ John D. signed up and completed profile                   │
│  ✓ Maria S. signed up and completed profile                  │
│  ✓ Alex K. signed up and completed profile                   │
│  ○ Pending: 2 signups haven't completed profiles yet         │
│                                                              │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  What credits get you:                                       │
│  • Priority visibility to employers                          │
│  • "Active Referrer" badge on your profile                   │
│  • Early access to new features                              │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Steps

1. Add referral tables and user columns
2. Generate referral codes on signup
3. Track referral source on new signups
4. Create referral dashboard page
5. Add social sharing buttons
6. Implement credit system

**Effort:** 6-8 hours

---

## 3. Company Verification Badges

### Purpose
Build trust by verifying company legitimacy. Shows job seekers that employers are real.

### Verification Levels

| Level | Badge | Requirement | How to Verify |
|-------|-------|-------------|---------------|
| Basic | ✓ | Email domain matches company | Automatic |
| Verified | ✓✓ | Domain ownership confirmed | DNS TXT record |
| Premium | ★ | Manual review + LinkedIn/Crunchbase | Admin review |

### Domain Verification Flow

```
┌─────────────────────────────────────────────────────────────┐
│  Company Verification                                        │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Current Status: [Email Verified ✓]                          │
│                                                              │
│  Upgrade to Domain Verified                                  │
│  ─────────────────────────────────────────────────────────── │
│  Add this TXT record to your DNS:                            │
│                                                              │
│  Host: @                                                     │
│  Type: TXT                                                   │
│  Value: vibejobs-verify=abc123xyz                            │
│                                                              │
│  [Verify Domain]                                             │
│                                                              │
│  Benefits of Domain Verification:                            │
│  • "Verified Employer" badge on all job posts                │
│  • Higher visibility in search results                       │
│  • Increased trust from candidates                           │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
ALTER TABLE companies ADD COLUMN verification_level TEXT DEFAULT 'basic';
ALTER TABLE companies ADD COLUMN verification_token TEXT;
ALTER TABLE companies ADD COLUMN verified_at TIMESTAMPTZ;
```

### Implementation

1. Auto-verify email domain on company creation
2. Add DNS verification flow
3. Create verification badge component
4. Show badge on job cards and company profiles
5. (Future) Admin panel for manual premium verification

**Effort:** 4-6 hours

---

## 4. Analytics Dashboard Enhancements

### Current State
- Basic analytics exist for employers
- Application counts, charts

### Enhancements

**For Employers:**

```
┌─────────────────────────────────────────────────────────────┐
│  Hiring Analytics                                            │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Funnel Performance                                          │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ Applied: 100 ─▶ Reviewed: 45 ─▶ Interview: 12 ─▶ Offer: 3│
│  │           ↓          ↓            ↓                      │
│  │         55%        27%          25%         Conv: 3%     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
│  Source Attribution                                          │
│  • Direct: 40%                                               │
│  • MCP: 25%                                                  │
│  • Referral: 20%                                             │
│  • Social: 15%                                               │
│                                                              │
│  Time to Hire (Avg)                                          │
│  • Senior Engineer: 18 days                                  │
│  • Product Manager: 12 days                                  │
│                                                              │
│  Top Performing Job Posts                                    │
│  1. Senior Engineer - 45 apps, 3 offers                      │
│  2. Product Manager - 28 apps, 2 offers                      │
└─────────────────────────────────────────────────────────────┘
```

**For Job Seekers:**

```
┌─────────────────────────────────────────────────────────────┐
│  Your Job Search Stats                                       │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  Profile Views: 47 this week (+12%)                          │
│  Applications: 15 total                                      │
│  Response Rate: 40%                                          │
│  Average Response Time: 3 days                               │
│                                                              │
│  Your Profile Visibility                                     │
│  [████████░░] 80%                                            │
│  "Add portfolio links to increase visibility"                │
│                                                              │
│  Companies Viewing You                                       │
│  • [Company 1] viewed your profile                           │
│  • [Company 2] viewed your profile                           │
│  (Upgrade for full list)                                     │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

1. Track profile views
2. Add source attribution to applications
3. Calculate funnel metrics
4. Build enhanced analytics components
5. Add to dashboards

**Effort:** 8-10 hours

---

## 5. Social Sharing & Public Profiles

### Purpose
Enable users to share their profiles and job posts on social media. Drives organic growth.

### Public Profile URLs

- Job Seekers: `vibejobs.co/u/sarah-chen`
- Companies: `vibejobs.co/c/acme-corp`
- Jobs: `vibejobs.co/j/senior-engineer-acme` (already exists at /jobs/[id])

### Open Graph Tags

```tsx
// For profile sharing
export async function generateMetadata({ params }): Promise<Metadata> {
  const profile = await getProfile(params.username);

  return {
    title: `${profile.name} | Vibe Jobs`,
    description: `${profile.headline} • Uses ${profile.ai_tools.slice(0, 3).join(', ')}`,
    openGraph: {
      title: `${profile.name} on Vibe Jobs`,
      description: profile.headline,
      type: 'profile',
      images: [{ url: profile.avatar_url || '/default-og.png' }],
    },
    twitter: {
      card: 'summary',
      title: `${profile.name} | Vibe Jobs`,
    },
  };
}
```

### Share Buttons

```
┌─────────────────────────────────────────────────────────────┐
│  Share Your Profile                                          │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  [Share on Twitter] [Share on LinkedIn] [Copy Link]          │
│                                                              │
│  Your public profile: vibejobs.co/u/sarah-chen               │
└─────────────────────────────────────────────────────────────┘
```

### Implementation

1. Add username slugs to profiles
2. Create public profile pages
3. Add Open Graph metadata
4. Create share button component
5. Add to profiles and job pages

**Effort:** 4-6 hours

---

## 6. Keyboard Shortcuts & Power User Features

### Purpose
Make the platform faster for power users. Particularly valued by developer audience.

### Shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search |
| `j/k` | Navigate job list up/down |
| `o` | Open selected job |
| `a` | Apply to current job |
| `s` | Save current job |
| `Esc` | Close modal / go back |
| `?` | Show shortcuts help |

### Implementation

```tsx
// src/hooks/useKeyboardShortcuts.ts
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case '/':
          e.preventDefault();
          document.getElementById('search-input')?.focus();
          break;
        case 'j':
          // Navigate down
          break;
        case 'k':
          // Navigate up
          break;
        case '?':
          // Show shortcuts modal
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
```

**Effort:** 2-3 hours

---

## 7. Dark Mode

### Purpose
Many developers prefer dark mode. Shows attention to developer experience.

### Implementation

Already using Tailwind, so dark mode is straightforward:

```tsx
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system preference
  // ...
}

// Add dark: variants to components
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">...</h1>
</div>

// Theme toggle component
function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
```

**Effort:** 4-6 hours (depending on component count)

---

## Implementation Priority

| Feature | Effort | Impact | Priority |
|---------|--------|--------|----------|
| Role-specific landing pages | 4-6h | High (SEO) | 1 |
| Company verification badges | 4-6h | Medium (Trust) | 2 |
| Social sharing / OG tags | 4-6h | Medium (Growth) | 3 |
| Referral system | 6-8h | Medium (Growth) | 4 |
| Dark mode | 4-6h | Low (UX) | 5 |
| Analytics enhancements | 8-10h | Medium (Retention) | 6 |
| Keyboard shortcuts | 2-3h | Low (UX) | 7 |

**Total estimated effort:** 32-45 hours

---

## Future Considerations (Not Planned)

- Mobile app (React Native)
- Slack integration for notifications
- Interview scheduling integration (Calendly)
- Skills assessments / coding challenges
- Company reviews (Glassdoor-style)
- Salary data / compensation benchmarks
- Job board API for aggregators
