import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

type MetaOptions = {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex,
}: MetaOptions = {}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const resolvedDescription = description ?? siteConfig.description
  const resolvedImage = image ?? `${siteConfig.url}/og.png`

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: resolvedImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
