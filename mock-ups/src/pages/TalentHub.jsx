export default function TalentHub({ navigate }) {
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
          <button className="btn btn-secondary">Sign up</button>
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
            Find jobs where employers{' '}
            <span className="text-[var(--color-accent)]">want</span> you to use AI.
          </h1>

          {/* Subhead */}
          <p className="text-large max-w-xl mb-16">
            No more hiding your tools. No more LeetCode theater.
          </p>

          {/* Role selection */}
          <div className="w-full max-w-3xl">
            <p className="text-[var(--color-text-muted)] mb-8">What's your role?</p>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Engineer Card */}
              <button
                onClick={() => navigate('engineers')}
                className="card group text-left hover:border-[var(--color-accent)] transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:bg-opacity-10 transition-colors">
                    <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="group-hover:text-[var(--color-accent)] transition-colors">Engineer</h3>
                    <p className="text-sm">Software, Frontend, Backend, Full Stack</p>
                  </div>
                </div>

                <p className="text-sm mb-4">
                  Find jobs where Cursor isn't cheating — it's expected. Show employers you can ship, not just solve puzzles.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="badge">Cursor</span>
                  <span className="badge">Claude Code</span>
                  <span className="badge">Copilot</span>
                </div>

                <div className="flex items-center justify-end mt-6 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm mr-2">Browse jobs</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>

              {/* Product Card */}
              <button
                onClick={() => navigate('product')}
                className="card group text-left hover:border-[var(--color-accent)] transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:bg-opacity-10 transition-colors">
                    <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="group-hover:text-[var(--color-accent)] transition-colors">Product</h3>
                    <p className="text-sm">Product Manager, Product Designer</p>
                  </div>
                </div>

                <p className="text-sm mb-4">
                  No more hypothetical case studies. Show employers you can build real specs, fast — with AI in your workflow.
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="badge">ChatGPT</span>
                  <span className="badge">Claude</span>
                  <span className="badge">Notion AI</span>
                </div>

                <div className="flex items-center justify-end mt-6 text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm mr-2">Browse jobs</span>
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
      </main>
    </div>
  )
}
