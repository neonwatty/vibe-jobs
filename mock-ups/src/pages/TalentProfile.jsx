import { useState } from 'react'

// Sample candidate profile
const SAMPLE_CANDIDATE = {
  id: 1,
  firstName: 'Alex',
  lastName: 'Chen',
  headline: 'AI-First Frontend Engineer',
  bio: 'I build web applications with a focus on developer experience and performance. Been using AI tools since GPT-3 and now can\'t imagine coding without them. Currently exploring how AI can make design-to-code workflows faster.',
  location: 'San Francisco, CA',
  availability: 'actively_looking',
  yearsExperience: 5,
  roleType: 'Engineer',
  aiTools: ['Cursor', 'Claude', 'Claude Code', 'v0', 'ChatGPT', 'GitHub Copilot'],
  skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GraphQL'],
  portfolioUrls: [
    { url: 'https://github.com/alexchen', label: 'GitHub' },
    { url: 'https://alexchen.dev', label: 'Portfolio' },
    { url: 'https://twitter.com/alexchen', label: 'Twitter' },
  ],
  linkedinUrl: 'https://linkedin.com/in/alexchen',
  experience: [
    {
      title: 'Senior Frontend Engineer',
      company: 'TechStartup',
      period: '2022 - Present',
      description: 'Leading frontend development for a B2B SaaS product. Introduced AI-assisted coding practices that increased team velocity by 40%.',
    },
    {
      title: 'Frontend Engineer',
      company: 'BigCorp Inc',
      period: '2020 - 2022',
      description: 'Built and maintained React applications serving 100k+ daily users. Led migration from JavaScript to TypeScript.',
    },
    {
      title: 'Junior Developer',
      company: 'Agency Co',
      period: '2019 - 2020',
      description: 'Developed websites and web applications for various clients using modern JavaScript frameworks.',
    },
  ],
  education: [
    {
      degree: 'B.S. Computer Science',
      school: 'UC Berkeley',
      year: '2019',
    },
  ],
}

// Mock employer context
const MOCK_EMPLOYER = {
  isLoggedIn: true,
  companyName: 'Acme Corp',
  requiredTools: ['Cursor', 'Claude', 'React'],
}

export default function TalentProfile({ navigate, candidateId }) {
  const [showContactModal, setShowContactModal] = useState(false)
  const [message, setMessage] = useState('')
  const [contacted, setContacted] = useState(false)

  const candidate = SAMPLE_CANDIDATE // In real app, fetch by candidateId

  // Calculate tool match for employer
  const matchingTools = candidate.aiTools.filter(t => MOCK_EMPLOYER.requiredTools.includes(t))
  const matchPercent = MOCK_EMPLOYER.requiredTools.length > 0
    ? Math.round((matchingTools.length / MOCK_EMPLOYER.requiredTools.length) * 100)
    : 0

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case 'actively_looking':
        return { label: 'Actively looking', color: 'bg-green-500/10 text-green-400 border-green-500/20' }
      case 'open':
        return { label: 'Open to opportunities', color: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] border-[var(--color-secondary)]/20' }
      case 'not_looking':
        return { label: 'Not looking', color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] border-[var(--color-border)]' }
      default:
        return { label: availability, color: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]' }
    }
  }

  const availabilityBadge = getAvailabilityBadge(candidate.availability)

  const handleContact = () => {
    setContacted(true)
    setShowContactModal(false)
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

      <main className="container py-8">
        {/* Back link */}
        <button
          onClick={() => navigate('talent-listings')}
          className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to talent
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="card">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-xl bg-[var(--color-accent)] flex items-center justify-center text-3xl font-bold text-[var(--color-bg-primary)]">
                  {candidate.firstName[0]}{candidate.lastName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-display text-2xl mb-1">
                        {candidate.firstName} {candidate.lastName}
                      </h1>
                      <p className="text-[var(--color-text-muted)] mb-2">{candidate.headline}</p>
                      <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {candidate.location}
                        </span>
                        <span>·</span>
                        <span>{candidate.yearsExperience} years experience</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm border ${availabilityBadge.color}`}>
                      {availabilityBadge.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Tools */}
              <div className="mb-6">
                <h3 className="text-mono text-xs text-[var(--color-text-muted)] mb-3">AI TOOLS</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.aiTools.map(tool => (
                    <span
                      key={tool}
                      className={`badge ${matchingTools.includes(tool) ? 'badge-accent' : ''}`}
                    >
                      {tool}
                      {matchingTools.includes(tool) && (
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-mono text-xs text-[var(--color-text-muted)] mb-3">SKILLS</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                    <span key={skill} className="badge">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Tool match for employer */}
              {MOCK_EMPLOYER.isLoggedIn && matchingTools.length > 0 && (
                <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-lg mb-6">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    matchPercent === 100 ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]' :
                    matchPercent >= 50 ? 'bg-[var(--color-secondary)] text-[var(--color-bg-primary)]' :
                    'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)]'
                  }`}>
                    {matchPercent}%
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {matchPercent === 100 ? 'Perfect match for your requirements!' :
                       matchPercent >= 50 ? 'Good match for your requirements' : 'Partial match'}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Matches {matchingTools.length} of {MOCK_EMPLOYER.requiredTools.length} tools you're looking for
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {contacted ? (
                  <button disabled className="btn btn-secondary flex-1 justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent
                  </button>
                ) : (
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="btn btn-primary flex-1 justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Contact Candidate
                  </button>
                )}
                <button className="btn btn-ghost">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">About</h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{candidate.bio}</p>
            </div>

            {/* Experience */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-6">Experience</h2>
              <div className="space-y-6">
                {candidate.experience.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-[var(--color-border)]">
                    <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                    <div className="mb-1">
                      <h3 className="font-medium">{exp.title}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {exp.company} · {exp.period}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Education</h2>
              {candidate.education.map((edu, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-tertiary)] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{edu.school} · {edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="card">
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Role</span>
                  <span className="font-medium">{candidate.roleType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Experience</span>
                  <span className="font-medium">{candidate.yearsExperience} years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">Location</span>
                  <span className="font-medium">{candidate.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-text-muted)]">AI Tools</span>
                  <span className="font-medium">{candidate.aiTools.length} tools</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="card">
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-3">
                {candidate.portfolioUrls.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                  >
                    <span className="text-sm">{link.label}</span>
                    <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
                {candidate.linkedinUrl && (
                  <a
                    href={candidate.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] rounded-lg hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                  >
                    <span className="text-sm">LinkedIn</span>
                    <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Download Resume */}
            <div className="card">
              <button className="btn btn-secondary w-full justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Contact {candidate.firstName}</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <p className="text-[var(--color-text-muted)] mb-4">
                Reaching out from <strong className="text-[var(--color-text-primary)]">{MOCK_EMPLOYER.companyName}</strong>
              </p>

              <label className="text-mono text-xs text-[var(--color-text-muted)] block mb-2">
                YOUR MESSAGE
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi! We're interested in your profile and would love to chat about a role at our company..."
                className="w-full h-32 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="btn btn-ghost flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleContact}
                disabled={!message.trim()}
                className="btn btn-primary flex-1"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
