import Link from 'next/link'

export default function EmployersHub() {
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
          <Link href="/talent" className="btn btn-ghost">Browse Talent</Link>
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup" className="btn btn-primary">Post a Job</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Hire people who already work <span className="text-[var(--color-accent)]">the way you want them to</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto">
            Find engineers and product people who ship faster with AI.
            No more wondering if candidates can actually use the tools&mdash;that&apos;s how they apply.
          </p>
        </div>

        {/* Role Selection */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-center text-lg text-[var(--color-text-muted)] mb-8">
            Who are you looking to hire?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/hire/engineers" className="card card-interactive group">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <svg className="w-7 h-7 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hire an Engineer</h3>
              <p className="text-[var(--color-text-muted)]">
                Find devs who use Cursor, Claude, and Copilot daily. Test how they actually build.
              </p>
              <div className="mt-4 text-[var(--color-accent)] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Post engineering role
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            <Link href="/hire/product" className="card card-interactive group">
              <div className="w-14 h-14 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                <svg className="w-7 h-7 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hire a Product Person</h3>
              <p className="text-[var(--color-text-muted)]">
                Find PMs who use AI to ship specs, research, and strategy faster.
              </p>
              <div className="mt-4 text-[var(--color-secondary)] text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Post product role
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>

        {/* Why Vibe Jobs */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-12">Why post on Vibe Jobs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Pre-filtered candidates</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Everyone here used an LLM to create their profile. That&apos;s the first filter.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Tool matching</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                See which candidates already use the AI tools your team uses.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Transparent testing</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Define your test format upfront. Attract candidates who are ready for it.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/signup?type=employer" className="btn btn-primary btn-lg">
            Post Your First Job
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Free for v1. No credit card required.
          </p>
        </div>
      </main>
    </div>
  )
}
