import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

let posts: { slug: string; date: string }[] = []
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  posts = require('@/.velite').posts
} catch {
  posts = []
}

export default function sitemap(): MetadataRoute.Sitemap {
  const postRoutes = posts
    .filter((p) => !(p as { draft?: boolean }).draft)
    .map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/projects`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...postRoutes,
  ]
}
