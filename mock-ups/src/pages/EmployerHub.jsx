export default function EmployerHub({ navigate }) {
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
          <button className="btn btn-ghost">Log in</button>
          <button className="btn btn-primary">Post a job</button>
        </div>
      </nav>

      {/* Hero */}
      <main className="container">
        <div className="flex flex-col items-center text-center pt-16 pb-24">

          {/* Back link */}
          <button
            onClick={() => navigate('landing')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-12 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Main headline */}
          <h1 className="text-display text-display-lg max-w-3xl mb-6">
            Hire people who already work{' '}
            <span className="text-[var(--color-accent)]">the way you want.</span>
          </h1>

          {/* Subhead */}
          <p className="text-large max-w-xl mb-16">
            Find engineers and product people who ship faster with AI.
          </p>

          {/* Role selection */}
          <div className="w-full max-w-3xl">
            <p className="text-[var(--color-text-muted)] mb-8">Who are you hiring?</p>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Hire Engineers Card */}
              <button
                onClick={() => navigate('engineers')}
                className="card group text-left hover:border-[var(--color-secondary)] transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:bg-opacity-10 transition-colors">
                    <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="group-hover:text-[var(--color-secondary)] transition-colors">Hire Engineers</h3>
                    <p className="text-sm">Frontend, Backend, Full Stack</p>
                  </div>
                </div>

                <p className="text-sm mb-4">
                  Find devs who use Cursor, Claude Code, and Copilot daily. Test them on real work, not LeetCode.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-secondary">Cursor</span>
                  <span className="badge badge-secondary">Claude Code</span>
                  <span className="badge badge-secondary">Copilot</span>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 mt-2">
                  <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">SUGGESTED TEST</div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    "1-hour live build with AI tools"
                  </p>
                </div>

                <div className="flex items-center justify-end mt-6 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm mr-2">Post a role</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>

              {/* Hire Product Card */}
              <button
                onClick={() => navigate('product')}
                className="card group text-left hover:border-[var(--color-secondary)] transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--color-secondary)] group-hover:bg-opacity-10 transition-colors">
                    <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="group-hover:text-[var(--color-secondary)] transition-colors">Hire Product</h3>
                    <p className="text-sm">Product Managers, Designers</p>
                  </div>
                </div>

                <p className="text-sm mb-4">
                  Find PMs who use AI to ship specs, research, and strategy faster. See how they actually work.
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-secondary">ChatGPT</span>
                  <span className="badge badge-secondary">Claude</span>
                  <span className="badge badge-secondary">Perplexity</span>
                </div>

                <div className="border-t border-[var(--color-border)] pt-4 mt-2">
                  <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">SUGGESTED TEST</div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    "2-hour PRD sprint with any tools"
                  </p>
                </div>

                <div className="flex items-center justify-end mt-6 text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm mr-2">Post a role</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>

            </div>

            {/* Coming soon */}
            <p className="text-[var(--color-text-muted)] text-sm mt-12">
              Marketing, Sales, and more roles coming soon.
            </p>
          </div>

        </div>

        {/* Why Vibe Jobs */}
        <div className="border-t border-[var(--color-border)] pt-24 pb-16 max-w-3xl mx-auto">
          <h2 className="text-center mb-12">Why post here?</h2>

          <div className="grid gap-8">
            <div className="flex gap-6">
              <div className="text-mono text-[var(--color-secondary)] text-sm shrink-0">01</div>
              <div>
                <h4 className="mb-2">Pre-filtered candidates</h4>
                <p className="text-sm">
                  Everyone here uses AI tools. You're not teaching them — you're hiring people who are already fast.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-mono text-[var(--color-secondary)] text-sm shrink-0">02</div>
              <div>
                <h4 className="mb-2">Transparent interviews</h4>
                <p className="text-sm">
                  Tell candidates exactly how you'll test them. Attract confident people who aren't afraid to show their workflow.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-mono text-[var(--color-secondary)] text-sm shrink-0">03</div>
              <div>
                <h4 className="mb-2">No LeetCode theater</h4>
                <p className="text-sm">
                  Test real skills. Watch them build. Skip the puzzles that don't predict job performance.
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
