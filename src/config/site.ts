export const siteConfig = {
  name: 'Richard',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description: 'Personal blog and portfolio by Richard.',
  author: {
    name: 'Richard',
    email: 'hello@richard.dev',
    github: 'https://github.com/richard',
    twitter: 'https://twitter.com/richard',
  },
  keywords: ['blog', 'technology', 'programming', 'web development'],
} as const

export type SiteConfig = typeof siteConfig
