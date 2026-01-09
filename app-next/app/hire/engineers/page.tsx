import Link from 'next/link'

const sampleCandidates = [
  {
    name: 'Alex Chen',
    title: 'Senior Full-Stack Engineer',
    experience: '8 years',
    tools: ['Claude Code', 'Cursor', 'GitHub Copilot', 'ChatGPT'],
    availability: 'Actively looking',
  },
  {
    name: 'Jordan Park',
    title: 'Platform Engineer',
    experience: '6 years',
    tools: ['Windsurf', 'Claude', 'Copilot', 'Perplexity'],
    availability: 'Open to offers',
  },
  {
    name: 'Sam Rivera',
    title: 'Backend Engineer',
    experience: '5 years',
    tools: ['Cursor', 'ChatGPT', 'Codeium', 'Claude'],
    availability: 'Actively looking',
  },
]

const testFormats = [
  {
    title: '1-hour live build',
    description: 'We give you a problem and watch you solve it using your preferred AI tools.',
  },
  {
    title: '24-hour take-home',
    description: 'Build a small feature end-to-end. Use any tools you want.',
  },
  {
    title: '2-hour pairing session',
    description: 'Work through a real problem with our team. Show us your workflow.',
  },
]

export default function HireEngineers() {
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
          <div className="badge badge-accent mb-6">Hire Engineers</div>
          <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Hire engineers who ship with AI,
            <br />
            <span className="text-[var(--color-accent)]">not despite it.</span>
          </h1>
          <p className="text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
            Find devs who use Cursor, Claude Code, and Copilot daily.
            Post a job. Tell them how you&apos;ll test them. Get applicants who aren&apos;t afraid to show their workflow.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/company/jobs/new?role=engineer" className="btn btn-primary btn-lg">
              Post Engineering Role
            </Link>
            <Link href="/talent?role=engineer" className="btn btn-secondary btn-lg">
              Browse Engineers
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
                <h3 className="font-semibold mb-2 text-[var(--color-accent)]">{format.title}</h3>
                <p className="text-sm text-[var(--color-text-muted)]">{format.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Candidates */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-display text-2xl text-center mb-8">Sample engineering talent</h2>
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
                    <span key={j} className="badge badge-accent">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/talent?role=engineer" className="btn btn-secondary">
              Browse All Engineers
            </Link>
          </div>
        </div>

        {/* How it works for employers */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-display text-2xl text-center mb-12">How posting works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Parse your job description</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Use Claude or ChatGPT to convert your JD to our JSON format. Same bar as candidates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Add your test format</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Tell candidates exactly how they&apos;ll be evaluated. No hidden surprises.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 font-mono font-bold">
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
          <Link href="/company/jobs/new?role=engineer" className="btn btn-primary btn-lg">
            Post Your Engineering Role
          </Link>
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            Free for v1. No credit card required.
          </p>
        </div>
      </main>
    </div>
  )
}
