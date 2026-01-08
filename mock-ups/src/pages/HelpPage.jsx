import { useState } from 'react'

const FAQ_SECTIONS = {
  general: {
    title: 'General',
    questions: [
      {
        q: 'What is Vibe Jobs?',
        a: 'Vibe Jobs is a job board specifically for AI-native workers and companies that want to hire them. We focus on matching people based on their AI tool proficiency, not just traditional credentials.',
      },
      {
        q: 'Is Vibe Jobs free?',
        a: "Yes, Vibe Jobs is currently free for both job seekers and employers. We're focused on building the community first.",
      },
      {
        q: 'How is Vibe Jobs different from LinkedIn or Indeed?',
        a: "We're built around AI fluency as the primary filter. Every profile shows which AI tools you use. Every job shows how you'll be tested. And we require salary transparency on all postings.",
      },
    ],
  },
  jobSeekers: {
    title: 'For Job Seekers',
    questions: [
      {
        q: 'How do I create a profile?',
        a: 'Sign up with Google or GitHub, then use our JSON upload flow to parse your resume using any LLM (Claude, ChatGPT, etc.). This lets you create a structured profile quickly while demonstrating AI fluency.',
      },
      {
        q: 'What if I don\'t have a resume in the right format?',
        a: 'You can also fill out your profile manually. The JSON upload is optional but recommended since it demonstrates your AI workflow.',
      },
      {
        q: 'How do I show my AI tools?',
        a: 'During profile creation, you\'ll select from a list of AI tools you use regularly. Be honest - employers may ask about your experience with specific tools during interviews.',
      },
      {
        q: 'What does "How You\'ll Be Tested" mean?',
        a: 'Every job on Vibe Jobs includes a description of the interview process. This might be a live coding session, a design challenge, or a PRD writing exercise. You\'ll always know what to expect before applying.',
      },
    ],
  },
  employers: {
    title: 'For Employers',
    questions: [
      {
        q: 'Why do I need a work email to sign up?',
        a: 'We require work emails to verify that employers are legitimate companies. This protects job seekers from spam and fake listings.',
      },
      {
        q: 'Why do I have to post salary ranges?',
        a: 'Salary transparency is required on Vibe Jobs. This saves time for everyone by filtering out candidates outside your budget early in the process.',
      },
      {
        q: 'What should I write for "How You\'ll Be Tested"?',
        a: 'Describe your actual interview process. Will you do a live coding session? A take-home project? A case study presentation? Be specific about what candidates will build, how long it will take, and whether they can use AI tools.',
      },
      {
        q: 'How do I verify candidates actually use AI tools?',
        a: 'Design your interview to test this directly. Have candidates share their screen while building something with their AI tools. You\'ll quickly see who\'s fluent and who\'s just listing tools on their profile.',
      },
    ],
  },
  json: {
    title: 'JSON Upload Flow',
    questions: [
      {
        q: 'How does the JSON upload work?',
        a: 'We provide a prompt that you can use with any LLM (Claude, ChatGPT, etc.) to parse your resume or job description into a structured JSON format. This saves time and demonstrates AI fluency.',
      },
      {
        q: 'What LLM should I use?',
        a: 'Any major LLM works: Claude, ChatGPT, Gemini, etc. The prompt is designed to work with all of them.',
      },
      {
        q: 'What if the JSON has errors?',
        a: "Our validator will tell you exactly what's wrong. Common issues include missing required fields or invalid field values. You can edit the JSON directly or regenerate it with more context.",
      },
      {
        q: 'Can I edit the parsed data?',
        a: 'Yes! After parsing, you can review and modify everything before saving. The JSON is just a starting point.',
      },
    ],
  },
  mcp: {
    title: 'MCP Integration',
    questions: [
      {
        q: 'What is MCP?',
        a: 'MCP (Model Context Protocol) is a standard that lets AI assistants interact with external services. Vibe Jobs supports MCP, so you can browse jobs, apply, and manage your profile through Claude or other compatible AI tools.',
      },
      {
        q: 'How do I set up MCP?',
        a: 'Check out our MCP documentation for step-by-step setup instructions. You\'ll need to generate an API token from your dashboard.',
      },
      {
        q: 'Is MCP required to use Vibe Jobs?',
        a: 'No, MCP is completely optional. You can use Vibe Jobs entirely through the web interface. MCP is just an additional way to interact with the platform.',
      },
    ],
  },
}

export default function HelpPage({ navigate }) {
  const [activeSection, setActiveSection] = useState('general')
  const [expandedQuestions, setExpandedQuestions] = useState({})

  const toggleQuestion = (sectionKey, index) => {
    const key = `${sectionKey}-${index}`
    setExpandedQuestions(prev => ({
      ...prev,
      [key]: !prev[key],
    }))
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
          <button onClick={() => navigate('jobs')} className="btn btn-ghost">Browse Jobs</button>
          <button onClick={() => navigate('signup')} className="btn btn-primary">Get Started</button>
        </div>
      </nav>

      <main className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-display text-display-lg mb-4">Help Center</h1>
            <p className="text-[var(--color-text-muted)]">
              Everything you need to know about using Vibe Jobs
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <nav className="space-y-1 sticky top-8">
                {Object.entries(FAQ_SECTIONS).map(([key, section]) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className={`w-full px-4 py-2 rounded-lg text-left text-sm transition-colors ${
                      activeSection === key
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                        : 'hover:bg-[var(--color-bg-tertiary)]'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <h2 className="text-xl font-semibold mb-6">
                {FAQ_SECTIONS[activeSection].title}
              </h2>
              <div className="space-y-4">
                {FAQ_SECTIONS[activeSection].questions.map((item, index) => {
                  const isExpanded = expandedQuestions[`${activeSection}-${index}`]
                  return (
                    <div key={index} className="card">
                      <button
                        onClick={() => toggleQuestion(activeSection, index)}
                        className="w-full flex items-start justify-between text-left"
                      >
                        <span className="font-medium pr-4">{item.q}</span>
                        <svg
                          className={`w-5 h-5 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isExpanded && (
                        <p className="text-[var(--color-text-muted)] mt-4 pt-4 border-t border-[var(--color-border)]">
                          {item.a}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="mt-16 text-center">
            <div className="card max-w-xl mx-auto">
              <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
              <p className="text-[var(--color-text-muted)] mb-4">
                We're here to help. Reach out to our team.
              </p>
              <button className="btn btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-16">
        <div className="container flex items-center justify-between">
          <div className="text-sm text-[var(--color-text-muted)]">
            Vibe Jobs · For people who ship with AI
          </div>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigate('about')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">About</button>
            <button onClick={() => navigate('mcp-overview')} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">MCP Docs</button>
          </div>
        </div>
      </footer>
    </div>
  )
}
