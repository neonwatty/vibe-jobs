export default function MCPOverview({ navigate }) {
  const features = [
    {
      title: 'Browse jobs naturally',
      description: 'Ask Claude to find jobs matching your skills and preferences.',
      example: '"Find me remote frontend jobs that use Cursor and pay over $150k"',
    },
    {
      title: 'Apply with context',
      description: 'Apply to jobs without leaving your AI workflow.',
      example: '"Apply to the Senior Engineer role at Acme Corp with a cover letter about my React experience"',
    },
    {
      title: 'Manage your profile',
      description: 'Update your AI tools, availability, and preferences through conversation.',
      example: '"Update my profile to show I\'m actively looking and add v0 to my tools"',
    },
    {
      title: 'Track applications',
      description: 'Check application status and get updates on your job search.',
      example: '"What\'s the status of my application to TechStartup?"',
    },
  ]

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
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="badge badge-accent mb-6">MCP Integration</div>
          <h1 className="text-display text-display-xl mb-6">
            Use Vibe Jobs through
            <span className="block text-[var(--color-accent)]">Claude and AI assistants</span>
          </h1>
          <p className="text-display text-display-md text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            Vibe Jobs supports MCP (Model Context Protocol), so you can browse jobs, apply, and manage your profile directly through Claude.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('mcp-setup')}
              className="btn btn-primary"
            >
              Set Up MCP
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => navigate('mcp-job-seekers')}
              className="btn btn-secondary"
            >
              View Commands
            </button>
          </div>
        </div>

        {/* What is MCP */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="card">
            <h2 className="text-display text-xl mb-6">What is MCP?</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)]">
              <p>
                <strong className="text-[var(--color-text-primary)]">Model Context Protocol (MCP)</strong> is
                an open standard that allows AI assistants like Claude to interact with external services
                and tools.
              </p>
              <p>
                With MCP, you can use Vibe Jobs directly from Claude Desktop, Claude.ai, or any other
                MCP-compatible AI tool. Instead of switching between browser tabs, you can manage your
                entire job search through natural conversation.
              </p>
              <p>
                This is especially powerful for AI-native workers who already spend much of their day
                working with AI assistants.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-display text-xl text-center mb-12">What you can do with MCP</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  {feature.description}
                </p>
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-3">
                  <p className="text-sm font-mono text-[var(--color-accent)]">
                    {feature.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo */}
        <section className="max-w-3xl mx-auto mb-16">
          <div className="card border-[var(--color-accent)]">
            <h2 className="text-display text-xl mb-6">See it in action</h2>
            <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-6 font-mono text-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-[var(--color-text-muted)]">You:</p>
                  <p className="text-[var(--color-text-primary)]">
                    Find me senior frontend jobs at companies that use Cursor and Claude, paying at least $180k
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">Claude:</p>
                  <p className="text-[var(--color-text-primary)]">
                    I found 12 matching jobs. Here are the top 3:
                  </p>
                  <div className="mt-3 space-y-2 pl-4 border-l-2 border-[var(--color-accent)]">
                    <p>1. <span className="text-[var(--color-accent)]">Senior Frontend Engineer</span> at Acme Corp - $180k-$220k (Remote)</p>
                    <p>2. <span className="text-[var(--color-accent)]">Staff React Developer</span> at TechStartup - $190k-$240k (Remote)</p>
                    <p>3. <span className="text-[var(--color-accent)]">Frontend Lead</span> at DevTools Inc - $185k-$225k (Hybrid)</p>
                  </div>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">You:</p>
                  <p className="text-[var(--color-text-primary)]">
                    Tell me more about the Acme Corp role. How will I be tested?
                  </p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">Claude:</p>
                  <p className="text-[var(--color-text-primary)]">
                    The interview process is a 1-hour live build: They'll give you a Figma design and watch you build it with your AI tools...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-display text-xl text-center mb-8">Get started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('mcp-setup')}
              className="card hover:border-[var(--color-accent)] transition-colors text-left"
            >
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">01</div>
              <h3 className="font-semibold mb-2">Set up MCP</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Configure Claude Desktop to connect to Vibe Jobs
              </p>
            </button>
            <button
              onClick={() => navigate('mcp-job-seekers')}
              className="card hover:border-[var(--color-accent)] transition-colors text-left"
            >
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">02</div>
              <h3 className="font-semibold mb-2">For job seekers</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Commands for browsing jobs and managing applications
              </p>
            </button>
            <button
              onClick={() => navigate('mcp-employers')}
              className="card hover:border-[var(--color-accent)] transition-colors text-left"
            >
              <div className="text-mono text-[var(--color-accent)] text-sm mb-3">03</div>
              <h3 className="font-semibold mb-2">For employers</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Commands for managing jobs and reviewing applicants
              </p>
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
            <button onClick={() => navigate('about')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">About</button>
            <button onClick={() => navigate('help')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Help</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
