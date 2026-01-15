import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNav, FAQAccordion, CopyableCode } from '@/components/landing'

export const metadata: Metadata = {
  title: 'Help Center | Vibe Jobs',
  description: 'Get help with Vibe Jobs. Learn how to create your profile, post jobs, and use AI to parse your resume.',
  openGraph: {
    title: 'Help Center | Vibe Jobs',
    description: 'Get help with Vibe Jobs. Learn how to create your profile, post jobs, and use AI to parse your resume.',
  },
}

const jobSeekerFAQ = [
  {
    question: 'How do I create a profile?',
    answer: (
      <ol className="list-decimal list-inside space-y-2">
        <li>Sign up with Google or GitHub</li>
        <li>Upload your resume (PDF or DOCX)</li>
        <li>Use ChatGPT, Claude, or any AI to parse it into our JSON format</li>
        <li>Paste the JSON and submit</li>
      </ol>
    ),
  },
  {
    question: 'How does job matching work?',
    answer: (
      <div className="space-y-4">
        <p>We calculate a match percentage based on:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>AI tools overlap (your tools vs. required tools)</li>
          <li>Role type match</li>
          <li>Experience level alignment</li>
        </ul>
        <p>The higher your match, the more likely you&apos;re a good fit for the role.</p>
      </div>
    ),
  },
  {
    question: 'What does "How You\'ll Be Tested" mean?',
    answer: (
      <p>
        Every job on Vibe Jobs includes a transparent description of how you&apos;ll be evaluated.
        No surprise whiteboard questions. No LeetCode gotchas. You&apos;ll know exactly what to expect
        before you apply.
      </p>
    ),
  },
  {
    question: 'How do I apply to a job?',
    answer: (
      <p>
        Click &quot;Apply&quot; on any job listing. Your profile is sent directly to the employer.
        You can optionally add a cover message. No ATS black holes - employers see your actual profile.
      </p>
    ),
  },
  {
    question: 'Can I update my profile after creating it?',
    answer: (
      <p>
        Yes! Go to your Dashboard → Profile to update your information anytime.
        You can re-upload your resume, update your AI tools, and change your availability.
      </p>
    ),
  },
]

const employerFAQ = [
  {
    question: 'How do I post a job?',
    answer: (
      <ol className="list-decimal list-inside space-y-2">
        <li>Sign up and create your company profile</li>
        <li>Upload your job description (PDF or DOCX)</li>
        <li>Parse it into JSON using any AI tool</li>
        <li>Add your &quot;How You&apos;ll Be Tested&quot; section</li>
        <li>Publish</li>
      </ol>
    ),
  },
  {
    question: 'What should I put in "How You\'ll Be Tested"?',
    answer: (
      <div className="space-y-4">
        <p>Be specific about your interview process. Examples:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>&quot;1-hour live coding session. Use any tools you want.&quot;</li>
          <li>&quot;24-hour take-home project. Build a small feature end-to-end.&quot;</li>
          <li>&quot;30-minute portfolio review. Walk us through past work.&quot;</li>
          <li>&quot;2-hour PRD sprint. Write a spec for a feature we describe.&quot;</li>
        </ul>
      </div>
    ),
  },
  {
    question: 'How do I manage applicants?',
    answer: (
      <p>
        Go to Company Dashboard → Your Jobs → Click on a job → View Applicants.
        You can update status (Pending → Reviewed → Interviewing → Offer/Rejected)
        and view full candidate profiles.
      </p>
    ),
  },
  {
    question: 'Is Vibe Jobs free?',
    answer: (
      <p>
        Yes, currently free for all employers. Post unlimited jobs while we&apos;re in early access.
        No credit card required.
      </p>
    ),
  },
]

const profileJsonSchema = `{
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
  "ai_tools": ["Cursor", "Claude", "ChatGPT", "..."],
  "portfolio_urls": ["https://github.com/you", "..."],
  "availability": "actively_looking | open | not_looking",
  "role_type": "engineer | product | marketer | sales | ops | other"
}`

const jobJsonSchema = `{
  "job_title": "string",
  "location_type": "remote | hybrid | onsite",
  "location_details": "string (e.g., 'San Francisco, CA')",
  "role_category": "engineer | product | marketer | sales | ops | other",
  "experience_level": "entry | mid | senior | lead",
  "employment_type": "full_time | part_time | contract",
  "description": "string (the full job description)",
  "salary_min": number,
  "salary_max": number,
  "ai_tools_required": ["Cursor", "Claude", "..."],
  "ai_proficiency": "familiar | proficient | expert",
  "how_youll_be_tested": "string (describe your interview process)"
}`

const parsePromptTemplate = `Parse the following resume into this exact JSON format.
Return ONLY valid JSON with no explanation or markdown.

JSON Schema:
${profileJsonSchema}

Resume:
[PASTE YOUR RESUME TEXT HERE]`

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-grid">
      <LandingNav />

      <main className="container py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-display text-4xl md:text-5xl mb-4">Help Center</h1>
            <p className="text-lg text-[var(--color-text-muted)]">
              Everything you need to get started on Vibe Jobs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            <a href="#job-seekers" className="card card-interactive text-center">
              <h3 className="font-semibold">For Job Seekers</h3>
            </a>
            <a href="#employers" className="card card-interactive text-center">
              <h3 className="font-semibold">For Employers</h3>
            </a>
            <a href="#json-guide" className="card card-interactive text-center">
              <h3 className="font-semibold">JSON Parsing Guide</h3>
            </a>
          </div>

          {/* Job Seekers FAQ */}
          <section id="job-seekers" className="mb-16 scroll-mt-8">
            <h2 className="text-display text-2xl mb-6">For Job Seekers</h2>
            <FAQAccordion items={jobSeekerFAQ} />
          </section>

          {/* Employers FAQ */}
          <section id="employers" className="mb-16 scroll-mt-8">
            <h2 className="text-display text-2xl mb-6">For Employers</h2>
            <FAQAccordion items={employerFAQ} />
          </section>

          {/* JSON Parsing Guide */}
          <section id="json-guide" className="mb-16 scroll-mt-8">
            <h2 className="text-display text-2xl mb-6">JSON Parsing Guide</h2>

            <div className="card mb-8">
              <h3 className="font-semibold mb-4 text-[var(--color-accent)]">The Philosophy</h3>
              <p className="text-[var(--color-text-secondary)]">
                If you can&apos;t use an LLM to parse a document, you might not be our target user.
                This is intentional - it&apos;s a soft filter for AI fluency. If you&apos;re on Vibe Jobs,
                you should be comfortable using AI tools.
              </p>
            </div>

            <div className="space-y-8">
              {/* Profile JSON */}
              <div>
                <h3 className="font-semibold mb-4">Profile JSON Schema (Job Seekers)</h3>
                <CopyableCode code={profileJsonSchema} />
              </div>

              {/* Job JSON */}
              <div>
                <h3 className="font-semibold mb-4">Job JSON Schema (Employers)</h3>
                <CopyableCode code={jobJsonSchema} />
              </div>

              {/* Parse Prompt */}
              <div>
                <h3 className="font-semibold mb-4">Sample Prompt for Parsing Your Resume</h3>
                <p className="text-[var(--color-text-muted)] mb-4">
                  Copy this prompt, paste your resume after it, and send to ChatGPT or Claude:
                </p>
                <CopyableCode code={parsePromptTemplate} />
              </div>

              {/* Tips */}
              <div className="card">
                <h3 className="font-semibold mb-4">Tips for Best Results</h3>
                <ul className="space-y-2 text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Use Claude or ChatGPT for the most reliable JSON output
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copy your resume as plain text, not as a file attachment
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Add your AI tools list manually - LLMs can&apos;t know what you use
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Review the JSON before pasting - fix any obvious errors
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t border-[var(--color-border)] pt-16 text-center">
            <h2 className="text-display text-2xl mb-4">Still have questions?</h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              We&apos;re here to help. Reach out anytime.
            </p>
            <Link href="mailto:hello@vibejobs.co" className="btn btn-secondary">
              Contact Us
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
