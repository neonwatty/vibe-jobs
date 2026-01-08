export default function AboutPage({ navigate }) {
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
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">Browse Jobs</button>
          <button onClick={() => navigate('signup')} className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      <main className="container py-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-display text-display-xl mb-6">
            The job board for
            <span className="block text-[var(--color-accent)]">the AI era</span>
          </h1>
          <p className="text-display text-display-md text-[var(--color-text-secondary)]">
            We're building the place where AI-native workers find companies that work the way they do.
          </p>
        </div>

        {/* The Problem */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="card">
            <h2 className="text-display text-xl mb-6">The Problem</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>
                Traditional hiring is broken for the AI age. Companies still ask candidates to solve
                LeetCode problems by hand, even though no one codes that way anymore. They test for
                skills that don't matter while ignoring the ones that do.
              </p>
              <p>
                Meanwhile, the best workers have completely transformed how they work. They use Cursor
                to ship code 3x faster. They use Claude to think through complex problems. They use
                Midjourney to prototype designs in minutes instead of days.
              </p>
              <p>
                These workers are invisible to traditional job boards. There's no way to show that
                you're AI-fluent. No way to find companies that actually want you to use these tools.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="card border-[var(--color-accent)]">
            <h2 className="text-display text-xl mb-6">Our Solution</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>
                <strong className="text-[var(--color-text-primary)]">Vibe Jobs</strong> is the job board
                where AI proficiency is the primary filter.
              </p>
              <p>
                Job seekers list the AI tools they actually use — not as keywords, but as the core of
                their profile. Employers post jobs with explicit AI requirements and describe exactly
                how candidates will be tested.
              </p>
              <p>
                No more guessing. No more LeetCode ambushes. No more "competitive salary"
                obfuscation. Just honest matching between AI-native workers and companies that
                want them.
              </p>
            </div>
          </div>
        </section>

        {/* Core Beliefs */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-display text-xl mb-8 text-center">What We Believe</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">01</div>
              <h3 className="font-semibold mb-2">AI fluency is a skill</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Knowing how to use AI tools effectively is a real, valuable skill that should be
                recognized and compensated.
              </p>
            </div>
            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">02</div>
              <h3 className="font-semibold mb-2">Transparency works better</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Salary transparency and clear interview processes lead to better matches and less
                wasted time for everyone.
              </p>
            </div>
            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">03</div>
              <h3 className="font-semibold mb-2">Test what matters</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Interviews should reflect actual work. If you'll use AI tools on the job, you
                should use them in the interview.
              </p>
            </div>
            <div className="card">
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">04</div>
              <h3 className="font-semibold mb-2">Output over input</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                We don't care how many years you've been working or where you went to school.
                We care what you can ship.
              </p>
            </div>
          </div>
        </section>

        {/* The Name */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="card">
            <h2 className="text-display text-xl mb-6">Why "Vibe Jobs"?</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>
                The term "vibe coding" emerged to describe a new way of working: using AI to
                iterate rapidly on ideas, letting the tools handle implementation details while
                you focus on the creative direction.
              </p>
              <p>
                It's not about being sloppy or not understanding the code. It's about operating
                at a higher level of abstraction. It's about shipping fast and learning from real
                user feedback instead of over-engineering in isolation.
              </p>
              <p>
                Vibe Jobs is for people who work this way — and companies that want to hire them.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-xl mx-auto text-center">
          <h2 className="text-display text-xl mb-4">Join the movement</h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Whether you're looking for work or hiring, Vibe Jobs is where AI-native careers happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('talent')}
              className="btn btn-primary"
            >
              Find a Job
            </button>
            <button
              onClick={() => navigate('employers')}
              className="btn btn-secondary"
            >
              Post a Job
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-16">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For people who ship with AI
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate('help')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Help</button>
            <button onClick={() => navigate('mcp-overview')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">MCP Docs</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
