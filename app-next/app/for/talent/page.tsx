import Link from 'next/link'

export default function TalentHub() {
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
          <Link href="/jobs" className="btn btn-ghost">Browse Jobs</Link>
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Find jobs where employers <span className="text-[var(--color-accent)]">want</span> you to use AI
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto">
            No more hiding your tools. No more LeetCode theater.
            Work at companies that embrace how you actually work.
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-lg text-[var(--color-text-muted)] mb-8">
            Choose your path
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/for/engineers" className="card card-interactive group">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">I&apos;m an Engineer</h3>
              <p className="text-[var(--color-text-muted)]">
                Find roles where Cursor isn&apos;t cheating&mdash;it&apos;s expected.
              </p>
              <div className="mt-4 text-[var(--color-accent)] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                View engineering roles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/for/product" className="card card-interactive group">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                <svg className="w-7 h-7 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">I&apos;m in Product</h3>
              <p className="text-[var(--color-text-muted)]">
                Show them how you actually think and build&mdash;not hypotheticals.
              </p>
              <div className="mt-4 text-[var(--color-secondary)] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                View product roles
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Parse your resume</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Use Claude or ChatGPT to convert your resume to our JSON format. It takes 30 seconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Add your AI tools</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                List the AI tools you use daily. See your match percentage on every job.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">One-click apply</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Apply instantly with your profile. Know exactly how you&apos;ll be tested before you apply.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
