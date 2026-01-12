import { describe, it, expect } from 'vitest'
import {
  isBlockedDomain,
  extractDomain,
  BLOCKED_EMAIL_DOMAINS
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
  })

  describe('allows work email domains', () => {
    it('allows company.com', () => {
      expect(isBlockedDomain('user@company.com')).toBe(false)
    })

    it('allows startup.io', () => {
      expect(isBlockedDomain('user@startup.io')).toBe(false)
    })

    it('allows acme.co', () => {
      expect(isBlockedDomain('user@acme.co')).toBe(false)
    })

    it('allows enterprise.org', () => {
      expect(isBlockedDomain('user@enterprise.org')).toBe(false)
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
      expect(isBlockedDomain('invalidemail')).toBe(false)
    })

    it('returns false for email without domain', () => {
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

    it('blocks gMaIl.CoM (random case)', () => {
      expect(isBlockedDomain('user@gMaIl.CoM')).toBe(true)
    })
  })

  describe('blocks all domains in BLOCKED_EMAIL_DOMAINS', () => {
    // Test all 23 blocked domains
    const blockedDomains = Array.from(BLOCKED_EMAIL_DOMAINS)

    it.each(blockedDomains)('blocks %s', (domain) => {
      expect(isBlockedDomain(`test@${domain}`)).toBe(true)
    })
  })
})

describe('extractDomain', () => {
  it('extracts domain from valid email', () => {
    expect(extractDomain('user@example.com')).toBe('example.com')
  })

  it('extracts domain and lowercases it', () => {
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
    expect(extractDomain('invalidemail')).toBeUndefined()
  })

  it('returns empty string for email without domain', () => {
    expect(extractDomain('user@')).toBe('')
  })
})

describe('BLOCKED_EMAIL_DOMAINS', () => {
  it('contains 23 blocked domains', () => {
    expect(BLOCKED_EMAIL_DOMAINS.size).toBe(23)
  })

  it('includes common personal email providers', () => {
    expect(BLOCKED_EMAIL_DOMAINS.has('gmail.com')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('yahoo.com')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('hotmail.com')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('outlook.com')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('icloud.com')).toBe(true)
  })

  it('includes privacy-focused email providers', () => {
    expect(BLOCKED_EMAIL_DOMAINS.has('protonmail.com')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('proton.me')).toBe(true)
    expect(BLOCKED_EMAIL_DOMAINS.has('tutanota.com')).toBe(true)
  })
})
