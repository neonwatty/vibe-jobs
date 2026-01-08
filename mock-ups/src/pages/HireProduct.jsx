export default function HireProduct({ navigate }) {
  const stats = [
    { value: '800+', label: 'AI-fluent PMs & designers' },
    { value: '92%', label: 'Use ChatGPT or Claude daily' },
    { value: '5 days', label: 'Average time to first interview' },
  ]

  const featuredTalent = [
    {
      name: 'Emily Z.',
      headline: 'AI Product Manager',
      location: 'Seattle',
      tools: ['ChatGPT', 'Claude', 'Notion AI', 'Perplexity'],
      experience: '6 years',
    },
    {
      name: 'Sarah K.',
      headline: 'Product Designer',
      location: 'New York',
      tools: ['Midjourney', 'DALL-E', 'Figma AI', 'ChatGPT'],
      experience: '4 years',
    },
    {
      name: 'David P.',
      headline: 'Growth Product Lead',
      location: 'Remote',
      tools: ['ChatGPT', 'Jasper', 'Notion AI', 'Perplexity'],
      experience: '5 years',
    },
  ]

  const roles = [
    {
      title: 'Product Managers',
      description: 'PMs who use AI for research, spec writing, and competitor analysis',
      tools: ['ChatGPT', 'Claude', 'Notion AI', 'Perplexity'],
    },
    {
      title: 'Product Designers',
      description: 'Designers who leverage AI for ideation, prototyping, and asset generation',
      tools: ['Midjourney', 'DALL-E', 'Figma AI', 'Canva AI'],
    },
    {
      title: 'UX Researchers',
      description: 'Researchers who use AI to synthesize interviews and analyze data',
      tools: ['ChatGPT', 'Claude', 'Dovetail AI', 'Notion AI'],
    },
    {
      title: 'Growth Managers',
      description: 'Growth leaders who leverage AI for content, SEO, and experimentation',
      tools: ['ChatGPT', 'Jasper', 'Perplexity', 'Julius AI'],
    },
  ]

  const testimonials = [
    {
      quote: "Our new PM writes product specs in half the time using Claude. She brings AI into every meeting - it's transformed how we work.",
      author: 'Jennifer Liu',
      role: 'Head of Product, SaaSCo',
    },
    {
      quote: "The designers we hired from Vibe Jobs already knew how to use Midjourney and DALL-E for rapid prototyping. No training needed.",
      author: 'Tom Anderson',
      role: 'Design Director, CreativeTech',
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
          <button onClick={() => navigate('hire-engineers')} className="btn btn-ghost">Hire Engineers</button>
          <button onClick={() => navigate('talent-listings')} className="btn btn-secondary">Browse Talent</button>
          <button onClick={() => navigate('job-post-new')} className="btn btn-primary">Post a Job</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge badge-accent mb-6">For Employers</div>
          <h1 className="text-display text-display-xl mb-6">
            Hire product people who
            <span className="block text-[var(--color-accent)]">think with AI</span>
          </h1>
          <p className="text-display text-display-md text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            Find PMs, designers, and researchers who use AI as their thinking partner.
            They move faster and think bigger.
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
              Browse Product Talent
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

      {/* Role types */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-display-lg text-center mb-4">
            Find AI-native talent across product
          </h2>
          <p className="text-center text-[var(--color-text-muted)] mb-12">
            Every role, powered by AI fluency
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role, i) => (
              <div key={i} className="card">
                <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                <p className="text-[var(--color-text-muted)] mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.tools.map(tool => (
                    <span key={tool} className="badge badge-accent text-xs">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Vibe Jobs */}
      <section className="container py-16 border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display text-display-lg text-center mb-12">
            Why hire product people from Vibe Jobs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">AI-first thinking</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                These aren't people who just use ChatGPT sometimes. They've rebuilt their entire workflow around AI.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Speed to hire</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Candidates see your interview process upfront. No surprises means less back-and-forth.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Practical assessments</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                Test candidates on real work: PRD sprints, design challenges, research synthesis. With AI tools allowed.
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
            Real product people ready to transform your team
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
              Browse All Product Talent
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
            Ready to hire AI-native product people?
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
