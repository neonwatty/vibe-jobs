import { useState } from 'react'

export default function EmployerMCP({ navigate }) {
  const [showToken, setShowToken] = useState(false)
  const [token, setToken] = useState(null)
  const [copied, setCopied] = useState(false)

  const generateToken = () => {
    // Simulate token generation
    setToken('vj_emp_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    setShowToken(true)
  }

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const revokeToken = () => {
    setToken(null)
    setShowToken(false)
  }

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
          <button onClick={() => navigate('talent-listings')} className="btn btn-ghost">Browse Talent</button>
          <button onClick={() => navigate('employer-dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </nav>

      <main className="container py-12">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
            <button onClick={() => navigate('employer-dashboard')} className="hover:text-[var(--color-text-primary)]">
              Dashboard
            </button>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">MCP Access</span>
          </div>

          <h1 className="text-display text-display-lg mb-4">MCP Access</h1>
          <p className="text-[var(--color-text-muted)] mb-8">
            Manage your hiring through Claude and other MCP-compatible AI tools
          </p>

          {/* What is MCP */}
          <div className="card mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold mb-2">What can you do with MCP?</h2>
                <ul className="text-sm text-[var(--color-text-muted)] space-y-1">
                  <li>• Browse and search candidates through natural conversation</li>
                  <li>• Review applicants and update their status</li>
                  <li>• Manage job postings without leaving your workflow</li>
                  <li>• Draft personalized outreach messages</li>
                </ul>
                <button
                  onClick={() => navigate('mcp-overview')}
                  className="text-sm text-[var(--color-accent)] hover:underline mt-3"
                >
                  Learn more about MCP →
                </button>
              </div>
            </div>
          </div>

          {/* API Token */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">API Token</h2>

            {!token ? (
              <div>
                <p className="text-[var(--color-text-muted)] mb-6">
                  Generate an API token to connect Claude Desktop to your Vibe Jobs employer account.
                </p>
                <button
                  onClick={generateToken}
                  className="btn btn-primary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Generate API Token
                </button>
              </div>
            ) : (
              <div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-medium text-yellow-400">Save this token now</p>
                      <p className="text-[var(--color-text-muted)]">
                        This token will only be shown once. Copy it and store it securely.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                    YOUR API TOKEN
                  </label>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 font-mono text-sm overflow-hidden">
                      {showToken ? token : '•'.repeat(40)}
                    </div>
                    <button
                      onClick={() => setShowToken(!showToken)}
                      className="btn btn-ghost"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {showToken ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        )}
                      </svg>
                    </button>
                    <button
                      onClick={copyToken}
                      className="btn btn-secondary"
                    >
                      {copied ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={revokeToken}
                    className="btn btn-ghost text-red-400"
                  >
                    Revoke Token
                  </button>
                  <button
                    onClick={() => navigate('mcp-setup')}
                    className="btn btn-secondary"
                  >
                    View Setup Guide
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Setup */}
          {token && (
            <div className="card mb-8">
              <h2 className="text-lg font-semibold mb-4">Quick Setup</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">
                Add this to your Claude Desktop configuration file:
              </p>
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-[var(--color-text-primary)]">{`{
  "mcpServers": {
    "vibejobs": {
      "command": "npx",
      "args": ["-y", "@vibejobs/mcp-server"],
      "env": {
        "VIBEJOBS_API_TOKEN": "${token}"
      }
    }
  }
}`}</pre>
              </div>
              <button
                onClick={() => navigate('mcp-setup')}
                className="text-sm text-[var(--color-accent)] hover:underline mt-4"
              >
                Full setup instructions →
              </button>
            </div>
          )}

          {/* Use Cases */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Common use cases</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="font-mono text-sm text-[var(--color-accent)] mb-2">
                  "Show me new applicants for my open roles, sorted by AI tool match"
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Get a quick summary of your hiring pipeline
                </p>
              </div>
              <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="font-mono text-sm text-[var(--color-accent)] mb-2">
                  "Move the top 3 candidates for the Frontend role to interviewing"
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Take batch actions on applications
                </p>
              </div>
              <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg">
                <p className="font-mono text-sm text-[var(--color-accent)] mb-2">
                  "Draft a message to Alex Chen about scheduling a technical screen"
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Let Claude help with candidate outreach
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate('mcp-employers')}
              className="card hover:border-[var(--color-accent)] transition-colors text-left"
            >
              <h3 className="font-semibold mb-2">MCP Commands</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                See all commands for managing hiring
              </p>
            </button>
            <button
              onClick={() => navigate('help')}
              className="card hover:border-[var(--color-accent)] transition-colors text-left"
            >
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Troubleshooting and FAQ
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
