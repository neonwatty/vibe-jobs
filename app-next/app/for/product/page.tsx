import Link from 'next/link'

const sampleJobs = [
  {
    company: 'Notion',
    title: 'Senior Product Manager',
    salary: '$190k - $260k',
    tools: ['Claude', 'ChatGPT', 'Notion AI'],
    test: 'PRD sprint: Write a product spec for a feature we describe. 2 hours, any tools allowed.',
  },
  {
    company: 'Figma',
    title: 'Product Lead, AI Features',
    salary: '$220k - $300k',
    tools: ['ChatGPT', 'Claude', 'Perplexity'],
    test: 'Strategy walkthrough: Present how you&apos;d approach our next AI feature using any research tools.',
  },
  {
    company: 'Stripe',
    title: 'Product Manager, Developer Tools',
    salary: '$200k - $280k',
    tools: ['Claude', 'Gamma', 'ChatGPT'],
    test: '90-minute product challenge: Define and spec a developer-facing feature. Show your process.',
  },
]

export default function ForProduct() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/for/talent" className="btn btn-ghost">For Talent</Link>
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="badge badge-secondary mb-6">For Product</div>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            No hypotheticals. No whiteboards.
            <br />
            <span className="text-[var(--color-secondary)]">Just make something real.</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Companies here don&apos;t want to hear how you&apos;d theoretically approach it.
            They want to see you do it. Use Claude to research. Use ChatGPT to draft. That&apos;s the point.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/jobs?role=product" className="btn btn-primary btn-lg">
              Browse Product Jobs
            </Link>
            <Link href="/signup" className="btn btn-secondary btn-lg">
              Create Profile
            </Link>
          </div>
        </div>

        {/* The Difference */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card border-[var(--color-error)]/30">
              <div className="text-[var(--color-error)] text-sm font-mono mb-4">TYPICAL INTERVIEW</div>
              <ul className="space-y-3 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>&quot;How would you improve Instagram?&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Vague case studies with no real data</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Tests your improv skills, not product skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>No tools allowed&mdash;&quot;just think out loud&quot;</span>
                </li>
              </ul>
            </div>

            <div className="card border-[var(--color-accent)]/30">
              <div className="text-[var(--color-accent)] text-sm font-mono mb-4">VIBE JOBS INTERVIEW</div>
              <ul className="space-y-3 text-[var(--color-text-muted)]">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>&quot;Write a spec for this real feature&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use Claude, Perplexity, whatever helps you work</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tests how you actually make decisions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Know the format before you apply</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Jobs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-8">Sample product roles</h2>
          <div className="space-y-4">
            {sampleJobs.map((job, i) => (
              <div key={i} className="card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-[var(--color-text-muted)]">{job.company}</p>
                  </div>
                  <div className="text-[var(--color-secondary)] font-mono text-lg">
                    {job.salary}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tools.map((tool, j) => (
                    <span key={j} className="badge badge-secondary">{tool}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="text-sm text-[var(--color-text-muted)] mb-1">How you&apos;ll be tested:</div>
                  <p className="text-[var(--color-text-secondary)]">{job.test}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/jobs?role=product" className="btn btn-primary">
              View All Product Jobs
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
