export default function MCPSetup({ navigate }) {
  const configExample = `{
  "mcpServers": {
    "vibejobs": {
      "command": "npx",
      "args": ["-y", "@vibejobs/mcp-server"],
      "env": {
        "VIBEJOBS_API_TOKEN": "your-api-token-here"
      }
    }
  }
}`

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
            <span className="text-[var(--color-text-primary)]">Setup Guide</span>
          </div>

          <h1 className="text-display text-display-lg mb-4">MCP Setup Guide</h1>
          <p className="text-[var(--color-text-muted)] mb-12">
            Get Vibe Jobs working with Claude Desktop in 5 minutes
          </p>

          {/* Prerequisites */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
            <div className="card">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium">Claude Desktop app</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Download from <a href="https://claude.ai/download" className="text-[var(--color-accent)] hover:underline">claude.ai/download</a>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium">Vibe Jobs account</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      <button onClick={() => navigate('signup')} className="text-[var(--color-accent)] hover:underline">Sign up</button> if you haven't already
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium">Node.js 18+</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Required to run the MCP server
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Step 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                1
              </div>
              <h2 className="text-xl font-semibold">Generate your API token</h2>
            </div>
            <div className="card ml-12">
              <p className="text-[var(--color-text-secondary)] mb-4">
                Go to your dashboard and generate an API token for MCP access.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('employee-mcp')}
                  className="btn btn-secondary text-sm"
                >
                  Job Seeker Token
                </button>
                <button
                  onClick={() => navigate('employer-mcp')}
                  className="btn btn-secondary text-sm"
                >
                  Employer Token
                </button>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-yellow-400">Keep your token secure</p>
                    <p className="text-[var(--color-text-muted)]">
                      Never share your API token or commit it to version control.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                2
              </div>
              <h2 className="text-xl font-semibold">Configure Claude Desktop</h2>
            </div>
            <div className="card ml-12">
              <p className="text-[var(--color-text-secondary)] mb-4">
                Open your Claude Desktop configuration file and add the Vibe Jobs MCP server:
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-mono text-xs text-[var(--color-text-muted)] mb-2">macOS</p>
                  <code className="block bg-[var(--color-bg-tertiary)] rounded-lg px-4 py-2 text-sm font-mono">
                    ~/Library/Application Support/Claude/claude_desktop_config.json
                  </code>
                </div>
                <div>
                  <p className="text-mono text-xs text-[var(--color-text-muted)] mb-2">Windows</p>
                  <code className="block bg-[var(--color-bg-tertiary)] rounded-lg px-4 py-2 text-sm font-mono">
                    %APPDATA%\Claude\claude_desktop_config.json
                  </code>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-mono text-xs text-[var(--color-text-muted)] mb-2">Configuration</p>
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-[var(--color-text-primary)]">{configExample}</pre>
                </div>
                <button className="btn btn-ghost text-sm mt-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy configuration
                </button>
              </div>
            </div>
          </section>

          {/* Step 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                3
              </div>
              <h2 className="text-xl font-semibold">Restart Claude Desktop</h2>
            </div>
            <div className="card ml-12">
              <p className="text-[var(--color-text-secondary)] mb-4">
                After saving your configuration, restart Claude Desktop to load the Vibe Jobs MCP server.
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                You should see a small hammer icon in the input area indicating MCP tools are available.
              </p>
            </div>
          </section>

          {/* Step 4 */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-[var(--color-bg-primary)]">
                4
              </div>
              <h2 className="text-xl font-semibold">Test the connection</h2>
            </div>
            <div className="card ml-12">
              <p className="text-[var(--color-text-secondary)] mb-4">
                Try asking Claude about Vibe Jobs to verify everything is working:
              </p>
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-sm">
                <p className="text-[var(--color-accent)]">"Show me my Vibe Jobs profile"</p>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] mt-4">
                Claude should display your profile information from Vibe Jobs.
              </p>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <div className="card">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">MCP server not loading</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Make sure Node.js 18+ is installed and the config file is valid JSON. Try running
                    <code className="mx-1 px-2 py-0.5 bg-[var(--color-bg-tertiary)] rounded">npx -y @vibejobs/mcp-server</code>
                    directly to check for errors.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Authentication errors</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Verify your API token is correct and hasn't expired. Generate a new token from your dashboard if needed.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Commands not recognized</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Make sure you're using Claude Desktop (not claude.ai in browser) and the hammer icon is visible in the input area.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Next steps */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Next steps</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('mcp-job-seekers')}
                className="card hover:border-[var(--color-accent)] transition-colors text-left"
              >
                <h3 className="font-semibold mb-2">For Job Seekers</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Learn commands for browsing jobs and applying
                </p>
              </button>
              <button
                onClick={() => navigate('mcp-employers')}
                className="card hover:border-[var(--color-accent)] transition-colors text-left"
              >
                <h3 className="font-semibold mb-2">For Employers</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Learn commands for managing jobs and applicants
                </p>
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
