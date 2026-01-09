import Link from 'next/link'

const sampleJobs = [
  {
    company: 'Replicate',
    title: 'Senior Full-Stack Engineer',
    salary: '$180k - $240k',
    tools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
    test: '1-hour live build: We give you a problem and watch you solve it with your AI tools.',
  },
  {
    company: 'Vercel',
    title: 'Platform Engineer',
    salary: '$200k - $280k',
    tools: ['Cursor', 'v0', 'ChatGPT'],
    test: '24-hour take-home: Build a small feature end-to-end. Use whatever you want.',
  },
  {
    company: 'Linear',
    title: 'Product Engineer',
    salary: '$170k - $220k',
    tools: ['Windsurf', 'Claude', 'Copilot'],
    test: '2-hour pairing session: Build a feature together. Show us your workflow.',
  },
]

export default function ForEngineers() {
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
          <div className="badge badge-accent mb-6">For Engineers</div>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            No LeetCode. No whiteboard.
            <br />
            <span className="text-[var(--color-accent)]">Just build something.</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Companies here don&apos;t care if you memorized binary tree traversal.
            They care if you can ship. Your interviewer will watch you use Claude. That&apos;s the test.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/jobs?role=engineer" className="btn btn-primary btn-lg">
              Browse Engineering Jobs
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
                  <span>&quot;Reverse this binary tree on a whiteboard&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>&quot;No IDE, no autocomplete, no Google&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>6 rounds of algorithm hazing</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-error)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Tests skills you&apos;ll never use on the job</span>
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
                  <span>&quot;Build this feature using your actual tools&quot;</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use Cursor, Claude, Copilot&mdash;whatever you want</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Know exactly how you&apos;ll be tested upfront</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tests how you actually work</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sample Jobs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-8">Sample engineering roles</h2>
          <div className="space-y-4">
            {sampleJobs.map((job, i) => (
              <div key={i} className="card">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-[var(--color-text-muted)]">{job.company}</p>
                  </div>
                  <div className="text-[var(--color-accent)] font-mono text-lg">
                    {job.salary}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tools.map((tool, j) => (
                    <span key={j} className="badge badge-accent">{tool}</span>
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
            <Link href="/jobs?role=engineer" className="btn btn-primary">
              View All Engineering Jobs
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
