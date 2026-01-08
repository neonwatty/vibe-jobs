import { useState } from 'react'

// Sample job data
const SAMPLE_JOB = {
  id: 1,
  title: 'Senior Frontend Engineer',
  company: 'Acme Corp',
  companyDescription: 'Acme Corp is building the future of developer productivity. We believe AI should augment human creativity, not replace it. Our team ships fast and iterates constantly.',
  companySize: '50-100',
  companyWebsite: 'https://acmecorp.com',
  verified: true,
  location: 'Remote',
  locationDetails: 'US & Canada',
  employmentType: 'Full-time',
  experienceLevel: 'Senior (5-8 years)',
  salaryMin: 180000,
  salaryMax: 220000,
  postedDaysAgo: 2,
  aiTools: ['Cursor', 'Claude', 'v0'],
  proficiency: 'Proficient',
  description: `We're looking for a Senior Frontend Engineer who lives and breathes modern web development and isn't afraid to use AI tools to ship faster.

You'll be working on our flagship developer platform, building features that thousands of developers use daily. We care more about what you can build than where you went to school or how many years you've been coding.

The ideal candidate:
• Has deep experience with React and TypeScript
• Is comfortable leading technical decisions
• Ships fast and iterates based on user feedback
• Uses AI tools as a natural part of their workflow`,
  requirements: [
    '5+ years of frontend development experience',
    'Expert-level React and TypeScript',
    'Experience with modern build tools (Vite, webpack, etc.)',
    'Strong opinions on code quality and testing',
    'Comfortable with ambiguity and fast iteration',
  ],
  niceToHave: [
    'Experience with design systems',
    'Background in developer tools',
    'Open source contributions',
    'Experience with AI-assisted development',
  ],
  benefits: [
    'Competitive salary + equity',
    'Unlimited PTO',
    'Remote-first culture',
    'Home office stipend',
    'Health, dental, and vision insurance',
    'Learning & development budget',
  ],
  howYoullBeTested: "1-hour live build: We'll give you a Figma design and watch you build it with your AI tools. You can use Cursor, Claude Code, v0, or whatever makes you productive. We're evaluating your workflow, decision-making, and how you leverage AI to ship quality code fast.",
  aiCulture: 'AI Expected',
}

// Mock user profile for tool matching
const MOCK_USER = {
  name: 'Alex Chen',
  tools: ['Cursor', 'Claude', 'Claude Code', 'ChatGPT', 'v0'],
  isLoggedIn: true,
}

export default function JobDetail({ navigate, jobId }) {
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')

  const job = SAMPLE_JOB // In real app, fetch by jobId

  // Calculate tool match
  const matchingTools = job.aiTools.filter(t => MOCK_USER.tools.includes(t))
  const matchPercent = Math.round((matchingTools.length / job.aiTools.length) * 100)

  const handleApply = () => {
    setApplied(true)
    setShowApplyModal(false)
  }

  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <button
          onClick={() => navigate('landing')}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">All Jobs</button>
          <button onClick={() => navigate('dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-8">
        {/* Back link */}
        <button
          onClick={() => navigate('jobs')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to jobs
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-display text-2xl">{job.title}</h1>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                    <span>{job.company}</span>
                    {job.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-[var(--color-secondary)]">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    <span>·</span>
                    <span>{job.location}</span>
                    {job.locationDetails && (
                      <>
                        <span>·</span>
                        <span>{job.locationDetails}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className="badge text-lg">${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge">{job.employmentType}</span>
                <span className="badge">{job.experienceLevel}</span>
                <span className="badge">{job.proficiency} AI proficiency</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.aiTools.map(tool => (
                  <span
                    key={tool}
                    className={`badge ${matchingTools.includes(tool) ? 'badge-accent' : ''}`}
                  >
                    {tool}
                    {matchingTools.includes(tool) && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                ))}
              </div>

              {/* Tool match indicator */}
              {MOCK_USER.isLoggedIn && (
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    matchPercent === 100 ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' :
                    matchPercent >= 50 ? 'bg-[var(--color-secondary)] text-[var(--color-bg-primary)]' :
                    'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]'
                  }`}>
                    {matchPercent}%
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {matchPercent === 100 ? 'Perfect match!' :
                       matchPercent >= 50 ? 'Good match' : 'Partial match'}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      You use {matchingTools.length} of {job.aiTools.length} required AI tools
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {applied ? (
                  <button disabled className="btn btn-secondary flex-1 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setShowApplyModal(true)}
                    className="btn btn-primary flex-1 justify-center"
                  >
                    Apply Now
                  </button>
                )}
                <button
                  onClick={() => setSaved(!saved)}
                  className={`btn ${saved ? 'btn-secondary' : 'btn-ghost'}`}
                >
                  <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {saved ? 'Saved' : 'Save'}
                </button>
                <button className="btn btn-ghost">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* How You'll Be Tested - THE DIFFERENTIATOR */}
            <div className="card border-[var(--color-accent)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
                  <svg className="w-4 h-4 text-[var(--color-bg-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">How You'll Be Tested</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{job.howYoullBeTested}</p>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-sm text-[var(--color-text-muted)]">
                  No surprise LeetCode. No whiteboard algorithms. Just practical skills with the tools you'll actually use.
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">About This Role</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-[var(--color-text-secondary)] whitespace-pre-line leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[var(--color-text-secondary)]">{req}</span>
                  </li>
                ))}
              </ul>

              {job.niceToHave && job.niceToHave.length > 0 && (
                <>
                  <h3 className="text-md font-semibold mt-6 mb-4">Nice to Have</h3>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="text-[var(--color-text-muted)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Benefits</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {job.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg">
                      <svg className="w-5 h-5 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Card */}
            <div className="card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-xl font-bold text-[var(--color-bg-primary)]">
                  {job.company[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{job.company}</h3>
                  {job.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-[var(--color-secondary)]">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified employer
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] mb-4">{job.companyDescription}</p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Company size</span>
                  <span>{job.companySize} employees</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">AI Culture</span>
                  <span className="badge badge-accent text-xs">{job.aiCulture}</span>
                </div>
              </div>

              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full justify-center mt-4"
              >
                Visit Website
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            {/* Posted date */}
            <div className="card">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)]">Posted</p>
                  <p className="font-medium">{job.postedDaysAgo} days ago</p>
                </div>
              </div>
            </div>

            {/* Related jobs placeholder */}
            <div className="card">
              <h3 className="font-semibold mb-4">Similar Jobs</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <button
                    key={i}
                    className="w-full p-3 bg-[var(--color-bg-tertiary)] rounded-lg text-left hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                  >
                    <p className="font-medium text-sm">Frontend Engineer</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Company {i} · Remote</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Apply to {job.company}</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-[var(--color-text-muted)] mb-4">
                Applying as <strong className="text-[var(--color-text-primary)]">{MOCK_USER.name}</strong>
              </p>

              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 mb-4">
                <p className="text-sm font-medium mb-2">Your matching AI tools:</p>
                <div className="flex flex-wrap gap-2">
                  {matchingTools.map(tool => (
                    <span key={tool} className="badge badge-accent text-xs">{tool}</span>
                  ))}
                </div>
              </div>

              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                COVER LETTER (OPTIONAL)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell them why you're interested and what makes you a great fit..."
                className="w-full h-32 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="btn btn-primary flex-1"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
