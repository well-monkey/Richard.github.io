import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // Add specific hostnames here instead of using '**' (which allows SSRF via the image optimizer).
    // Example: { protocol: 'https', hostname: 'images.unsplash.com' }
    remotePatterns: [],
  },
  experimental: {
    mdxRs: true,
  },
}

export default withNextIntl(nextConfig)
