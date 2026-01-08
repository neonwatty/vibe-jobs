export default function MCPEmployers({ navigate }) {
  const commands = [
    {
      category: 'Browse Talent',
      items: [
        {
          example: '"Find engineers who use Cursor and Claude"',
          description: 'Search candidates by AI tools',
        },
        {
          example: '"Show me senior React developers who are actively looking"',
          description: 'Filter by experience and availability',
        },
        {
          example: '"Find candidates in the San Francisco area"',
          description: 'Filter by location',
        },
        {
          example: '"Tell me more about Alex Chen\'s profile"',
          description: 'Get detailed candidate information',
        },
      ],
    },
    {
      category: 'Manage Jobs',
      items: [
        {
          example: '"Show me my active job postings"',
          description: 'List your current job posts',
        },
        {
          example: '"How many applicants for the Frontend Engineer role?"',
          description: 'Check application counts',
        },
        {
          example: '"Close the Marketing Manager position"',
          description: 'Update job status',
        },
        {
          example: '"Create a new job posting for a DevOps Engineer"',
          description: 'Start a new job post',
        },
      ],
    },
    {
      category: 'Review Applicants',
      items: [
        {
          example: '"Show me new applicants for the Frontend Engineer role"',
          description: 'View recent applications',
        },
        {
          example: '"Show me the top matched candidates for the Senior Developer role"',
          description: 'See candidates sorted by AI tool match',
        },
        {
          example: '"What AI tools does Sarah Kim use?"',
          description: 'Check candidate details',
        },
        {
          example: '"Move Alex Chen to interviewing for the Frontend role"',
          description: 'Update application status',
        },
        {
          example: '"Send a message to the top 3 candidates for the Designer role"',
          description: 'Reach out to candidates',
        },
      ],
    },
    {
      category: 'Company Profile',
      items: [
        {
          example: '"Show my company profile"',
          description: 'View your company details',
        },
        {
          example: '"Update our AI culture to AI Required"',
          description: 'Change AI culture badge',
        },
        {
          example: '"Add Cursor to our company tools"',
          description: 'Update tools your team uses',
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
            <span className="text-[var(--color-text-primary)]">For Employers</span>
          </div>

          <h1 className="text-display text-display-lg mb-4">MCP Commands for Employers</h1>
          <p className="text-[var(--color-text-muted)] mb-12">
            Manage your hiring through Claude
          </p>

          {/* Quick start */}
          <section className="mb-12">
            <div className="card border-[var(--color-accent)]">
              <h2 className="text-lg font-semibold mb-4">Quick start</h2>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Once you've set up MCP, manage your entire hiring workflow through conversation:
              </p>
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-6 font-mono text-sm space-y-4">
                <div>
                  <p className="text-[var(--color-text-muted)]">1. Check new applications:</p>
                  <p className="text-[var(--color-accent)]">"Show me new applicants for my open roles"</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">2. Review candidates:</p>
                  <p className="text-[var(--color-accent)]">"Who are the best matched candidates for the Frontend role?"</p>
                </div>
                <div>
                  <p className="text-[var(--color-text-muted)]">3. Take action:</p>
                  <p className="text-[var(--color-accent)]">"Move the top 3 to interviewing and send them a message"</p>
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

          {/* Hiring workflow */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Example hiring workflow</h2>
            <div className="card">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)] shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium mb-1">Morning check-in</p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      "Show me a summary of my hiring pipeline. How many new applicants overnight?"
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)] shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium mb-1">Quick review</p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      "Show me the new applicants sorted by AI tool match. Tell me about the top 5."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)] shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium mb-1">Batch actions</p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      "Move the first three to interviewing. For candidates 4 and 5, mark as reviewed."
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)] shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium mb-1">Outreach</p>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">
                      "Draft a message to the interviewing candidates about scheduling a technical screen."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                    <p className="font-medium">Use batch operations</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Instead of reviewing candidates one by one, ask Claude to show you the top matches and take batch actions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-medium">Let Claude draft messages</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Claude can personalize outreach based on each candidate's profile and your role requirements.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div>
                    <p className="font-medium">Ask for comparisons</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      "Compare the top 3 candidates" gives you a quick side-by-side of skills and tool match.
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
                onClick={() => navigate('mcp-job-seekers')}
                className="btn btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                For Job Seekers
              </button>
              <button
                onClick={() => navigate('mcp-setup')}
                className="btn btn-ghost"
              >
                Setup Guide
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
