import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vibejobs.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Dynamic job pages
  try {
    const supabase = await createClient()
    const { data: jobs } = await supabase
      .from('jobs')
      .select('id, updated_at')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    const jobPages: MetadataRoute.Sitemap = (jobs || []).map((job) => ({
      url: `${baseUrl}/jobs/${job.id}`,
      lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...jobPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
