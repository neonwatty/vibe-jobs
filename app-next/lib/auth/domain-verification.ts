/**
 * Employer Domain Verification
 * Based on plans/auth-verification.md
 *
 * Employers must sign up with work emails. Personal email domains are blocked.
 */

// Personal email domains that employers cannot use
export const BLOCKED_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'yahoo.co.in',
  'hotmail.com',
  'hotmail.co.uk',
  'outlook.com',
  'live.com',
  'msn.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'proton.me',
  'zoho.com',
  'yandex.com',
  'mail.com',
  'gmx.com',
  'fastmail.com',
  'tutanota.com',
  'hey.com',
])

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  const parts = email.split('@')
  if (parts.length !== 2) {
    throw new Error('Invalid email address')
  }
  return parts[1].toLowerCase()
}

/**
 * Check if email domain is blocked (personal email)
 */
export function isBlockedDomain(email: string): boolean {
  const domain = extractDomain(email)
  return BLOCKED_DOMAINS.has(domain)
}

/**
 * Verify company domain has valid MX records
 * Must be called server-side
 */
export async function verifyMxRecords(domain: string): Promise<{
  valid: boolean
  reason?: string
}> {
  try {
    // Use DNS over HTTPS for browser compatibility
    const response = await fetch(
      `https://dns.google/resolve?name=${domain}&type=MX`
    )
    const data = await response.json()

    if (data.Answer && data.Answer.length > 0) {
      return { valid: true }
    }

    return { valid: false, reason: 'No MX records found' }
  } catch {
    return { valid: false, reason: 'Could not verify email domain' }
  }
}

/**
 * Verify company has a website
 * Must be called server-side
 */
export async function verifyWebsite(domain: string): Promise<{
  valid: boolean
  reason?: string
}> {
  const urls = [`https://${domain}`, `https://www.${domain}`]

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        signal: AbortSignal.timeout(5000),
      })
      if (response.ok || response.status === 301 || response.status === 302) {
        return { valid: true }
      }
    } catch {
      // Try next URL
    }
  }

  return { valid: false, reason: 'No company website found' }
}

/**
 * Full domain verification for employer signup
 */
export async function verifyEmployerDomain(email: string): Promise<{
  valid: boolean
  domain: string
  reason?: string
}> {
  const domain = extractDomain(email)

  // Check blocked domains first
  if (BLOCKED_DOMAINS.has(domain)) {
    return {
      valid: false,
      domain,
      reason:
        'Please sign up with your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted for employer accounts.',
    }
  }

  // Verify MX records
  const mxResult = await verifyMxRecords(domain)
  if (!mxResult.valid) {
    return {
      valid: false,
      domain,
      reason:
        "We couldn't verify your email domain. Please ensure you're using a valid company email address.",
    }
  }

  // Verify website exists
  const websiteResult = await verifyWebsite(domain)
  if (!websiteResult.valid) {
    return {
      valid: false,
      domain,
      reason:
        "We couldn't find a website for your company domain. If your company is new, please contact support for manual verification.",
    }
  }

  return { valid: true, domain }
}

/**
 * Error messages for domain verification failures
 */
export const DOMAIN_ERROR_MESSAGES = {
  blocked:
    'Please sign up with your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted for employer accounts.',
  no_mx:
    "We couldn't verify your email domain. Please ensure you're using a valid company email address.",
  no_website:
    "We couldn't find a website for your company domain. If your company is new, please contact support for manual verification.",
}
