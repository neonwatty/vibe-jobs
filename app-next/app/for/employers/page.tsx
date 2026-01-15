import type { Metadata } from 'next'
import { LandingNav, HeroSection, ValuePropCard, HowItWorks, CTASection } from '@/components/landing'

export const metadata: Metadata = {
  title: 'Hire AI-Fluent Talent | Vibe Jobs',
  description: 'Hire people who already work the way you want them to. Find engineers and product people who ship faster with AI.',
  openGraph: {
    title: 'Hire AI-Fluent Talent | Vibe Jobs',
    description: 'Hire people who already work the way you want them to. Find engineers and product people who ship faster with AI.',
  },
}

export default function ForEmployersPage() {
  return (
    <div className="min-h-screen bg-grid">
      <LandingNav showEmployerLink={false} />

      <main className="container">
        {/* Hero */}
        <HeroSection
          headline={
            <>
              Hire people who already{' '}
              <span className="text-[var(--color-accent)]">work the way you want</span>
            </>
          }
          subheadline="Find engineers and product people who ship faster with AI. No LeetCode theater required."
          primaryCTA={{ text: 'Post a Job - Free', href: '/signup?role=employer' }}
          secondaryCTA={{ text: 'Browse Talent', href: '/talent' }}
        />

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 py-16">
          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            }
            title="Pre-Filtered AI Fluency"
            description="Every candidate parsed their own resume with AI. That's your first filter, built in."
            accentColor="primary"
          />

          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            }
            title="Define Your Test Format"
            description="Tell candidates exactly how you'll evaluate them. Attract people who thrive in your interview style."
            accentColor="secondary"
          />

          <ValuePropCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Match on Tools, Not Keywords"
            description="Filter by Cursor, Claude, Copilot usage. Find candidates who use what your team uses."
            accentColor="neutral"
          />
        </div>

        {/* The Pitch */}
        <div className="py-16 border-t border-[var(--color-border)]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display text-2xl md:text-3xl mb-8">
              Stop interviewing like it&apos;s{' '}
              <span className="text-[var(--color-secondary)]">2015</span>
            </h2>
            <div className="text-left space-y-6 text-[var(--color-text-secondary)]">
              <p className="text-lg">
                Your best engineers use Cursor. Your best PMs draft specs with Claude.
                Everyone on your team ships faster with AI tools.
              </p>
              <p className="text-lg">
                So why are you still asking candidates to pretend they don&apos;t use them?
                Why test skills they&apos;ll never need on the job?
              </p>
              <p className="text-lg font-medium text-[var(--color-text-primary)]">
                Vibe Jobs candidates aren&apos;t hiding their tools. They&apos;re showing you how they actually work.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <HowItWorks
          steps={[
            {
              number: 1,
              title: 'Post your job',
              description: 'Upload your job description, parse it with AI, add your test format. Takes 5 minutes.',
            },
            {
              number: 2,
              title: 'Define how you\'ll test',
              description: '"1-hour live build with AI tools" or your own format. Be specific. Candidates appreciate transparency.',
            },
            {
              number: 3,
              title: 'Get AI-fluent applicants',
              description: 'Every applicant proved AI fluency by creating their profile. No more screening for basic tool competency.',
            },
          ]}
        />

        {/* Who's Hiring */}
        <div className="py-16 border-t border-[var(--color-border)]">
          <h2 className="text-display text-2xl md:text-3xl text-center mb-4">
            Who&apos;s hiring here?
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-8">
            AI-forward companies who want candidates that ship with modern tools.
          </p>
          <div className="card text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Be the first</h3>
            <p className="text-[var(--color-text-muted)] mb-4">
              Early employers get featured placement and unlimited free posts.
            </p>
            <a href="/signup?role=employer" className="btn btn-primary">
              Post Your First Job
            </a>
          </div>
        </div>

        {/* Pricing */}
        <div className="py-16 border-t border-[var(--color-border)]">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-display text-2xl md:text-3xl mb-4">
              Currently <span className="text-[var(--color-accent)]">free</span> for all employers
            </h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              Post unlimited jobs while we&apos;re in early access.
              No credit card required. No catch.
            </p>
            <div className="card">
              <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">$0</div>
              <p className="text-[var(--color-text-muted)] mb-6">per job post</p>
              <ul className="text-left space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited job posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Browse all candidates</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI tool matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Applicant management</span>
                </li>
              </ul>
              <a href="/signup?role=employer" className="btn btn-primary w-full">
                Get Started Free
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTASection
          headline="Ready to hire people who ship with AI?"
          description="Post your first job in 5 minutes. It's free."
          primaryCTA={{ text: 'Post a Job', href: '/signup?role=employer' }}
          secondaryCTA={{ text: 'Browse Talent First', href: '/talent' }}
        />
      </main>
    </div>
  )
}
