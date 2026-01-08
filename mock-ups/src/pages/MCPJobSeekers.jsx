export default function MCPJobSeekers({ navigate }) {
  const commands = [
    {
      category: 'Browse Jobs',
      items: [
        {
          example: '"Find frontend jobs that use Cursor"',
          description: 'Search jobs by AI tools required',
        },
        {
          example: '"Show me remote jobs paying over $150k"',
          description: 'Filter by salary and location',
        },
        {
          example: '"Find senior engineer roles at companies that expect AI fluency"',
          description: 'Filter by AI culture level',
        },
        {
          example: '"Tell me more about the job at Acme Corp"',
          description: 'Get detailed job information',
        },
        {
          example: '"How will I be tested for the TechStartup role?"',
          description: 'See interview process details',
        },
      ],
    },
    {
      category: 'Apply to Jobs',
      items: [
        {
          example: '"Apply to the Senior Engineer role at Acme Corp"',
          description: 'Quick apply with your saved profile',
        },
        {
          example: '"Apply to this job with a cover letter about my React experience"',
          description: 'Apply with a custom cover letter',
        },
        {
          example: '"Save this job for later"',
          description: 'Bookmark jobs to review later',
        },
      ],
    },
    {
      category: 'Track Applications',
      items: [
        {
          example: '"Show me my applications"',
          description: 'List all your job applications',
        },
        {
          example: '"What\'s the status of my application to TechStartup?"',
          description: 'Check specific application status',
        },
        {
          example: '"Show me jobs I\'ve been invited to interview for"',
          description: 'Filter by application status',
        },
        {
          example: '"Show my saved jobs"',
          description: 'View bookmarked jobs',
        },
      ],
    },
    {
      category: 'Manage Profile',
      items: [
        {
          example: '"Show my profile"',
          description: 'View your current profile',
        },
        {
          example: '"Add v0 and Claude Code to my AI tools"',
          description: 'Update your AI tool list',
        },
        {
          example: '"Set my availability to actively looking"',
          description: 'Update job search status',
        },
        {
          example: '"Update my headline to Senior AI Engineer"',
          description: 'Change profile details',
        },
      ],
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
          <button onClick={() => navigate('mcp-overview')} className="btn btn-ghost">MCP Overview</button>
          <button onClick={() => navigate('signup')} className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
            <button onClick={() => navigate('mcp-overview')} className="hover:text-[var(--color-text-primary)]">
              MCP Docs
            </button>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">For Job Seekers</span>
          </div>

          <h1 className="text-display text-display-lg mb-4">MCP Commands for Job Seekers</h1>
          <p className="text-[var(--color-text-muted)] mb-12">
            Everything you can do with Vibe Jobs through Claude
          </p>

          {/* Quick start */}
          <section className="mb-12">
            <div className="card border-[var(--color-accent)]">
              <h2 className="text-lg font-semibold mb-4">Quick start</h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Once you've set up MCP, just talk to Claude naturally. Here's a typical job search flow:
              </p>
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-6 font-mono text-sm space-y-4">
                <div>
                  <p className="text-[var(--color-text-muted)]">1. Find jobs:</p>
                  <p className="text-[var(--color-accent)]">"Find me senior frontend jobs that use Cursor, paying at least $180k"</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">2. Get details:</p>
                  <p className="text-[var(--color-accent)]">"Tell me more about the first one. How will I be tested?"</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">3. Apply:</p>
                  <p className="text-[var(--color-accent)]">"Apply to this job with a cover letter about my experience building design systems"</p>
                </div>
              </div>
            </div>
          </section>

          {/* Commands by category */}
          {commands.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-xl font-semibold mb-6">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map((item, j) => (
                  <div key={j} className="card">
                    <div className="flex items-start justify-between gap-4">
                      <div className="bg-[var(--color-bg-tertiary)] rounded-lg px-4 py-2 font-mono text-sm text-[var(--color-accent)]">
                        {item.example}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] mt-3">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Tips */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Tips for best results</h2>
            <div className="card">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-medium">Be specific about your requirements</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Include salary range, location preferences, and required AI tools for better matches.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-medium">Use follow-up questions</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Claude remembers context, so you can say "tell me more about the second one" or "what about remote-only?"
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-medium">Let Claude help with cover letters</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Claude can read the job description and your profile to craft a personalized cover letter.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Navigation */}
          <section>
            <div className="flex justify-between">
              <button
                onClick={() => navigate('mcp-setup')}
                className="btn btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Setup Guide
              </button>
              <button
                onClick={() => navigate('mcp-employers')}
                className="btn btn-ghost"
              >
                For Employers
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-16">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For people who ship with AI
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate('help')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Help</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
