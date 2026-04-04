import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { PostList } from '@/components/features/blog/PostList'

type Props = { params: Promise<{ locale: string; tag: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return { title: `Posts tagged "${tag}"` }
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params
  setRequestLocale(locale)

  return (
    <section className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">
        Tag: <span className="text-primary">{tag}</span>
      </h1>
      <PostList filterTag={tag} />
    </section>
  )
}
