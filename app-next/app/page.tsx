import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-grid flex flex-col">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/for/talent" className="btn btn-ghost hidden md:inline-flex">For Talent</Link>
          <Link href="/for/employers" className="btn btn-ghost hidden md:inline-flex">For Employers</Link>
          <Link href="/jobs" className="btn btn-ghost">Browse Jobs</Link>
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container py-20 flex-1">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-display text-5xl md:text-6xl mb-6">
            Find jobs that embrace <span className="text-[var(--color-accent)]">AI tools</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            The job board for AI-native professionals. No LeetCode, no whiteboard algorithms.
            Just practical skills with the tools you actually use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/for/talent" className="btn btn-primary btn-lg w-full sm:w-auto">
              Find a Job
            </Link>
            <Link href="/for/employers" className="btn btn-secondary btn-lg w-full sm:w-auto">
              Post a Job
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card text-center">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Transparent Testing</h3>
            <p className="text-[var(--color-text-muted)]">
              Know exactly how you&apos;ll be evaluated. No surprises, no gotchas.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Tool Matching</h3>
            <p className="text-[var(--color-text-muted)]">
              Find jobs that match your AI toolkit. See your match percentage instantly.
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Employers</h3>
            <p className="text-[var(--color-text-muted)]">
              Work with companies that actually embrace AI-forward workflows.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)]">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-display text-lg tracking-tight hover:opacity-80 transition-opacity"
              >
                vibe<span className="text-[var(--color-accent)]">jobs</span>
              </Link>
              <span className="text-[var(--color-text-muted)] text-sm">
                The anti-LeetCode job board
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                About
              </Link>
              <Link href="/help" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Help
              </Link>
              <Link href="/jobs" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Jobs
              </Link>
              <Link href="/talent" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
                Talent
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
