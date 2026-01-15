import type { Metadata } from 'next'
import Link from 'next/link'
import { LandingNav } from '@/components/landing'

export const metadata: Metadata = {
  title: 'About Vibe Jobs | The Anti-LeetCode Job Board',
  description: 'Why we built Vibe Jobs: the job board for AI-native professionals who are tired of pretending they don\'t use modern tools.',
  openGraph: {
    title: 'About Vibe Jobs | The Anti-LeetCode Job Board',
    description: 'Why we built Vibe Jobs: the job board for AI-native professionals.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-grid">
      <LandingNav />

      <main className="container py-16">
        <article className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-display text-4xl md:text-5xl mb-12 text-center">
            The Vibe Jobs Manifesto
          </h1>

          {/* The Problem */}
          <section className="mb-16">
            <h2 className="text-display text-2xl mb-6 text-[var(--color-error)]">
              The Problem
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)]">
              <p>
                The way we interview is broken.
              </p>
              <p>
                If you&apos;re an engineer, you&apos;ve probably spent hundreds of hours grinding
                LeetCode. Memorizing algorithms you&apos;ll never use. Pretending you don&apos;t
                know what a binary tree looks like so you can &quot;discover&quot; it on a whiteboard.
              </p>
              <p>
                If you&apos;re in product, you&apos;ve answered the same hypothetical case study
                a dozen times. &quot;How would you prioritize features for a theoretical
                product?&quot; As if anyone works that way anymore.
              </p>
              <p>
                Meanwhile, the tools we actually use every day - Claude, Cursor, ChatGPT,
                Copilot - are &quot;cheating.&quot; Hide them. Pretend you don&apos;t use them.
                Prove you can work without them, even though you never do.
              </p>
              <p className="text-[var(--color-text-primary)] font-semibold text-xl">
                This is absurd.
              </p>
            </div>
          </section>

          {/* The Reality */}
          <section className="mb-16">
            <h2 className="text-display text-2xl mb-6 text-[var(--color-secondary)]">
              The Reality
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)]">
              <p>
                The best engineers use AI tools. They ship faster. They write better
                code. They focus on the hard problems instead of boilerplate.
              </p>
              <p>
                The best product people use AI to draft specs, research competitors,
                synthesize user feedback, and move faster than ever before.
              </p>
              <p className="text-[var(--color-text-primary)] font-semibold">
                This isn&apos;t cheating. This is how modern work gets done.
              </p>
            </div>
          </section>

          {/* Our Bet */}
          <section className="mb-16">
            <h2 className="text-display text-2xl mb-6 text-[var(--color-accent)]">
              Our Bet
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)]">
              <p>
                We believe the companies worth working for already know this.
              </p>
              <p>
                They don&apos;t want to watch you struggle without your tools. They want
                to see how you work <em>with</em> them. They want to know if you can ship -
                not if you can memorize solutions to problems that have been solved
                a thousand times.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-display text-2xl mb-6">
              How Vibe Jobs Works
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-accent)]">
                  For job seekers:
                </h3>
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Every job shows &quot;How You&apos;ll Be Tested&quot; - no surprises
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Filter by the AI tools you actually use
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-accent)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Find employers who want your AI-augmented workflow
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2 text-[var(--color-secondary)]">
                  For employers:
                </h3>
                <ul className="space-y-3 text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Post jobs with transparent test formats
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Attract candidates who aren&apos;t hiding their tools
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[var(--color-secondary)] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Every applicant already proved AI fluency by parsing their own resume
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* The Name */}
          <section className="mb-16">
            <h2 className="text-display text-2xl mb-6">
              The Name
            </h2>
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)]">
              <p>
                &quot;Vibe coding&quot; is what people call building with AI. You describe
                what you want, iterate with your tools, and ship.
              </p>
              <p className="text-[var(--color-text-primary)] font-semibold">
                Vibe Jobs is where vibe coders find jobs. Simple as that.
              </p>
            </div>
          </section>

          {/* Join Us */}
          <section className="border-t border-[var(--color-border)] pt-16 text-center">
            <h2 className="text-display text-2xl mb-4">
              Join Us
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-8">
              We&apos;re early. We&apos;re free. We&apos;re building the job board for the way
              people actually work now.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/jobs" className="btn btn-primary btn-lg w-full sm:w-auto">
                Find a Job
              </Link>
              <Link href="/signup?role=employer" className="btn btn-secondary btn-lg w-full sm:w-auto">
                Post a Job
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  )
}
