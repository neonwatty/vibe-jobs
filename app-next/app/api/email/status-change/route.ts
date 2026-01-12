import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/resend'
import { statusChangeEmail } from '@/lib/email/templates'

interface StatusChangeRequest {
  applicationId: string
  oldStatus: string
  newStatus: string
}

export async function POST(request: Request) {
  try {
    const body: StatusChangeRequest = await request.json()
    const { applicationId, oldStatus, newStatus } = body

    if (!applicationId || !newStatus) {
      return NextResponse.json(
        { error: 'Application ID and new status required' },
        { status: 400 }
      )
    }

    // Don't send email if status didn't actually change
    if (oldStatus === newStatus) {
      return NextResponse.json({ success: true, skipped: true })
    }

    const supabase = await createClient()

    // Fetch application with related data
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select(`
        id,
        profile:profiles(
          first_name,
          last_name,
          email
        ),
        job:jobs(
          id,
          title,
          company:companies(
            name
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

    const profile = application.profile as { first_name: string; last_name: string; email: string } | null
    const job = application.job as { id: string; title: string; company: { name: string } | null } | null

    if (!profile || !job || !job.company) {
      return NextResponse.json(
        { error: 'Missing application data' },
        { status: 400 }
      )
    }

    // Send email to applicant
    const html = statusChangeEmail({
      applicantName: profile.first_name,
      jobTitle: job.title,
      companyName: job.company.name,
      newStatus,
    })

    const statusLabel = newStatus.charAt(0).toUpperCase() + newStatus.slice(1)

    const result = await sendEmail({
      to: profile.email,
      subject: `Application update: ${statusLabel} - ${job.title}`,
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
