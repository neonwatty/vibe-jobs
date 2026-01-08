export default function LoginPage({ navigate }) {
  const handleOAuth = (provider) => {
    // Simulate OAuth login
    alert(`Would authenticate with ${provider} and redirect to dashboard`)
  }

  return (
    <div className="min-h-screen bg-grid flex flex-col">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <button
          onClick={() => navigate('landing')}
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </button>
        <button
          onClick={() => navigate('signup')}
          className="btn btn-primary"
        >
          Sign up
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="card">
            <h1 className="text-display text-2xl text-center mb-2">Welcome back</h1>
            <p className="text-center text-[var(--color-text-muted)] mb-8">
              Log in to your Vibe Jobs account
            </p>

            <div className="grid gap-3">
              <button
                onClick={() => handleOAuth('Google')}
                className="btn btn-secondary w-full justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => handleOAuth('GitHub')}
                className="btn btn-secondary w-full justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Continue with GitHub
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]">or</span>
              </div>
            </div>

            <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); alert('Would log in with email'); }}>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">EMAIL</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div>
                <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">PASSWORD</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-[var(--color-border)]" />
                  <span className="text-[var(--color-text-muted)]">Remember me</span>
                </label>
                <button type="button" className="text-sm text-[var(--color-accent)] hover:underline">
                  Forgot password?
                </button>
              </div>
              <button type="submit" className="btn btn-primary w-full justify-center mt-2">
                Log in
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="container text-center text-sm text-[var(--color-text-muted)]">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('signup')}
            className="text-[var(--color-accent)] hover:underline"
          >
            Sign up
          </button>
        </div>
      </footer>
    </div>
  )
}
