import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNav, HeroSection, ValuePropCard, HowItWorks, CTASection } from '@/components/landing'

export const metadata: Metadata = {
  title: 'Find AI-Forward Jobs | Vibe Jobs',
  description: 'Find jobs where employers want you to use AI tools. No LeetCode, no whiteboard algorithms. Just practical skills with the tools you actually use.',
  openGraph: {
    title: 'Find AI-Forward Jobs | Vibe Jobs',
    description: 'Find jobs where employers want you to use AI tools. No LeetCode, no whiteboard algorithms.',
  },
}

export default function ForTalentPage() {
  return (
    <div className="min-h-screen bg-grid">
      <LandingNav showTalentLink={false} />

      <main className="container">
        {/* Hero */}
        <HeroSection
          headline={
            <>
              Find jobs where employers{' '}
              <span className="text-[var(--color-accent)]">want you to use AI</span>
            </>
          }
          subheadline="No more hiding your tools. No more LeetCode theater. Just practical skills with the tools you actually use."
          primaryCTA={{ text: 'Browse Jobs', href: '/jobs' }}
          secondaryCTA={{ text: 'Create Profile', href: '/signup' }}
        />

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            }
            title="Know How You'll Be Tested"
            description="Every job shows the exact evaluation format. No surprises, no gotchas, no whiteboard tricks."
            accentColor="primary"
          />

          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Match on Your AI Toolkit"
            description="See your tool overlap percentage instantly. Cursor, Claude, Copilot - we filter by what you use."
            accentColor="secondary"
          />

          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Verified AI-Forward Employers"
            description="Companies that actually embrace your workflow. Domain-verified with declared AI culture."
            accentColor="neutral"
          />
        </div>

        {/* The Problem - Confrontational Section */}
        <div className="py-16 border-t border-[var(--color-border)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display text-2xl md:text-3xl mb-8">
              The interview game is{' '}
              <span className="text-[var(--color-error)]">broken</span>
            </h2>
            <div className="text-left space-y-6 text-[var(--color-text-secondary)]">
              <p className="text-lg">
                You&apos;ve spent hundreds of hours on LeetCode. Memorizing algorithms you&apos;ll never use.
                Pretending you don&apos;t know what a binary tree looks like so you can &quot;discover&quot; it on a whiteboard.
              </p>
              <p className="text-lg">
                Meanwhile, you ship production code with Cursor and Claude every day.
                But in interviews, that&apos;s &quot;cheating.&quot;
              </p>
              <p className="text-lg font-medium text-[var(--color-text-primary)]">
                We think that&apos;s absurd.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <HowItWorks
          steps={[
            {
              number: 1,
              title: 'Create your profile',
              description: 'Upload your resume, parse it with AI, done. If you can use Claude to format JSON, you\'re our kind of candidate.',
            },
            {
              number: 2,
              title: 'Browse AI-forward jobs',
              description: 'Filter by tools, salary, role. Every job shows exactly how you\'ll be tested. No surprises.',
            },
            {
              number: 3,
              title: 'Apply with one click',
              description: 'Your profile goes straight to the hiring team. No ATS black holes. No keyword games.',
            },
          ]}
        />

        {/* Role Selector */}
        <div className="py-16 border-t border-[var(--color-border)]">
          <h2 className="text-display text-2xl md:text-3xl text-center mb-8">
            What&apos;s your role?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link
              href="/jobs?role_category=engineer"
              className="card card-interactive text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-accent)]/20 transition-colors">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Engineer</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Frontend, Backend, Full-stack</p>
            </Link>

            <Link
              href="/jobs?role_category=product"
              className="card card-interactive text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Product</h3>
              <p className="text-sm text-[var(--color-text-muted)]">PM, Design, Strategy</p>
            </Link>

            <Link
              href="/jobs"
              className="card card-interactive text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center mx-auto mb-4 group-hover:bg-[var(--color-bg-elevated)] transition-colors">
                <svg className="w-6 h-6 text-[var(--color-text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Other</h3>
              <p className="text-sm text-[var(--color-text-muted)]">Marketing, Sales, Ops</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <CTASection
          headline="Ready to find jobs that want your AI skills?"
          description="Create your profile in minutes. It's free."
          primaryCTA={{ text: 'Create Profile', href: '/signup' }}
          secondaryCTA={{ text: 'Browse Jobs First', href: '/jobs' }}
        />
      </main>
    </div>
  )
}
