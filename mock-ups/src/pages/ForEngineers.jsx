export default function ForEngineers({ navigate }) {
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
          <button className="btn btn-primary">Create profile</button>
        </div>
      </nav>

      {/* Hero */}
      <main className="container">
        <div className="flex flex-col items-center text-center pt-16 pb-20">

          {/* Back link */}
          <button
            onClick={() => navigate('talent')}
            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-12 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All roles
          </button>

          {/* Badge */}
          <div className="badge badge-accent mb-8">
            For Engineers
          </div>

          {/* Main headline - THE anti-LeetCode statement */}
          <h1 className="text-display text-display-lg max-w-4xl mb-6">
            No LeetCode. No whiteboard.
            <br />
            <span className="text-[var(--color-accent)]">Just build something.</span>
          </h1>

          {/* Subhead */}
          <p className="text-large max-w-2xl mb-12">
            Companies here don't care if you memorized binary tree traversal.
            They care if you can ship.
          </p>

          {/* CTA */}
          <button className="btn btn-primary text-lg px-10 py-4 mb-8">
            Browse engineering jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Tool badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="badge">Cursor</span>
            <span className="badge">Claude Code</span>
            <span className="badge">GitHub Copilot</span>
            <span className="badge">Codeium</span>
            <span className="badge">Windsurf</span>
            <span className="badge">v0</span>
          </div>
        </div>

        {/* How interviews work here */}
        <div className="border-t border-[var(--color-border)] pt-20 pb-16">
          <h2 className="text-center mb-4">How interviews work here</h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto">
            Every job post tells you exactly how you'll be tested. No surprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-4">COMMON FORMAT</div>
              <h3 className="mb-3">1-hour live build</h3>
              <p className="text-sm mb-4">
                "We'll give you a problem and watch you solve it. Use Cursor, Claude, whatever makes you fast. We want to see how you think and ship."
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                AI tools encouraged
              </div>
            </div>

            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-4">COMMON FORMAT</div>
              <h3 className="mb-3">24-hour take-home</h3>
              <p className="text-sm mb-4">
                "Build a small feature end-to-end. Deploy it somewhere. Show us the code, the commits, and walk us through your decisions."
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use any tools you want
              </div>
            </div>

          </div>
        </div>

        {/* Sample Jobs */}
        <div className="py-16">
          <h2 className="text-center mb-4">Sample jobs</h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Real roles from AI-forward companies
          </p>

          <div className="grid gap-6 max-w-3xl mx-auto">

            {/* Job 1 */}
            <div className="card group cursor-pointer hover:border-[var(--color-accent)]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Senior Frontend Engineer
                  </h4>
                  <p className="text-sm">Acme Corp · Remote · Full-time</p>
                </div>
                <span className="badge shrink-0">$180k - $220k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Cursor</span>
                <span className="badge badge-accent">Claude</span>
                <span className="badge badge-accent">React</span>
                <span className="badge badge-accent">TypeScript</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  1-hour live build: We'll share a Figma design and watch you build it using your preferred AI tools. Screen share, think out loud, ship something real.
                </p>
              </div>
            </div>

            {/* Job 2 */}
            <div className="card group cursor-pointer hover:border-[var(--color-accent)]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Full Stack Engineer
                  </h4>
                  <p className="text-sm">StartupXYZ · San Francisco · Hybrid</p>
                </div>
                <span className="badge shrink-0">$160k - $200k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Claude Code</span>
                <span className="badge badge-accent">Copilot</span>
                <span className="badge badge-accent">Next.js</span>
                <span className="badge badge-accent">Python</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  24-hour take-home: Build an API endpoint and a small UI that consumes it. Deploy to Vercel or similar. We'll review together and discuss your choices.
                </p>
              </div>
            </div>

            {/* Job 3 */}
            <div className="card group cursor-pointer hover:border-[var(--color-accent)]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Backend Engineer, AI Infrastructure
                  </h4>
                  <p className="text-sm">AI Labs Inc · Remote · Full-time</p>
                </div>
                <span className="badge shrink-0">$200k - $280k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Claude Code</span>
                <span className="badge badge-accent">Cursor</span>
                <span className="badge badge-accent">Go</span>
                <span className="badge badge-accent">Kubernetes</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  Pair programming session: We'll work on a real issue from our backlog together. You drive, use any tools. We're evaluating how you debug and collaborate.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <button className="btn btn-secondary">
              View all engineering jobs
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-[var(--color-border)] py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mb-4">Ready to find a job that fits how you work?</h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Create a profile, list your AI tools, and start applying to companies that get it.
            </p>
            <button className="btn btn-primary text-lg px-10 py-4">
              Create your profile
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For engineers who ship with AI
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">About</a>
            <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Help</a>
            <a href="#" className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">MCP Docs</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
