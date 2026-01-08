# Browser Workflows - Vibe Jobs

> Auto-generated workflow documentation for Vibe Jobs mockup
> Last updated: 2025-01-08

## Quick Reference

| # | Workflow | Purpose | Steps |
|---|----------|---------|-------|
| 1 | New Visitor Discovery | Landing to role-specific pitch | 6 |
| 2 | Job Seeker Signup & Profile | Full signup + JSON profile wizard | 12 |
| 3 | Employer Signup & Company Setup | OAuth + work email + company profile | 10 |
| 4 | Job Search & Application | Browse, filter, apply to job | 9 |
| 5 | Post a Job | Full 4-step job posting wizard | 14 |
| 6 | Track My Applications | View and filter applications | 6 |
| 7 | Manage Posted Jobs | Edit jobs, change status | 8 |
| 8 | Review Applicants | Filter, update status, view profiles | 10 |
| 9 | Browse Talent Pool | Search candidates, contact | 8 |
| 10 | Edit Employee Profile | Update tools, availability | 7 |
| 11 | Edit Company Profile | Update company info, AI culture | 6 |
| 12 | MCP Token Setup | Generate API tokens | 5 |
| 13 | MCP Documentation | Navigate MCP docs | 5 |
| 14 | Help & FAQ | Navigate help content | 3 |
| 15 | About Page | View manifesto | 3 |

---

## Core Workflows

### Workflow 1: New Visitor Discovery Flow

> Tests the marketing funnel from landing page through role selection to role-specific pitch pages. Covers both job seeker and employer paths.

**Job Seeker Path:**

1. Enter the landing page
   - Navigate to the app root URL
   - Verify hero section displays with "Find a job" and "Post a job" buttons
   - Verify sample job cards are visible below the fold

2. Navigate to job seeker hub
   - Click "Find a job" button
   - Verify TalentHub page loads with headline "Find jobs where employers want you to use AI"
   - Verify two role cards appear: "I'm an Engineer" and "I'm in Product"

3. Select engineer role
   - Click "I'm an Engineer" card
   - Verify ForEngineers page loads with anti-LeetCode messaging
   - Verify headline includes "No LeetCode" or similar
   - Verify "Browse engineering jobs" CTA button is visible

4. Navigate to job listings
   - Click "Browse engineering jobs" button
   - Verify JobListings page loads
   - Verify filter sidebar is visible with role, salary, location filters

**Employer Path:**

5. Return to landing and select employer path
   - Click logo to return to landing
   - Click "Post a job" button
   - Verify EmployerHub page loads with headline about hiring AI-fluent workers
   - Verify two role cards: "Hire an Engineer" and "Hire a Product Person"

6. Select hiring engineers
   - Click "Hire an Engineer" card
   - Verify HireEngineers page loads
   - Verify "Post an engineering role" CTA is visible
   - Verify test format examples are displayed

---

### Workflow 2: Job Seeker Signup & Profile Creation

> Tests the complete job seeker onboarding flow: OAuth signup, JSON resume parsing, profile customization, and completion.

**Prerequisites:**
- Fresh browser state (not logged in)

1. Navigate to signup
   - From landing page, click "Sign up" button in header
   - Verify SignupPage loads with role selection step

2. Select job seeker role
   - Click "I'm looking for work" card
   - Verify card shows selected state
   - Verify "Continue" button becomes enabled
   - Click "Continue" button

3. View authentication options
   - Verify Step 2 shows OAuth options
   - Verify "Continue with Google" button is visible
   - Verify "Continue with GitHub" button is visible
   - Verify "Continue with email" option is available

4. Complete OAuth authentication
   - [MANUAL] Click "Continue with Google" button
   - [MANUAL] Complete Google OAuth flow in popup
   - Note: OAuth popups cannot be automated
   - Verify redirect to ProfileSetup page after auth

5. View profile setup - Step 1 (Upload)
   - Verify progress indicator shows Step 1 of 3
   - Verify "Copy Prompt" button is visible
   - Verify JSON input textarea is empty
   - Click "Copy Prompt" button
   - Verify button text changes to "Copied!"

6. Paste and parse JSON profile
   - Click in JSON textarea
   - Type or paste valid employee JSON (see schema)
   - Verify "Parse & Continue" button becomes enabled
   - Click "Parse & Continue" button
   - Verify no validation errors appear
   - Verify transition to Step 2

7. Review parsed profile - Step 2
   - Verify progress indicator shows Step 2 of 3
   - Verify parsed name, email, bio are displayed
   - Verify experience section shows parsed jobs

8. Select AI tools
   - Scroll to AI Tools section
   - Click on "Claude" tool badge
   - Verify badge shows selected state (highlighted)
   - Click on "Cursor" tool badge
   - Click on "ChatGPT" tool badge
   - Verify at least 3 tools are selected

9. Set role and availability
   - Click "Engineer" role button
   - Verify role button shows selected state
   - Click "Actively Looking" availability option
   - Verify availability is selected

10. Add portfolio URL
    - Find Portfolio URLs section
    - Type "https://github.com/username" in first URL input
    - Click "Add another" button
    - Verify second URL input appears
    - Type "https://portfolio.dev" in second input

11. Save profile
    - Click "Save Profile" button
    - Verify transition to Step 3 (Complete)
    - Verify success message displays

12. Navigate to dashboard
    - Click "Go to Dashboard" button
    - Verify EmployeeDashboard loads
    - Verify user greeting shows parsed name
    - Verify profile completion indicator is visible

---

### Workflow 3: Employer Signup & Company Setup

> Tests employer onboarding with work email verification, OAuth, and company profile creation.

**Prerequisites:**
- Fresh browser state (not logged in)
- Work email domain (not gmail.com, yahoo.com, etc.)

1. Navigate to signup
   - From landing page, click "Sign up" button
   - Verify SignupPage loads

2. Select employer role
   - Click "I'm hiring" card
   - Verify card shows selected state
   - Click "Continue" button
   - Verify Step 2 (auth options) appears

3. Attempt signup with personal email (error case)
   - Click "Continue with email" option
   - Type "user@gmail.com" in email field
   - Click submit
   - Verify error message appears: "Please use your work email"
   - Verify "Try with work email" button appears

4. Complete OAuth with work email
   - [MANUAL] Click "Continue with Google" button
   - [MANUAL] Use Google Workspace account (company domain)
   - Note: OAuth popups cannot be automated
   - Verify redirect to CompanyProfile setup after auth

5. Fill company basic information
   - Verify CompanyProfile page loads
   - Type "Acme Corp" in Company Name field
   - Type "https://acmecorp.com" in Website URL field
   - Type company description in Description textarea

6. Set company size and industry
   - Click Company Size dropdown
   - Select "51-200 employees" option
   - Type "Technology" in Industry field

7. Configure location settings
   - Type "San Francisco, CA" in Headquarters field
   - Click Remote Policy dropdown
   - Select "Remote-first" option

8. Set AI culture level
   - Find AI Culture section
   - Click "AI Expected" option
   - Verify option shows selected state with description

9. Select team AI tools
   - Scroll to AI Tools section
   - Click "Claude" badge
   - Click "Cursor" badge
   - Click "GitHub Copilot" badge
   - Verify 3 tools are selected

10. Save company profile
    - Click "Save Changes" button
    - Verify save confirmation appears
    - Verify redirect to EmployerDashboard
    - Verify company name appears in dashboard header

---

### Workflow 4: Job Search & Application

> Tests the complete job search experience: browsing, filtering, viewing details, and applying.

**Prerequisites:**
- Logged in as job seeker with complete profile

1. Navigate to job listings
   - From EmployeeDashboard, click "Search Jobs" quick action
   - Verify JobListings page loads
   - Verify job cards are displayed
   - Verify filter sidebar is visible

2. Apply role filter
   - In filter sidebar, click "Engineer" badge under Role
   - Verify badge shows selected state
   - Verify job list updates (may show fewer results)
   - Verify results counter updates

3. Apply salary filter
   - Click "$150k+" badge under Salary Range
   - Verify badge shows selected state
   - Verify job cards all show salary >= $150k

4. Apply AI tools filter
   - Click "Claude" in AI Tools filter section
   - Verify badge shows selected state
   - Verify job cards show Claude in required tools
   - Verify match indicators appear on cards

5. Sort results
   - Click Sort dropdown (shows "Newest")
   - Select "Highest salary" option
   - Verify job cards reorder by salary descending

6. View job detail
   - Click on first job card title
   - Verify JobDetail page loads
   - Verify job title and company name display
   - Verify "How You'll Be Tested" section is prominently displayed
   - Verify salary badge shows range
   - Verify AI tools badges are visible

7. Check tool match
   - Find AI Tools section
   - Verify match percentage indicator is visible
   - Verify matched tools are highlighted differently from unmatched

8. Open apply modal
   - Click "Apply Now" button
   - Verify apply modal appears
   - Verify your name is shown in modal
   - Verify matching AI tools are displayed
   - Verify optional cover letter textarea is present

9. Submit application
   - Type brief cover letter in textarea (optional)
   - Click "Submit Application" button
   - Verify modal closes
   - Verify "Apply Now" button changes to "Applied" (disabled state)
   - Verify success feedback appears

---

### Workflow 5: Post a Job

> Tests the complete employer job posting flow: JSON upload, details review, test format configuration, preview, and publish.

**Prerequisites:**
- Logged in as employer with company profile

1. Navigate to job posting
   - From EmployerDashboard, click "Post a Job" quick action
   - Verify JobPostNew page loads
   - Verify progress indicator shows Step 1 of 4

2. Copy JSON prompt
   - Click "Copy Prompt" button
   - Verify button text changes to "Copied!"
   - Click "View example" link
   - Verify example JSON schema expands

3. Paste job JSON
   - Click in JSON textarea
   - Paste valid job posting JSON (see schema)
   - Verify "Parse & Continue" button becomes enabled
   - Click "Parse & Continue" button
   - Verify no validation errors
   - Verify transition to Step 2

4. Review parsed job details
   - Verify progress shows Step 2
   - Verify company name displays correctly
   - Verify job title displays
   - Verify role category, employment type show
   - Verify job description displays

5. Set salary range
   - Find Salary section
   - Type "150000" in Minimum Salary field
   - Type "200000" in Maximum Salary field
   - Verify no validation errors

6. Select required AI tools
   - Scroll to AI Tools section
   - Click "Claude" badge
   - Click "Cursor" badge
   - Click "GitHub Copilot" badge
   - Verify 3 tools selected

7. Set AI proficiency level
   - Find Proficiency Level selector
   - Click "Proficient" option
   - Verify option shows selected state

8. Continue to test format
   - Click "Continue to Test Format" button
   - Verify transition to Step 3
   - Verify progress shows Step 3

9. Write test format description
   - Verify "How You'll Be Tested" textarea is visible
   - Verify character counter shows 0
   - Type: "1-hour live build: We'll give you a real feature and watch you build it using your preferred AI tools. No whiteboard, no puzzles - just real work."
   - Verify character counter updates
   - Verify minimum 50 characters met

10. Use quick template (alternative)
    - Click "Live Coding Challenge" quick template button
    - Verify textarea populates with template text
    - Verify character count updates

11. Preview job post
    - Click "Preview Job Post" button
    - Verify transition to Step 4
    - Verify job card preview displays
    - Verify all entered data appears correctly
    - Verify "How You'll Be Tested" section shows in preview

12. Verify preview accuracy
    - Verify job title matches input
    - Verify salary badge shows "$150k - $200k"
    - Verify AI tools badges appear
    - Verify description text is visible

13. Publish job
    - Click "Post Job" button
    - Verify transition to completion step
    - Verify success message displays

14. Navigate to jobs list
    - Click "View My Jobs" button
    - Verify EmployerJobs page loads
    - Verify new job appears in list with "Active" status

---

## Feature Workflows

### Workflow 6: Track My Applications

> Tests the job seeker application tracking experience with status filtering.

**Prerequisites:**
- Logged in as job seeker
- Has at least one submitted application

1. Navigate to applications
   - From EmployeeDashboard, click "My Applications" quick action
   - Verify EmployeeApplications page loads
   - Verify application list displays

2. View application statistics
   - Verify statistics cards show counts for each status
   - Verify status colors match: pending (yellow), reviewed (blue), interviewing (purple), etc.

3. Filter by status
   - Click "Interviewing" filter button
   - Verify filter shows selected state
   - Verify only interviewing applications display
   - Verify results count updates

4. View all applications
   - Click "All" filter button
   - Verify all applications display again

5. Sort applications
   - Click Sort dropdown
   - Select "Oldest first" option
   - Verify application order changes

6. View application detail
   - Click on an application card
   - Verify navigation to JobDetail page
   - Verify job information displays
   - Click back to return to applications

---

### Workflow 7: Manage Posted Jobs

> Tests employer job management: viewing, editing, and status changes.

**Prerequisites:**
- Logged in as employer
- Has at least one posted job

1. Navigate to jobs list
   - From EmployerDashboard, click "Manage all" link in Active Jobs section
   - Verify EmployerJobs page loads
   - Verify job cards display with status badges

2. View job statistics
   - Verify each job card shows applicant count
   - Verify posted date is visible
   - Verify status badge (Active/Closed/Draft) is visible

3. Filter by status
   - Click "Active" filter button
   - Verify only active jobs display
   - Click "All" to show all jobs

4. Open job editor
   - Click on a job card or "Edit" button
   - Verify JobEdit page loads
   - Verify all job fields are pre-filled

5. Edit job title
   - Find Job Title input
   - Clear existing text
   - Type "Senior Software Engineer - AI Tools"
   - Verify input updates

6. Change job status
   - Find Status dropdown at top
   - Click dropdown
   - Select "Draft" option
   - Verify status updates

7. Save changes
   - Click "Save Changes" button
   - Verify save confirmation appears ("Saved" with checkmark)

8. Return to jobs list
   - Click back button or "Cancel"
   - Verify EmployerJobs page loads
   - Verify edited job shows updated title and status

---

### Workflow 8: Review Applicants

> Tests the employer applicant review flow: filtering, status updates, and profile viewing.

**Prerequisites:**
- Logged in as employer
- Has job posting with applicants

1. Navigate to applicants
   - From EmployerDashboard, click on an Active Job card
   - Verify EmployerApplicants page loads
   - Verify job header shows job title and details
   - Verify applicant list displays

2. View applicant overview
   - Verify each applicant card shows:
     - Name and headline
     - Match percentage badge (color-coded)
     - AI tools badges
     - Application status badge
     - Applied date

3. Filter by status
   - Click "New" filter button
   - Verify only new (unreviewed) applicants display
   - Click "All" to show all applicants

4. Sort applicants
   - Click Sort dropdown
   - Select "Most experienced" option
   - Verify applicant order changes

5. Open applicant detail modal
   - Click "View Profile" button on first applicant
   - Verify modal opens with applicant details
   - Verify match percentage card displays
   - Verify experience and AI tools show
   - Verify cover letter displays (if provided)

6. Close modal and update status
   - Click "Close" or click outside modal
   - Verify modal closes
   - Hover over applicant card
   - Click status menu or "Mark as Reviewed" button
   - Verify status badge updates to "Reviewed"

7. Move to interview
   - Click "Move to Interview" action
   - Verify status badge updates to "Interviewing"

8. View full candidate profile
   - Click "View Full Profile" in modal or on card
   - Verify TalentProfile page loads
   - Verify full candidate information displays

9. Return to applicants
   - Click back button
   - Verify EmployerApplicants page loads
   - Verify status changes persisted

10. Edit job from applicants view
    - Click "Edit Job" button in header
    - Verify JobEdit page loads

---

### Workflow 9: Browse Talent Pool

> Tests employer talent browsing with search, filters, and candidate contact.

**Prerequisites:**
- Logged in as employer

1. Navigate to talent listings
   - From EmployerDashboard, click "Browse Talent" quick action
   - Verify TalentListings page loads
   - Verify candidate cards display
   - Verify filter sidebar is visible

2. Search by keyword
   - Type "React" in search input
   - Press Enter or wait for auto-search
   - Verify results filter to relevant candidates

3. Filter by role
   - Click Role dropdown
   - Select "Engineer" option
   - Verify candidate cards filter to engineers

4. Filter by availability
   - Click "Actively Looking" filter button
   - Verify button shows selected state
   - Verify candidates show "Actively Looking" badges

5. Filter by AI tools
   - Click "Claude" in AI Tools filter
   - Click "Cursor" in AI Tools filter
   - Verify candidates with those tools display
   - Verify tool badges are visible on cards

6. Sort results
   - Click Sort dropdown
   - Select "Most experienced" option
   - Verify candidate order changes

7. View candidate profile
   - Click on a candidate card
   - Verify TalentProfile page loads
   - Verify full profile displays:
     - Name, headline, location
     - AI tools badges
     - Experience timeline
     - Education section
     - Portfolio links

8. Contact candidate
   - Click "Contact Candidate" button
   - Verify contact modal opens
   - Type message in textarea
   - Click "Send Message" button
   - Verify modal closes
   - Verify button changes to "Message Sent" (disabled)

---

### Workflow 10: Edit Employee Profile

> Tests job seeker profile editing: updating tools, availability, and portfolio.

**Prerequisites:**
- Logged in as job seeker with existing profile

1. Navigate to profile editor
   - From EmployeeDashboard, click "Edit Profile" quick action
   - Verify ProfileSetup page loads in edit mode
   - Verify existing data is pre-filled

2. Update AI tools
   - Find AI Tools section
   - Click to deselect a currently selected tool
   - Verify tool badge shows unselected state
   - Click "v0" tool badge to add new tool
   - Verify tool badge shows selected state

3. Change availability status
   - Find Job Search Status section
   - Click "Open to Opportunities" option
   - Verify option shows selected state

4. Add portfolio URL
   - Find Portfolio URLs section
   - Click "Add another" button
   - Type new portfolio URL in new field
   - Verify URL is added

5. Remove portfolio URL
   - Click remove (X) button on a URL
   - Verify URL field is removed

6. Change role type
   - Click different role button (e.g., "Product")
   - Verify role button shows selected state

7. Save changes
   - Click "Save Profile" button
   - Verify save confirmation appears
   - Verify redirect to dashboard or success state

---

### Workflow 11: Edit Company Profile

> Tests employer company profile editing: company info, AI culture, and team tools.

**Prerequisites:**
- Logged in as employer with existing company

1. Navigate to company profile
   - From EmployerDashboard, click "Company Profile" quick action
   - Verify CompanyProfile page loads
   - Verify existing data is pre-filled

2. Update company description
   - Find Description textarea
   - Clear existing text
   - Type new company description
   - Verify textarea updates

3. Change company size
   - Click Company Size dropdown
   - Select different size option
   - Verify selection updates

4. Update remote policy
   - Click Remote Policy dropdown
   - Select "Hybrid" option
   - Verify selection updates

5. Change AI culture level
   - Find AI Culture section
   - Click "AI Required" option
   - Verify option shows selected with description

6. Save changes
   - Click "Save Changes" button
   - Verify save confirmation appears

---

### Workflow 12: MCP Token Setup

> Tests API token generation for MCP (Model Context Protocol) integration.

**Employee Path:**

1. Navigate to MCP settings
   - From EmployeeDashboard, click "MCP Access" quick action
   - Verify EmployeeMCP page loads
   - Verify token section displays

2. View current token
   - Verify masked token display (e.g., "vj_****...")
   - Verify "Copy Token" button is visible

3. Generate new token
   - Click "Generate New Token" button
   - Verify new token is generated
   - Verify token display updates

4. Copy token
   - Click "Copy Token" button
   - Verify button shows "Copied!" state

**Employer Path:**

5. Navigate to employer MCP settings
   - From EmployerDashboard, click "MCP Access" quick action
   - Verify EmployerMCP page loads
   - Verify token management and documentation links display

---

## Documentation Workflows

### Workflow 13: MCP Documentation Flow

> Tests navigation through MCP documentation pages.

1. Navigate to MCP overview
   - From footer or navigation, click "MCP Docs" link
   - Verify MCPOverview page loads
   - Verify introduction content displays
   - Verify navigation to setup and role-specific docs

2. View setup guide
   - Click "Setup Guide" or "Get Started" link
   - Verify MCPSetup page loads
   - Verify step-by-step installation instructions display
   - Verify code snippets are visible

3. View job seeker documentation
   - Click "For Job Seekers" link
   - Verify MCPJobSeekers page loads
   - Verify available commands are documented
   - Verify example prompts are shown

4. View employer documentation
   - Click "For Employers" link
   - Verify MCPEmployers page loads
   - Verify employer-specific commands display

5. Return to overview
   - Click back or "MCP Overview" link
   - Verify return to MCPOverview page

---

### Workflow 14: Help & FAQ Flow

> Tests help page navigation and content.

1. Navigate to help
   - From footer, click "Help" link
   - Verify HelpPage loads

2. Browse FAQ sections
   - Verify FAQ categories are visible
   - Verify expandable/collapsible sections work
   - Click on a question to expand answer

3. Navigate to related docs
   - Click any documentation links within help
   - Verify navigation works correctly

---

### Workflow 15: About Page Flow

> Tests about/manifesto page.

1. Navigate to about
   - From footer, click "About" link
   - Verify AboutPage loads

2. Read manifesto content
   - Verify company mission/manifesto displays
   - Verify "Why we built this" content is visible

3. Return to main site
   - Click logo or navigation link
   - Verify return to landing page

---

## Test Data Reference

### Sample Employee JSON (for Profile Setup)
```json
{
  "first_name": "Alex",
  "last_name": "Chen",
  "email": "alex@example.com",
  "location": "San Francisco, CA",
  "linkedin_url": "https://linkedin.com/in/alexchen",
  "experience": [
    {
      "company": "TechCorp",
      "title": "Senior Engineer",
      "start_date": "2021-03",
      "end_date": "present",
      "description": "Led AI-powered feature development using Claude and Cursor."
    }
  ],
  "education": [
    {
      "school": "Stanford University",
      "degree": "BS",
      "field": "Computer Science",
      "year": 2018
    }
  ],
  "ai_tools": ["Claude", "Cursor", "ChatGPT"],
  "portfolio_urls": ["https://github.com/alexchen"],
  "availability": "actively_looking",
  "role_type": "engineer"
}
```

### Sample Job JSON (for Job Posting)
```json
{
  "company_name": "AI Startup",
  "job_title": "Senior Software Engineer",
  "location_type": "remote",
  "location_details": "US-based",
  "role_category": "engineer",
  "experience_level": "senior",
  "employment_type": "full_time",
  "description": "We're looking for a senior engineer who ships fast with AI tools. You'll build features end-to-end using Claude, Cursor, and other AI assistants.",
  "ai_tools_required": ["Claude", "Cursor"],
  "ai_proficiency": "proficient",
  "salary_min": 150000,
  "salary_max": 200000,
  "how_youll_be_tested": ""
}
```

---

## Automation Notes

### Non-Automatable Steps
Steps marked with `[MANUAL]` require human interaction:
- OAuth popup flows (Google, GitHub authentication)
- File upload dialogs
- Browser permission prompts

### Prerequisites Setup
For automated testing, pre-configure:
- Test user accounts (employee and employer)
- Mock OAuth tokens or bypass authentication
- Pre-populated database with sample jobs and profiles

### Page Navigation
The mockup uses client-side state routing (`navigate(page)`) rather than URL-based routing. Browser automation should:
- Use click navigation rather than direct URL access
- Track state changes through UI updates
- Use page content to verify current location
