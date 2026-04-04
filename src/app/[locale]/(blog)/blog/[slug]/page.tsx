import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PostHeader } from '@/components/features/blog/PostHeader'
import { PostBody } from '@/components/features/blog/PostBody'
import { generateMetadata as genMeta } from '@/utils/seo/metadata'
import { generateArticleJsonLd } from '@/utils/seo/jsonLd'
import type { Post } from '@/types/blog'

// Velite-generated posts — imported after build
let posts: (Post & { body: string })[] = []
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  posts = require('@/.velite').posts
} catch {
  posts = []
}

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return posts
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return genMeta({ title: post.title, description: post.description })
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = posts.find((p) => p.slug === slug)
  if (!post || post.draft) notFound()

  const jsonLd = generateArticleJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <article className="container mx-auto max-w-3xl px-4 py-16">
        <PostHeader post={post} />
        <PostBody content={post.body} />
      </article>
    </>
  )
}
