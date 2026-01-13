import { describe, it, expect } from 'vitest'
import {
  isBlockedDomain,
  extractDomain,
  BLOCKED_EMAIL_DOMAINS,
} from '@/lib/constants'

describe('isBlockedDomain', () => {
  describe('blocks personal email domains', () => {
    it('blocks gmail.com', () => {
      expect(isBlockedDomain('user@gmail.com')).toBe(true)
    })

    it('blocks yahoo.com', () => {
      expect(isBlockedDomain('user@yahoo.com')).toBe(true)
    })

    it('blocks hotmail.com', () => {
      expect(isBlockedDomain('user@hotmail.com')).toBe(true)
    })

    it('blocks outlook.com', () => {
      expect(isBlockedDomain('user@outlook.com')).toBe(true)
    })

    it('blocks icloud.com', () => {
      expect(isBlockedDomain('user@icloud.com')).toBe(true)
    })

    it('blocks protonmail.com', () => {
      expect(isBlockedDomain('user@protonmail.com')).toBe(true)
    })

    it('blocks all domains in BLOCKED_EMAIL_DOMAINS', () => {
      BLOCKED_EMAIL_DOMAINS.forEach((domain) => {
        expect(isBlockedDomain(`test@${domain}`)).toBe(true)
      })
    })
  })

  describe('allows work email domains', () => {
    it('allows company.com', () => {
      expect(isBlockedDomain('user@company.com')).toBe(false)
    })

    it('allows startup.io', () => {
      expect(isBlockedDomain('user@startup.io')).toBe(false)
    })

    it('allows anthropic.com', () => {
      expect(isBlockedDomain('user@anthropic.com')).toBe(false)
    })

    it('allows example.org', () => {
      expect(isBlockedDomain('user@example.org')).toBe(false)
    })

    it('allows subdomains of work domains', () => {
      expect(isBlockedDomain('user@mail.company.com')).toBe(false)
    })
  })

  describe('handles edge cases', () => {
    it('returns false for null', () => {
      expect(isBlockedDomain(null)).toBe(false)
    })

    it('returns false for undefined', () => {
      expect(isBlockedDomain(undefined)).toBe(false)
    })

    it('returns false for empty string', () => {
      expect(isBlockedDomain('')).toBe(false)
    })

    it('returns false for email without @ symbol', () => {
      expect(isBlockedDomain('invalid-email')).toBe(false)
    })

    it('returns false for email with only @ symbol', () => {
      expect(isBlockedDomain('@')).toBe(false)
    })

    it('returns false for email with @ but no domain', () => {
      expect(isBlockedDomain('user@')).toBe(false)
    })
  })

  describe('is case insensitive', () => {
    it('blocks GMAIL.COM (uppercase)', () => {
      expect(isBlockedDomain('user@GMAIL.COM')).toBe(true)
    })

    it('blocks Gmail.Com (mixed case)', () => {
      expect(isBlockedDomain('user@Gmail.Com')).toBe(true)
    })

    it('blocks YAHOO.COM (uppercase)', () => {
      expect(isBlockedDomain('user@YAHOO.COM')).toBe(true)
    })

    it('handles uppercase in local part', () => {
      expect(isBlockedDomain('USER@gmail.com')).toBe(true)
    })
  })
})

describe('extractDomain', () => {
  it('extracts domain from valid email', () => {
    expect(extractDomain('user@example.com')).toBe('example.com')
  })

  it('converts domain to lowercase', () => {
    expect(extractDomain('user@EXAMPLE.COM')).toBe('example.com')
  })

  it('returns undefined for null', () => {
    expect(extractDomain(null)).toBeUndefined()
  })

  it('returns undefined for undefined', () => {
    expect(extractDomain(undefined)).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(extractDomain('')).toBeUndefined()
  })

  it('returns undefined for email without @', () => {
    expect(extractDomain('invalid')).toBeUndefined()
  })

  it('returns empty string for email with @ but no domain', () => {
    expect(extractDomain('user@')).toBe('')
  })
})

describe('BLOCKED_EMAIL_DOMAINS', () => {
  it('contains expected number of domains', () => {
    // 23 domains as of current implementation
    expect(BLOCKED_EMAIL_DOMAINS.size).toBe(23)
  })

  it('includes major providers', () => {
    const majorProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'icloud.com',
    ]
    majorProviders.forEach((provider) => {
      expect(BLOCKED_EMAIL_DOMAINS.has(provider)).toBe(true)
    })
  })
})
