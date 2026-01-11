import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { isBlockedDomain } from '@/lib/constants'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Get the 'next' parameter for redirect after auth, or default based on role
  const next = searchParams.get('next') ?? '/dashboard'
  const role = searchParams.get('role') // 'employee' or 'employer'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.session) {
      const userEmail = data.session.user.email

      // Server-side blocked domain check for employer signups
      if (role === 'employer' && isBlockedDomain(userEmail)) {
        // Sign out the user since we can't allow this signup
        await supabase.auth.signOut()
        const blockedEmail = encodeURIComponent(userEmail || '')
        return NextResponse.redirect(`${origin}/signup?error=blocked_domain&email=${blockedEmail}`)
      }

      // Determine redirect based on role
      const redirectPath = role === 'employer' ? '/company' : next
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      if (isLocalEnv) {
        // In development, use origin directly
        return NextResponse.redirect(`${origin}${redirectPath}`)
      } else if (forwardedHost) {
        // In production, use forwarded host
        return NextResponse.redirect(`https://${forwardedHost}${redirectPath}`)
      } else {
        return NextResponse.redirect(`${origin}${redirectPath}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth_error`)
}
