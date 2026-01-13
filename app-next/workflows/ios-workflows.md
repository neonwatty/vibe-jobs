# iOS Safari Workflows - Vibe Jobs

> Mobile web testing workflows for vibejobs.com
> Last updated: 2026-01-12
> Test URL: http://localhost:3000 (or production URL)

## Quick Reference

| # | Workflow | Purpose | Steps |
|---|----------|---------|-------|
| 1 | Landing Page Navigation | Test home page and navigation | 6 |
| 2 | Employee Signup | Complete employee registration | 8 |
| 3 | Employer Signup | Employer registration with work email | 9 |
| 4 | Login | Email/password authentication | 6 |
| 5 | Browse & Filter Jobs | Search and filter job listings | 8 |
| 6 | View Job & Apply | View details and submit application | 9 |
| 7 | Manage Applications | Track and manage applications | 7 |
| 8 | Edit Employee Profile | Update profile and AI tools | 8 |
| 9 | Upload Resume | Upload resume file | 6 |
| 10 | Post New Job | Create and publish job listing | 10 |
| 11 | Manage Jobs | Pause, activate, delete jobs | 8 |
| 12 | View Analytics | Check hiring metrics | 5 |
| 13 | Edit Company Profile | Update company information | 8 |
| 14 | Browse Talent | Search candidates | 6 |

## Simulator Setup (One-Time)

**Prerequisites for automation:**
1. Boot iOS Simulator (iPhone 15 Pro recommended)
2. Open Safari browser
3. Enable Safari Developer Menu if needed
4. Ensure localhost:3000 is accessible from simulator

**Test Accounts:**
| Role | Email | Password |
|------|-------|----------|
| Employer | test-employer@aistartup.com | password123 |
| Employee | test-employee@example.com | password123 |

---

## Core Workflows

### Workflow 1: Landing Page Navigation

> Tests the home page loads correctly and main navigation works on mobile Safari.

1. Launch Safari and navigate to app
   - Open Safari on iOS Simulator
   - Navigate to `http://localhost:3000`
   - Wait for page to fully load
   - Verify "vibejobs" logo appears in header

2. Verify hero section
   - Verify headline text "Find your next" is visible
   - Verify "Browse Jobs" button is visible
   - Verify "Post a Job" button is visible

3. Test Browse Jobs navigation
   - Tap "Browse Jobs" button
   - Wait for navigation
   - Verify URL changes to `/jobs`
   - Verify job listings page loads

4. Navigate back to home
   - Tap browser back button or "vibejobs" logo
   - Verify return to home page

5. Test Post a Job navigation
   - Tap "Post a Job" button
   - Verify redirect to `/signup` (if not logged in)
   - Verify role selection page appears

6. Verify mobile menu
   - If hamburger menu exists, tap to open
   - Verify navigation links are accessible
   - Tap outside to close menu

---

### Workflow 2: Employee Signup

> Tests complete employee registration flow from role selection through profile setup.

**Prerequisites:** Logged out state, fresh browser session

1. Navigate to signup
   - Open Safari to `http://localhost:3000`
   - Tap "Create account" or navigate to `/signup`
   - Wait for signup page to load

2. Select employee role
   - Verify "Choose your path" heading
   - Verify two role options are displayed
   - Tap "I'm looking for work" option
   - Verify option is selected (highlighted)

3. Proceed to authentication
   - Verify OAuth buttons appear (Google, GitHub)
   - Verify email signup option if available
   - [MANUAL] Tap "Continue with Google" or "Continue with GitHub"
   - [MANUAL] Complete OAuth flow in popup/redirect

4. Wait for account creation
   - Wait for redirect after OAuth
   - Verify redirect to `/dashboard` or profile setup

5. Complete profile setup (if prompted)
   - Verify profile form appears
   - Tap "First name" field
   - Type "Test"
   - Tap "Last name" field
   - Type "Employee"

6. Select AI tools
   - Scroll to AI tools section
   - Tap "Claude Code" badge to select
   - Tap "Cursor" badge to select
   - Verify badges show selected state

7. Set availability status
   - Tap "Actively Looking" radio button
   - Verify selection is highlighted

8. Save profile
   - Tap "Save Profile" button
   - Wait for save to complete
   - Verify success message or redirect
   - Verify employee dashboard loads

---

### Workflow 3: Employer Signup

> Tests employer registration with work email validation.

**Prerequisites:** Logged out state

1. Navigate to signup
   - Open Safari to `http://localhost:3000/signup`
   - Wait for signup page to load

2. Select employer role
   - Verify role selection options visible
   - Tap "I'm hiring" option
   - Verify option is selected

3. Attempt with personal email (validation test)
   - [MANUAL] Complete OAuth with personal Gmail account
   - Verify error message about work email requirement
   - Verify option to switch to employee account

4. Authenticate with work email
   - [MANUAL] Sign out and retry with work email
   - [MANUAL] Complete OAuth with work domain email
   - Wait for redirect

5. Verify company profile setup
   - Verify redirect to `/company/profile` or setup flow
   - Verify company profile form appears

6. Fill company information
   - Tap "Company name" field
   - Type "Test Company Inc"
   - Tap "Website" field
   - Type "https://testcompany.com"

7. Select company details
   - Tap "Industry" field
   - Select "Technology" from dropdown
   - Tap "Company size" dropdown
   - Select "11-50"

8. Set remote policy
   - Tap "Fully Remote" radio button
   - Verify selection

9. Save company profile
   - Tap "Save Company Profile" button
   - Wait for save to complete
   - Verify redirect to employer dashboard
   - Verify "Employer Dashboard" heading visible

---

### Workflow 4: Login

> Tests email/password login for existing accounts.

**Prerequisites:** Test account exists (test-employee@example.com)

1. Navigate to login
   - Open Safari to `http://localhost:3000/login`
   - Wait for login page to load
   - Verify "Welcome back" heading

2. Enter email
   - Tap email input field
   - Type "test-employee@example.com"
   - Verify email appears in field

3. Enter password
   - Tap password input field
   - Type "password123"
   - Verify password is masked

4. Submit login
   - Tap "Sign in with Email" button
   - Wait for authentication
   - Verify button shows loading state

5. Verify successful login
   - Wait for redirect
   - Verify redirect to `/dashboard` (for employee)
   - Verify dashboard content loads

6. Verify logged-in state
   - Verify user menu or profile icon in header
   - Verify protected content is accessible

---

## Employee Workflows

### Workflow 5: Browse & Filter Jobs

> Tests job search and filtering functionality on mobile.

**Prerequisites:** Any user (logged in or out)

1. Navigate to jobs page
   - Open Safari to `http://localhost:3000/jobs`
   - Wait for jobs list to load
   - Verify job count heading visible

2. Test search functionality
   - Locate search input field
   - Tap search field
   - Type "engineer"
   - Wait for results to filter (debounced)
   - Verify results update

3. Filter by role category
   - Scroll to filter section
   - Tap "Engineering" role badge
   - Verify badge shows selected state
   - Verify job list updates

4. Filter by salary range
   - Tap "$150k+" salary filter
   - Verify filter is applied
   - Verify results show high-salary jobs

5. Filter by location type
   - Tap "Remote" location filter
   - Verify filter is applied
   - Verify results show remote positions

6. Filter by AI tools
   - Scroll to AI tools section
   - Tap "Claude Code" badge
   - Verify jobs requiring Claude Code shown

7. Clear all filters
   - Tap "Clear all" button
   - Verify all filters reset
   - Verify full job list returns

8. Verify job card information
   - Verify job cards show: title, company, salary, location
   - Verify AI tools badges visible
   - Verify "View Details" or card is tappable

---

### Workflow 6: View Job & Apply

> Tests viewing job details and submitting an application.

**Prerequisites:** Logged in as employee (test-employee@example.com)

1. Navigate to jobs and select one
   - Open Safari to `http://localhost:3000/jobs`
   - Wait for job list to load
   - Tap on first job card
   - Wait for job detail page to load

2. Verify job details display
   - Verify job title heading
   - Verify company name and logo/initial
   - Verify salary range displayed
   - Verify location and employment type

3. Scroll through job content
   - Scroll down to view full description
   - Verify "How you'll be tested" section
   - Verify requirements list
   - Verify benefits list

4. Check AI tool matching
   - Verify "AI Tools Match" percentage displayed
   - Verify matching tools are highlighted
   - Verify required AI tools listed

5. Verify company sidebar
   - Scroll to company information
   - Verify company description
   - Verify company size and industry
   - Verify AI culture description

6. Initiate application
   - Scroll to "Apply Now" button
   - Tap "Apply Now" button
   - Verify application modal slides up

7. Review application details
   - Verify pre-filled name from profile
   - Verify AI tools match displayed
   - Tap cover message textarea
   - Type "I am excited to apply for this role."

8. Submit application
   - Tap "Submit Application" button
   - Wait for submission
   - Verify success message
   - Verify modal closes

9. Verify applied state
   - Verify "Applied" badge shows on job
   - Verify "Apply Now" button is disabled or hidden

---

### Workflow 7: Manage Applications

> Tests viewing and managing job applications.

**Prerequisites:** Logged in as employee with existing applications

1. Navigate to applications
   - Open Safari to `http://localhost:3000/dashboard/applications`
   - Wait for page to load
   - Verify "My Applications" heading

2. Verify status summary
   - Verify status cards displayed (Pending, Reviewed, etc.)
   - Verify counts shown for each status
   - Note total applications count

3. Filter by status
   - Tap "Pending" status filter
   - Verify only pending applications shown
   - Tap "All" or clear filter
   - Verify all applications return

4. View application details
   - Locate an application card
   - Verify job title displayed
   - Verify company name
   - Verify application date
   - Verify current status badge

5. Sort applications
   - Tap sort dropdown
   - Select "Oldest first"
   - Verify order changes
   - Select "Most recent"
   - Verify order reverts

6. Test withdraw functionality
   - Find a "Pending" application
   - Tap "Withdraw" button
   - Verify confirmation dialog appears
   - Tap "Cancel" to abort
   - Verify application remains

7. Navigate to job from application
   - Tap job title link
   - Verify redirect to job detail page
   - Tap back to return to applications

---

### Workflow 8: Edit Employee Profile

> Tests updating employee profile information and AI tools.

**Prerequisites:** Logged in as employee

1. Navigate to profile
   - Open Safari to `http://localhost:3000/dashboard/profile`
   - Wait for profile page to load
   - Verify profile form is displayed

2. Update basic information
   - Tap "First name" field
   - Clear and type "Updated"
   - Tap "Headline" field
   - Clear and type "Senior Engineer | AI Enthusiast"

3. Update location
   - Tap "Location" field
   - Clear and type "San Francisco, CA"

4. Update LinkedIn
   - Tap "LinkedIn URL" field
   - Type "https://linkedin.com/in/testuser"

5. Change role type
   - Tap "Role type" dropdown
   - Select "Engineering"
   - Verify selection

6. Update AI tools
   - Scroll to AI tools section
   - Tap "GitHub Copilot" to add
   - Tap "Claude Code" if already selected (to verify toggle)
   - Verify badges reflect selections

7. Change availability
   - Tap "Open to Opportunities" radio
   - Verify selection changes

8. Save changes
   - Tap "Save Profile" button
   - Wait for save to complete
   - Verify success message
   - Refresh page
   - Verify changes persisted

---

### Workflow 9: Upload Resume

> Tests resume file upload functionality.

**Prerequisites:** Logged in as employee

1. Navigate to profile
   - Open Safari to `http://localhost:3000/dashboard/profile`
   - Scroll to resume section
   - Verify resume upload area visible

2. Initiate upload
   - [MANUAL] Tap upload area or "Upload Resume" button
   - [MANUAL] iOS file picker will open

3. Select file
   - [MANUAL] Navigate to Files app or location
   - [MANUAL] Select a PDF file (under 5MB)
   - [MANUAL] Tap to confirm selection

4. Wait for upload
   - Verify upload progress indicator
   - Wait for upload to complete
   - Verify success message

5. Verify uploaded resume
   - Verify resume filename displayed
   - Verify download link available
   - Verify delete button available

6. Test delete resume
   - Tap delete/remove button
   - Verify confirmation if shown
   - Verify resume is removed
   - Verify upload area returns

---

## Employer Workflows

### Workflow 10: Post New Job

> Tests creating and publishing a new job listing.

**Prerequisites:** Logged in as employer with company profile complete

1. Navigate to post job
   - Open Safari to `http://localhost:3000/company/jobs/new`
   - Wait for job form to load
   - Verify "Post a Job" heading

2. Fill job title and description
   - Tap "Job title" field
   - Type "Senior iOS Engineer"
   - Tap "Description" textarea
   - Type "We are looking for a senior iOS engineer to join our mobile team."

3. Select role and experience
   - Tap "Role category" dropdown
   - Select "Engineering"
   - Tap "Experience level" dropdown
   - Select "Senior"

4. Set location details
   - Tap "Remote" location type
   - Tap "Location details" field
   - Type "US timezone preferred"

5. Set compensation
   - Tap "Minimum salary" field
   - Type "150000"
   - Tap "Maximum salary" field
   - Type "200000"

6. Set AI requirements
   - Tap "AI proficiency" dropdown
   - Select "Proficient"
   - Scroll to AI tools section
   - Tap "Claude Code" badge
   - Tap "Cursor" badge

7. Fill testing process
   - Scroll to "How they'll be tested" section
   - Tap the textarea
   - Type "2-hour live coding session building a SwiftUI feature with AI tools."

8. Add requirements
   - Tap "Requirements" textarea
   - Type "5+ years iOS development\nSwiftUI expertise\nAI tool proficiency"

9. Add benefits
   - Tap "Benefits" textarea
   - Type "Competitive salary\nRemote work\nEquity package"

10. Publish job
    - Scroll to bottom
    - Tap "Publish Job" button
    - Wait for submission
    - Verify redirect to `/company/jobs`
    - Verify new job appears with "Active" status

---

### Workflow 11: Manage Jobs

> Tests pausing, activating, and deleting job postings.

**Prerequisites:** Logged in as employer with existing jobs

1. Navigate to manage jobs
   - Open Safari to `http://localhost:3000/company/jobs`
   - Wait for page to load
   - Verify "Manage Jobs" heading

2. Verify job listings
   - Verify active jobs section
   - Verify job cards show title, status, applicant count
   - Verify action menu button on each job

3. Open job action menu
   - Locate a job card
   - Tap the three-dot menu button
   - Verify dropdown menu appears
   - Verify options: Edit, Pause, Delete

4. Pause a job
   - Tap "Pause Job" option
   - Verify job status changes to "Paused"
   - Verify job moves to Paused section

5. Activate a paused job
   - Find the paused job
   - Tap three-dot menu
   - Tap "Activate Job"
   - Verify status changes to "Active"

6. View applicants
   - Find a job with applications
   - Tap applicant count link
   - Verify applicants list appears
   - Tap back to return

7. Test delete flow
   - Tap three-dot menu on a job
   - Tap "Delete Job"
   - Verify confirmation dialog
   - Tap "Cancel" to abort
   - Verify job remains

8. Edit job (navigation test)
   - Tap three-dot menu
   - Tap "Edit Job"
   - Verify job editor loads with existing data
   - Tap back/cancel without saving

---

### Workflow 12: View Analytics

> Tests employer analytics dashboard.

**Prerequisites:** Logged in as employer with job postings and applications

1. Navigate to analytics
   - Open Safari to `http://localhost:3000/company/analytics`
   - Wait for page to load
   - Verify "Analytics" heading

2. Verify summary metrics
   - Verify "Total Jobs" card with count
   - Verify "Total Applications" card
   - Verify "Active Jobs" count
   - Verify average applications per job

3. View application status breakdown
   - Verify status chart or breakdown
   - Verify counts for each status
   - Verify percentages if shown

4. Check top performing jobs
   - Scroll to top jobs section
   - Verify jobs ranked by application count
   - Verify job titles and counts displayed

5. View recent applications
   - Scroll to recent applications section
   - Verify applicant names/info
   - Verify job applied to
   - Verify application date

---

### Workflow 13: Edit Company Profile

> Tests updating company profile information.

**Prerequisites:** Logged in as employer

1. Navigate to company profile
   - Open Safari to `http://localhost:3000/company/profile`
   - Wait for page to load
   - Verify company profile form

2. Update company name
   - Tap "Company name" field
   - Clear and type "Updated Company Name"

3. Update website
   - Tap "Website" field
   - Clear and type "https://updatedcompany.com"

4. Update industry
   - Tap "Industry" dropdown
   - Select different industry
   - Verify selection

5. Update company size
   - Tap "Company size" dropdown
   - Select "51-200"
   - Verify selection

6. Update remote policy
   - Tap "Hybrid" radio button
   - Verify selection changes

7. Update AI culture
   - Scroll to AI section
   - Tap "How does your company use AI?" textarea
   - Clear and type "We use AI tools across all engineering workflows."
   - Update AI tools selection

8. Save changes
   - Tap "Save Company Profile" button
   - Wait for save
   - Verify success message
   - Refresh to confirm persistence

---

### Workflow 14: Browse Talent

> Tests employer talent search functionality.

**Prerequisites:** Logged in as employer

1. Navigate to talent page
   - Open Safari to `http://localhost:3000/talent`
   - Wait for page to load
   - Verify talent listings appear

2. Search by name/headline
   - Tap search input field
   - Type "engineer"
   - Wait for results to filter
   - Verify matching profiles shown

3. Filter by role type
   - Tap "Role type" dropdown
   - Select "Engineering"
   - Verify results filter

4. Filter by availability
   - Tap "Availability" dropdown
   - Select "Actively Looking"
   - Verify only active candidates shown

5. Filter by AI tools
   - Tap "Claude Code" badge
   - Verify candidates with Claude Code shown
   - Add "Cursor" filter
   - Verify intersection of filters

6. Clear filters
   - Tap "Clear all" button
   - Verify all candidates return
   - Verify filter state reset

---

## Automation Notes

### Supported Actions
- Navigate to URL
- Tap elements by text, role, or position
- Type text in input fields (ASCII only)
- Scroll up/down
- Wait for elements
- Verify text/element visibility

### Manual Steps Required
Steps marked `[MANUAL]` require human intervention:
- OAuth authentication flows (system dialogs)
- File upload/selection (iOS file picker)
- Permission dialogs (camera, location, notifications)
- Biometric authentication

### Tips for iOS Simulator Testing
1. Use iPhone 15 Pro simulator for modern UI
2. Test both portrait and landscape orientations
3. Test with different text sizes (Accessibility settings)
4. Test keyboard interactions (show/hide)
5. Test pull-to-refresh where applicable
