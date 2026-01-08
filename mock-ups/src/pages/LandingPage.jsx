export default function LandingPage({ navigate }) {
  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <div className="text-display text-xl tracking-tight">
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('login')} className="btn btn-ghost">Log in</button>
          <button onClick={() => navigate('signup')} className="btn btn-secondary">Sign up</button>
        </div>
      </nav>

      {/* Hero */}
      <main className="container">
        <div className="flex flex-col items-center text-center pt-24 pb-32">

          {/* Main headline */}
          <h1 className="text-display text-display-xl max-w-4xl mb-6 stagger-children">
            <span className="block">The job board for</span>
            <span className="block text-[var(--color-accent)]">AI-native workers.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-display text-display-md text-[var(--color-text-secondary)] max-w-2xl mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            AI fluency is what really matters.
          </p>

          {/* Subhead */}
          <p className="text-large max-w-2xl mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Find employers who want you to ship with Claude, Cursor, and Copilot.
            <br />
            Or hire people who already work the way you want them to.
          </p>

          {/* Split CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => navigate('talent')}
              className="btn btn-primary text-lg px-10 py-4"
            >
              Find a job
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => navigate('employers')}
              className="btn btn-secondary text-lg px-10 py-4"
            >
              Post a job
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* How it works - quick hits */}
        <div className="border-t border-[var(--color-border)] pt-24 pb-16">
          <div className="grid md:grid-cols-3 gap-12 stagger-children">

            <div className="text-center">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-4">01</div>
              <h3 className="mb-3">Show your stack</h3>
              <p>
                List the AI tools you actually use. Claude, Cursor, ChatGPT, Midjourney — whatever makes you fast.
              </p>
            </div>

            <div className="text-center">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-4">02</div>
              <h3 className="mb-3">Know the test upfront</h3>
              <p>
                Every job post tells you exactly how you'll be interviewed. No surprises. No LeetCode ambushes.
              </p>
            </div>

            <div className="text-center">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-4">03</div>
              <h3 className="mb-3">Get hired to ship</h3>
              <p>
                Work for companies that judge you on output, not on whether you can reverse a linked list by hand.
              </p>
            </div>

          </div>
        </div>

        {/* Sample job cards preview */}
        <div className="pb-24">
          <div className="flex flex-col items-center mb-12">
            <div className="badge badge-accent mb-4">Skip the theater</div>
            <h2 className="text-center">
              Every job shows how you'll be tested
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* Sample Job Card 1 */}
            <div className="card group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Senior Frontend Engineer
                  </h4>
                  <p className="text-sm">Acme Corp · Remote</p>
                </div>
                <span className="badge">$180k - $220k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">Cursor</span>
                <span className="badge badge-accent">Claude</span>
                <span className="badge badge-accent">v0</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 mt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  1-hour live build: We'll give you a design and watch you build it with your AI tools.
                </p>
              </div>
            </div>

            {/* Sample Job Card 2 */}
            <div className="card group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="group-hover:text-[var(--color-accent)] transition-colors">
                    Product Manager, AI Platform
                  </h4>
                  <p className="text-sm">StartupXYZ · San Francisco</p>
                </div>
                <span className="badge">$160k - $200k</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-accent">ChatGPT</span>
                <span className="badge badge-accent">Notion AI</span>
                <span className="badge badge-accent">Perplexity</span>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 mt-4">
                <div className="text-mono text-xs text-[var(--color-text-muted)] mb-2">HOW YOU'LL BE TESTED</div>
                <p className="text-sm">
                  2-hour PRD sprint: Write a spec for a feature we describe. Use whatever tools you want.
                </p>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For people who ship with AI
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
