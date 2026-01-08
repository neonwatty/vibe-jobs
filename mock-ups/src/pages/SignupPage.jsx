import { useState } from 'react'

const BLOCKED_DOMAINS = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'hotmail.com',
  'outlook.com', 'live.com', 'aol.com', 'icloud.com', 'protonmail.com'
]

export default function SignupPage({ navigate }) {
  const [step, setStep] = useState('role') // 'role' | 'auth' | 'error'
  const [userType, setUserType] = useState(null) // 'employee' | 'employer'
  const [error, setError] = useState(null)

  const handleRoleSelect = (role) => {
    setUserType(role)
    setStep('auth')
  }

  const simulateOAuth = (provider) => {
    // Simulate OAuth flow
    if (userType === 'employer') {
      // Simulate getting back a personal email (for demo purposes)
      const mockEmail = provider === 'google' ? 'john@gmail.com' : 'john@github-personal.com'
      const domain = mockEmail.split('@')[1]

      if (BLOCKED_DOMAINS.includes(domain)) {
        setError({
          email: mockEmail,
          message: 'Please use your work email to sign up as an employer. Personal email addresses are not accepted.'
        })
        setStep('error')
        return
      }
    }

    // Success - would redirect to profile creation
    alert(`Success! Would redirect to ${userType === 'employee' ? 'profile' : 'company'} setup.`)
  }

  const simulateWorkEmailOAuth = () => {
    // Simulate successful work email OAuth
    alert('Success! Would redirect to company setup.')
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
          onClick={() => navigate('login')}
          className="btn btn-ghost"
        >
          Log in
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md">

          {/* Step 1: Role Selection */}
          {step === 'role' && (
            <div className="card">
              <h1 className="text-display text-2xl text-center mb-2">Join Vibe Jobs</h1>
              <p className="text-center text-[var(--color-text-muted)] mb-8">
                How do you want to use Vibe Jobs?
              </p>

              <div className="grid gap-4">
                <button
                  onClick={() => handleRoleSelect('employee')}
                  className="card hover:border-[var(--color-accent)] transition-colors text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="group-hover:text-[var(--color-accent)] transition-colors">I'm looking for work</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Find jobs where AI skills are valued
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect('employer')}
                  className="card hover:border-[var(--color-accent)] transition-colors text-left group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="group-hover:text-[var(--color-accent)] transition-colors">I'm hiring</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Find AI-fluent candidates for your team
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Auth Options */}
          {step === 'auth' && (
            <div className="card">
              <button
                onClick={() => { setStep('role'); setUserType(null); }}
                className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <h1 className="text-display text-2xl text-center mb-2">
                {userType === 'employee' ? 'Create your profile' : 'Create employer account'}
              </h1>
              <p className="text-center text-[var(--color-text-muted)] mb-8">
                {userType === 'employee'
                  ? 'Sign up to start applying to AI-forward companies'
                  : 'Sign up with your work email to post jobs'
                }
              </p>

              {userType === 'employer' && (
                <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-medium text-[var(--color-text-primary)]">Work email required</p>
                      <p className="text-[var(--color-text-muted)]">
                        Employer accounts require a company email address. Personal emails (Gmail, Yahoo, etc.) are not accepted.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-3">
                <button
                  onClick={() => simulateOAuth('google')}
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
                  onClick={() => simulateOAuth('github')}
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

              <button className="btn btn-ghost w-full justify-center">
                Continue with email
              </button>

              <p className="text-xs text-center text-[var(--color-text-muted)] mt-6">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          )}

          {/* Error State - Personal Email */}
          {step === 'error' && (
            <div className="card">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h1 className="text-display text-2xl text-center mb-2">Work email required</h1>
              <p className="text-center text-[var(--color-text-muted)] mb-6">
                {error?.message}
              </p>

              <div className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg p-4 mb-6">
                <div className="text-sm">
                  <p className="text-[var(--color-text-muted)]">You signed in with:</p>
                  <p className="font-mono text-[var(--color-text-primary)]">{error?.email}</p>
                </div>
              </div>

              <div className="grid gap-3">
                <button
                  onClick={simulateWorkEmailOAuth}
                  className="btn btn-primary w-full justify-center"
                >
                  Try with work email
                </button>
                <button
                  onClick={() => { setStep('role'); setUserType(null); setError(null); }}
                  className="btn btn-ghost w-full justify-center"
                >
                  Sign up as job seeker instead
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-6">
        <div className="container text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('login')}
            className="text-[var(--color-accent)] hover:underline"
          >
            Log in
          </button>
        </div>
      </footer>
    </div>
  )
}
