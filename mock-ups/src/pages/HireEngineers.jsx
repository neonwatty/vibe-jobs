export default function HireEngineers({ navigate }) {
  const stats = [
    { value: '2,400+', label: 'AI-fluent engineers' },
    { value: '85%', label: 'Use Cursor or Claude Code' },
    { value: '3 days', label: 'Average time to first interview' },
  ]

  const featuredTalent = [
    {
      name: 'Alex C.',
      headline: 'Senior Frontend Engineer',
      location: 'San Francisco',
      tools: ['Cursor', 'Claude', 'v0'],
      experience: '5 years',
    },
    {
      name: 'Marcus J.',
      headline: 'Full Stack Developer',
      location: 'Austin',
      tools: ['Claude Code', 'Cursor', 'GitHub Copilot'],
      experience: '7 years',
    },
    {
      name: 'Priya S.',
      headline: 'Backend Engineer',
      location: 'Remote',
      tools: ['Claude Code', 'ChatGPT', 'GitHub Copilot'],
      experience: '6 years',
    },
  ]

  const testimonials = [
    {
      quote: "We found a senior engineer who shipped our entire dashboard redesign in 2 weeks using Cursor. Traditional hiring would have taken months.",
      author: 'Sarah Chen',
      role: 'CTO, TechStartup',
    },
    {
      quote: "The quality of candidates is incredible. They all actually use AI tools daily, not just list them on their resume.",
      author: 'Mike Rodriguez',
      role: 'VP Engineering, ScaleUp Inc',
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
          <button onClick={() => navigate('hire-product')} className="btn btn-ghost">Hire Product</button>
          <button onClick={() => navigate('talent-listings')} className="btn btn-secondary">Browse Talent</button>
          <button onClick={() => navigate('job-post-new')} className="btn btn-primary">Post a Job</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge badge-accent mb-6">For Employers</div>
          <h1 className="text-display text-display-xl mb-6">
            Hire engineers who
            <span className="block text-[var(--color-accent)]">ship 10x faster with AI</span>
          </h1>
          <p className="text-display text-display-md text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            Find developers who use Cursor, Claude Code, and Copilot as their primary tools.
            They're not just familiar with AI - they're fluent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('job-post-new')}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Post Your First Job
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => navigate('talent-listings')}
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Browse Engineers
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">{stat.value}</div>
              <div className="text-[var(--color-text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Vibe Jobs */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-display-lg text-center mb-12">
            Why hire engineers from Vibe Jobs?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified AI fluency</h3>
              <p className="text-[var(--color-text-muted)]">
                Every engineer lists their actual AI tools and workflow. No more guessing if someone really uses these tools daily.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Skills-first interviews</h3>
              <p className="text-[var(--color-text-muted)]">
                Candidates know how they'll be tested upfront. Live coding with AI tools, not whiteboard algorithms.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Salary transparency</h3>
              <p className="text-[var(--color-text-muted)]">
                Every job shows the real salary range. No wasted time on candidates outside your budget.
              </p>
            </div>

            <div className="card">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality over quantity</h3>
              <p className="text-[var(--color-text-muted)]">
                No resume spam. Candidates apply with their AI stack visible, so you know what you're getting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talent */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-display-lg text-center mb-4">
            Sample talent on Vibe Jobs
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Real engineers ready to ship with AI tools
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTalent.map((talent, i) => (
              <div key={i} className="card">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-lg font-bold text-[var(--color-bg-primary)] mb-4">
                  {talent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold mb-1">{talent.name}</h3>
                <p className="text-sm text-[var(--color-text-muted)] mb-2">{talent.headline}</p>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  {talent.location} · {talent.experience}
                </p>
                <div className="flex flex-wrap gap-1">
                  {talent.tools.map(tool => (
                    <span key={tool} className="badge badge-accent text-xs">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('talent-listings')}
              className="btn btn-secondary"
            >
              Browse All Engineers
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-display-lg text-center mb-12">
            What employers say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card">
                <svg className="w-8 h-8 text-[var(--color-accent)] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg mb-4">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-display-lg mb-4">
            Ready to hire AI-native engineers?
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8">
            Post your first job for free. Start getting applicants today.
          </p>
          <button
            onClick={() => navigate('job-post-new')}
            className="btn btn-primary text-lg px-8 py-4"
          >
            Post a Job Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For people who ship with AI
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate('about')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">About</button>
            <button onClick={() => navigate('help')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">Help</button>
            <button onClick={() => navigate('mcp-overview')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">MCP Docs</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
