import { siteConfig } from '@/config/site'

/**
 * Safely serializes JSON for injection inside a <script type="application/ld+json"> tag.
 * JSON.stringify alone does not escape </script>, which allows XSS via crafted field values.
 */
function safeJsonStringify(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function generateArticleJsonLd(post: {
  title: string
  description: string
  date: string
  slug: string
}): string {
  return safeJsonStringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
  })
}

export function generateWebSiteJsonLd(): string {
  return safeJsonStringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
  })
}
