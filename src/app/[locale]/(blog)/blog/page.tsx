import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PostList } from '@/components/features/blog/PostList'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('title'),
    description: 'Thoughts on software development, technology, and more.',
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  return (
    <section className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <PostList />
    </section>
  )
}
