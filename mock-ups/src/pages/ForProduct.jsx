export default function ForProduct({ navigate }) {
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
            For Product
          </div>

          {/* Main headline */}
          <h1 className="text-display text-display-lg max-w-4xl mb-6">
            No hypotheticals. No whiteboards.
            <br />
            <span className="text-[var(--color-accent)]">Just make something real.</span>
          </h1>

          {/* Subhead */}
          <p className="text-large max-w-2xl mb-12">
            Companies here don't want to hear how you'd theoretically approach it.
            They want to see you do it.
          </p>

          {/* CTA */}
          <button className="btn btn-primary text-lg px-10 py-4 mb-8">
            Browse product jobs
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          {/* Tool badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="badge">ChatGPT</span>
            <span className="badge">Claude</span>
            <span className="badge">Notion AI</span>
            <span className="badge">Perplexity</span>
            <span className="badge">Figma AI</span>
            <span className="badge">Gamma</span>
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
              <h3 className="mb-3">2-hour PRD sprint</h3>
              <p className="text-sm mb-4">
                "We'll describe a feature. Write a product spec in 2 hours using whatever tools you want. Walk us through your thinking and tradeoffs."
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
              <h3 className="mb-3">Strategy deep-dive</h3>
              <p className="text-sm mb-4">
                "Show us a past product decision. How would you use AI to research it faster? Walk us through your process and what you'd do differently now."
              </p>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <svg className="w-4 h-4 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Show your real workflow
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
                    Product Manager, AI Platform
                  </h4>
                  <p className="text-sm">Acme AI · San Francisco · Hybrid</p>
                </div>
                <span className="badge shrink-0">$160k - $200k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">ChatGPT</span>
                <span className="badge badge-accent">Claude</span>
                <span className="badge badge-accent">Notion AI</span>
                <span className="badge badge-accent">Perplexity</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  2-hour PRD sprint: We'll describe a feature we're considering. Write a spec, prioritize requirements, and define success metrics. Use any tools.
                </p>
              </div>
            </div>

            {/* Job 2 */}
            <div className="card group cursor-pointer hover:border-[var(--color-accent)]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Senior Product Designer
                  </h4>
                  <p className="text-sm">StartupXYZ · Remote · Full-time</p>
                </div>
                <span className="badge shrink-0">$150k - $180k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Figma AI</span>
                <span className="badge badge-accent">Midjourney</span>
                <span className="badge badge-accent">Claude</span>
                <span className="badge badge-accent">v0</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  Design challenge: Take a product problem and explore solutions. Show us your AI-augmented process — from research to wireframes to high-fidelity.
                </p>
              </div>
            </div>

            {/* Job 3 */}
            <div className="card group cursor-pointer hover:border-[var(--color-accent)]">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Head of Product
                  </h4>
                  <p className="text-sm">AI Labs Inc · New York · Hybrid</p>
                </div>
                <span className="badge shrink-0">$220k - $300k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Claude</span>
                <span className="badge badge-accent">Perplexity</span>
                <span className="badge badge-accent">Gamma</span>
                <span className="badge badge-accent">Notion AI</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  Strategy session: Present a go-to-market strategy for a new AI feature. Show how you'd use AI to accelerate research, competitive analysis, and positioning.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <button className="btn btn-secondary">
              View all product jobs
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
            Vibe Jobs · For product people who ship with AI
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
