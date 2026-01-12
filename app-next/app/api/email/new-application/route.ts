import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { newApplicationEmail } from '@/lib/email/templates'

interface NewApplicationRequest {
  applicationId: string
}

export async function POST(request: Request) {
  try {
    const body: NewApplicationRequest = await request.json()
    const { applicationId } = body

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Fetch application with related data
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select(`
        id,
        cover_message,
        profile:profiles(
          first_name,
          last_name,
          email,
          headline
        ),
        job:jobs(
          id,
          title,
          company:companies(
            name,
            user_id
          )
        )
      `)
      .eq('id', applicationId)
      .single()

    if (appError || !application) {
      console.error('Error fetching application:', appError)
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    const profile = application.profile as { first_name: string; last_name: string; email: string; headline: string | null } | null
    const job = application.job as { id: string; title: string; company: { name: string; user_id: string } | null } | null

    if (!profile || !job || !job.company) {
      return NextResponse.json(
        { error: 'Missing application data' },
        { status: 400 }
      )
    }

    // Get employer's email from auth.users via their user record
    const { data: employerUser, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('id', job.company.user_id)
      .single()

    if (userError || !employerUser) {
      console.error('Error fetching employer:', userError)
      return NextResponse.json(
        { error: 'Employer not found' },
        { status: 404 }
      )
    }

    // Send email
    const html = newApplicationEmail({
      employerName: 'Hiring Manager', // We don't have employer's name stored
      companyName: job.company.name,
      jobTitle: job.title,
      applicantName: `${profile.first_name} ${profile.last_name}`,
      applicantEmail: profile.email,
      applicantHeadline: profile.headline,
      coverMessage: application.cover_message,
      jobId: job.id,
    })

    const result = await sendEmail({
      to: employerUser.email,
      subject: `New application for ${job.title}`,
      html,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, id: result.id })
  } catch (err) {
    console.error('Email API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
