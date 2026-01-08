# Vibe Jobs - Authentication & User Verification

## Overview

Different verification levels for employees vs employers to balance friction with trust.

---

## Employee (Job Seeker) Auth

**OAuth Providers:**
- Google OAuth (covers everyone)
- GitHub OAuth (on-brand for engineers)

**Verification Level:** Low friction
- Email verification via OAuth is sufficient
- No work email requirement for job seekers

---

## Employer Auth

**OAuth Providers:**
- Google OAuth (works with Google Workspace company emails)
- GitHub OAuth (optional, for tech companies)

**Verification Requirements:**
1. **Work Email Required** - Must use company domain email, not personal
2. **Domain Blocklist** - Reject signups from personal email domains
3. **Domain Verification** - Verify company owns the domain (MX + website check)

---

## Personal Email Domain Blocklist

Employers must sign up with a work email. Reject these domains:

```
gmail.com
googlemail.com
yahoo.com
yahoo.co.uk
yahoo.co.in
hotmail.com
hotmail.co.uk
outlook.com
live.com
msn.com
aol.com
icloud.com
me.com
mac.com
protonmail.com
proton.me
zoho.com
yandex.com
mail.com
gmx.com
fastmail.com
tutanota.com
hey.com
```

**Note:** Google Workspace users have company domains (e.g., `@acmecorp.com`) but sign in via Google OAuth. This is allowed because their email domain is not on the blocklist.

---

## Employer Signup Flow

```
1. Employer clicks "Post a Job" or "Sign up as Employer"
2. Chooses Google OAuth (or GitHub)
3. Completes OAuth flow
4. We receive their email (e.g., hiring@acmecorp.com)
5. Extract domain from email
6. Check email domain against blocklist:
   - If blocked domain → Show error: "Please use your work email to sign up as an employer"
   - If company domain → Continue
7. Domain verification (automated):
   - Check domain has valid MX records
   - Check domain has a website
8. Create employer account
9. Proceed to company profile setup
```

---

## Domain Verification (v1 - Automated)

Simple checks to verify the company domain is legitimate:

```javascript
const BLOCKED_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me',
  'zoho.com', 'yandex.com', 'mail.com', 'gmx.com', 'fastmail.com',
  'tutanota.com', 'hey.com'
])

function isBlockedDomain(email) {
  const domain = email.split('@')[1].toLowerCase()
  return BLOCKED_DOMAINS.has(domain)
}

async function verifyCompanyDomain(domain) {
  // 1. Check MX records exist (proves email is deliverable)
  try {
    const mxRecords = await dns.resolveMx(domain)
    if (!mxRecords.length) {
      return { valid: false, reason: 'No MX records found' }
    }
  } catch {
    return { valid: false, reason: 'Could not verify email domain' }
  }

  // 2. Check website exists (proves company is real)
  try {
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      timeout: 5000
    })
    if (!response.ok) throw new Error('No website')
  } catch {
    // Try www subdomain
    try {
      const response = await fetch(`https://www.${domain}`, {
        method: 'HEAD',
        timeout: 5000
      })
      if (!response.ok) throw new Error('No website')
    } catch {
      return { valid: false, reason: 'No company website found' }
    }
  }

  return { valid: true }
}
```

---

## Error Messages

**Blocked domain:**
> "Please sign up with your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted for employer accounts."

**No MX records:**
> "We couldn't verify your email domain. Please ensure you're using a valid company email address."

**No website:**
> "We couldn't find a website for your company domain. If your company is new, please contact support for manual verification."

---

## Data Model Updates

**companies table - add:**
```sql
email_domain TEXT NOT NULL,
domain_verified BOOLEAN DEFAULT false,
verified_at TIMESTAMP
```

**auth.users metadata (Supabase):**
```json
{
  "user_type": "employee" | "employer",
  "email_domain": "acmecorp.com"
}
```

---

## Future Enhancements (v2+)

1. **Manual verification queue** - For companies that fail automated checks
2. **DNS TXT record verification** - Bulletproof domain ownership proof
3. **LinkedIn company page verification** - Must be admin of company page
4. **Verified badge** - Show on job listings for verified companies
