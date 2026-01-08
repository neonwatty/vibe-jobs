import { describe, it, expect } from 'vitest'
import { formatSalary, formatRelativeDate, cn, calculateToolMatch, getInitials, truncate } from '@/lib/utils'

describe('formatSalary', () => {
  it('formats salary range correctly', () => {
    expect(formatSalary(100000, 150000)).toBe('$100k - $150k')
  })

  it('formats single salary correctly', () => {
    expect(formatSalary(120000, 120000)).toBe('$120k')
  })

  it('returns empty string for undefined values', () => {
    expect(formatSalary(undefined, undefined)).toBe('')
  })

  it('handles min only (no max)', () => {
    expect(formatSalary(100000, undefined)).toBe('$100k')
  })
})

describe('formatRelativeDate', () => {
  it('returns "Today" for current date', () => {
    const now = new Date().toISOString()
    expect(formatRelativeDate(now)).toBe('Today')
  })

  it('handles undefined', () => {
    expect(formatRelativeDate(undefined)).toBe('')
  })

  it('returns "Yesterday" for yesterday', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(yesterday)).toBe('Yesterday')
  })
})

describe('cn', () => {
  it('merges class names correctly', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })
})

describe('calculateToolMatch', () => {
  it('returns 100 for perfect match', () => {
    expect(calculateToolMatch(['ChatGPT', 'Claude'], ['ChatGPT', 'Claude'])).toBe(100)
  })

  it('returns 50 for partial match', () => {
    expect(calculateToolMatch(['ChatGPT'], ['ChatGPT', 'Claude'])).toBe(50)
  })

  it('returns 0 for no match', () => {
    expect(calculateToolMatch(['Midjourney'], ['ChatGPT', 'Claude'])).toBe(0)
  })

  it('returns 100 when no tools required', () => {
    expect(calculateToolMatch(['ChatGPT'], [])).toBe(100)
  })
})

describe('getInitials', () => {
  it('returns initials from names', () => {
    expect(getInitials('John', 'Doe')).toBe('JD')
  })

  it('handles single name', () => {
    expect(getInitials('John', null)).toBe('J')
  })
})

describe('truncate', () => {
  it('truncates long text', () => {
    expect(truncate('This is a very long text', 10)).toBe('This is a...')
  })

  it('returns short text unchanged', () => {
    expect(truncate('Short', 10)).toBe('Short')
  })
})
