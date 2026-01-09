import Link from 'next/link'

const sampleCandidates = [
  {
    name: 'Morgan Lee',
    title: 'Senior Product Manager',
    experience: '7 years',
    tools: ['Claude', 'ChatGPT', 'Notion AI', 'Perplexity'],
    availability: 'Actively looking',
  },
  {
    name: 'Casey Kim',
    title: 'Product Lead',
    experience: '9 years',
    tools: ['Claude', 'Gamma', 'ChatGPT', 'Figma AI'],
    availability: 'Open to offers',
  },
  {
    name: 'Taylor Nguyen',
    title: 'Product Manager',
    experience: '4 years',
    tools: ['ChatGPT', 'Claude', 'Miro AI', 'Notion AI'],
    availability: 'Actively looking',
  },
]

const testFormats = [
  {
    title: 'PRD sprint',
    description: 'Write a product spec for a feature we describe. 2 hours, any tools allowed.',
  },
  {
    title: 'Strategy walkthrough',
    description: 'Show us a past product decision and how you&apos;d use AI to improve the process.',
  },
  {
    title: 'Research challenge',
    description: 'Research a market opportunity using your AI tools. Present your findings.',
  },
]

export default function HireProduct() {
  return (
    <div className="min-h-screen bg-grid">
      {/* Nav */}
      <nav className="container flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          vibe<span className="text-[var(--color-accent)]">jobs</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/for/employers" className="btn btn-ghost">For Employers</Link>
          <Link href="/login" className="btn btn-ghost">Log in</Link>
          <Link href="/signup?type=employer" className="btn btn-primary">Post a Job</Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="badge badge-secondary mb-6">Hire Product</div>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Hire product people who build,
            <br />
            <span className="text-[var(--color-secondary)]">not just theorize.</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Find PMs who use AI to ship specs, research, and strategy faster.
            Post a role. Define your challenge. See how they actually work.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/company/jobs/new?role=product" className="btn btn-primary btn-lg">
              Post Product Role
            </Link>
            <Link href="/talent?role=product" className="btn btn-secondary btn-lg">
              Browse Product Talent
            </Link>
          </div>
        </div>

        {/* Test Formats */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-display text-2xl text-center mb-8">Define how you&apos;ll test them</h2>
          <p className="text-center text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Every job on Vibe Jobs includes a &quot;How You&apos;ll Be Tested&quot; section.
            Be transparent about your process. Here are some formats that work:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testFormats.map((format, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold mb-2 text-[var(--color-secondary)]">{format.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{format.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Candidates */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-display text-2xl text-center mb-8">Sample product talent</h2>
          <div className="space-y-4">
            {sampleCandidates.map((candidate, i) => (
              <div key={i} className="card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    <p className="text-[var(--color-text-muted)]">{candidate.title} &middot; {candidate.experience}</p>
                  </div>
                  <span className="badge badge-success">{candidate.availability}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.tools.map((tool, j) => (
                    <span key={j} className="badge badge-secondary">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/talent?role=product" className="btn btn-secondary">
              Browse All Product Talent
            </Link>
          </div>
        </div>

        {/* How it works for employers */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-12">How posting works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Parse your job description</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Use Claude or ChatGPT to convert your JD to our JSON format. Same bar as candidates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Add your test format</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Tell candidates exactly how they&apos;ll be evaluated. No hidden surprises.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get matched applicants</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                See which applicants already use your required AI tools. One-click to view profiles.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link href="/company/jobs/new?role=product" className="btn btn-primary btn-lg">
            Post Your Product Role
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Free for v1. No credit card required.
          </p>
        </div>
      </main>
    </div>
  )
}
