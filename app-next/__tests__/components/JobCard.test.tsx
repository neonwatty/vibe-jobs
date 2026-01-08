import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import JobCard from '@/components/jobs/JobCard'

const mockJob = {
  id: 'test-job-1',
  title: 'Senior Software Engineer',
  salary_min: 150000,
  salary_max: 200000,
  location_type: 'remote',
  location_details: 'US Remote',
  ai_tools_required: ['ChatGPT', 'GitHub Copilot'],
  how_youll_be_tested: 'Live coding session with AI pair programming',
  created_at: new Date().toISOString(),
  company: {
    name: 'Test Company',
    domain_verified: true,
  },
}

describe('JobCard', () => {
  it('renders job title', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument()
  })

  it('renders company name', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Test Company')).toBeInTheDocument()
  })

  it('renders salary range', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('$150k - $200k')).toBeInTheDocument()
  })

  it('renders AI tools required', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('ChatGPT')).toBeInTheDocument()
    expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
  })

  it('renders how youll be tested section', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText('Live coding session with AI pair programming')).toBeInTheDocument()
  })

  it('shows verified badge for verified companies', () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByTitle('Verified employer')).toBeInTheDocument()
  })
})
