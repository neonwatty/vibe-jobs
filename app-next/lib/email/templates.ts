// Email templates for VibeJobs notifications

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Shared styles
const styles = {
  container: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;',
  header: 'font-size: 24px; font-weight: 700; color: #0a0a0a; margin-bottom: 20px;',
  logo: 'font-size: 24px; font-weight: 700; color: #0a0a0a;',
  accent: 'color: #ff6b00;',
  card: 'background-color: #f5f5f5; border-radius: 12px; padding: 20px; margin: 20px 0;',
  button: 'display: inline-block; background-color: #ff6b00; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600;',
  text: 'color: #404040; line-height: 1.6; margin: 16px 0;',
  label: 'font-size: 12px; color: #808080; text-transform: uppercase; letter-spacing: 0.5px;',
  footer: 'color: #808080; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;',
}

interface NewApplicationEmailParams {
  employerName: string
  companyName: string
  jobTitle: string
  applicantName: string
  applicantEmail: string
  applicantHeadline?: string | null
  coverMessage?: string | null
  jobId: string
}

export function newApplicationEmail({
  employerName,
  companyName,
  jobTitle,
  applicantName,
  applicantEmail,
  applicantHeadline,
  coverMessage,
  jobId,
}: NewApplicationEmailParams): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <div style="${styles.container}">
    <div style="${styles.logo}">
      vibe<span style="${styles.accent}">jobs</span>
    </div>

    <h1 style="${styles.header}">New Application Received</h1>

    <p style="${styles.text}">
      Hi ${employerName},
    </p>

    <p style="${styles.text}">
      Great news! You have a new applicant for <strong>${jobTitle}</strong> at ${companyName}.
    </p>

    <div style="${styles.card}">
      <div style="${styles.label}">APPLICANT</div>
      <p style="margin: 8px 0; font-size: 18px; font-weight: 600; color: #0a0a0a;">
        ${applicantName}
      </p>
      ${applicantHeadline ? `<p style="margin: 4px 0; color: #606060;">${applicantHeadline}</p>` : ''}
      <p style="margin: 4px 0; color: #808080; font-size: 14px;">${applicantEmail}</p>
    </div>

    ${coverMessage ? `
    <div style="${styles.card}">
      <div style="${styles.label}">COVER MESSAGE</div>
      <p style="margin: 8px 0; color: #404040; white-space: pre-line;">${coverMessage}</p>
    </div>
    ` : ''}

    <div style="margin: 30px 0;">
      <a href="${SITE_URL}/company/jobs/${jobId}/applications" style="${styles.button}">
        View Application
      </a>
    </div>

    <div style="${styles.footer}">
      <p>You're receiving this because you posted a job on VibeJobs.</p>
      <p>© ${new Date().getFullYear()} VibeJobs. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}

interface StatusChangeEmailParams {
  applicantName: string
  jobTitle: string
  companyName: string
  newStatus: string
}

const statusMessages: Record<string, { title: string; message: string; color: string }> = {
  reviewing: {
    title: 'Application Under Review',
    message: 'Your application is now being reviewed by the hiring team. This is a positive sign!',
    color: '#3b82f6', // blue
  },
  interviewing: {
    title: 'Interview Stage',
    message: 'Congratulations! You\'ve moved to the interview stage. The company will reach out soon with next steps.',
    color: '#10b981', // green
  },
  offered: {
    title: 'Job Offer',
    message: 'Amazing news! You\'ve received a job offer. Check your email for details from the company.',
    color: '#ff6b00', // accent
  },
  rejected: {
    title: 'Application Update',
    message: 'Unfortunately, the company has decided to move forward with other candidates. Don\'t give up - keep applying!',
    color: '#ef4444', // red
  },
  withdrawn: {
    title: 'Application Withdrawn',
    message: 'Your application has been withdrawn as requested.',
    color: '#808080', // gray
  },
}

export function statusChangeEmail({
  applicantName,
  jobTitle,
  companyName,
  newStatus,
}: StatusChangeEmailParams): string {
  const statusInfo = statusMessages[newStatus] || {
    title: 'Application Status Update',
    message: `Your application status has been updated to: ${newStatus}`,
    color: '#ff6b00',
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff;">
  <div style="${styles.container}">
    <div style="${styles.logo}">
      vibe<span style="${styles.accent}">jobs</span>
    </div>

    <h1 style="${styles.header}">${statusInfo.title}</h1>

    <p style="${styles.text}">
      Hi ${applicantName},
    </p>

    <p style="${styles.text}">
      ${statusInfo.message}
    </p>

    <div style="${styles.card}">
      <div style="${styles.label}">JOB</div>
      <p style="margin: 8px 0; font-size: 18px; font-weight: 600; color: #0a0a0a;">
        ${jobTitle}
      </p>
      <p style="margin: 4px 0; color: #606060;">${companyName}</p>

      <div style="margin-top: 16px;">
        <div style="${styles.label}">STATUS</div>
        <p style="margin: 8px 0;">
          <span style="display: inline-block; background-color: ${statusInfo.color}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: 500; text-transform: capitalize;">
            ${newStatus}
          </span>
        </p>
      </div>
    </div>

    <div style="margin: 30px 0;">
      <a href="${SITE_URL}/dashboard/applications" style="${styles.button}">
        View My Applications
      </a>
    </div>

    <p style="${styles.text}">
      Keep your profile up to date to increase your chances. Companies love candidates with strong AI tool skills!
    </p>

    <div style="${styles.footer}">
      <p>You're receiving this because you applied for a job on VibeJobs.</p>
      <p>© ${new Date().getFullYear()} VibeJobs. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
}
