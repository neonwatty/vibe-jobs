import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import JobDetailClient from '@/components/jobs/JobDetailClient'

interface Props {
  params: Promise<{ id: string }>
}

async function getJob(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      company:companies(
        id,
        name,
        description,
        website,
        logo_url,
        size,
        industry,
        headquarters,
        remote_policy,
        ai_culture,
        ai_tools_used,
        domain_verified
      )
    `)
    .eq('id', id)
    .single()

  if (error) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const job = await getJob(id)

  if (!job) {
    return {
      title: 'Job Not Found | Vibe Jobs',
      description: 'This job listing could not be found.',
    }
  }

  const salary = job.salary_min && job.salary_max
    ? `$${Math.round(job.salary_min / 1000)}k - $${Math.round(job.salary_max / 1000)}k`
    : ''

  const description = job.description
    ? job.description.slice(0, 160)
    : `${job.title} at ${job.company?.name}. ${salary} ${job.location_type}`.trim()

  return {
    title: `${job.title} at ${job.company?.name} | Vibe Jobs`,
    description,
    openGraph: {
      title: `${job.title} at ${job.company?.name}`,
      description,
      type: 'website',
      siteName: 'Vibe Jobs',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} at ${job.company?.name}`,
      description,
    },
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params
  const job = await getJob(id)

  return <JobDetailClient jobId={id} initialJob={job} />
}
