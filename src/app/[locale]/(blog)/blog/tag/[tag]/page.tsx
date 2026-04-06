import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { PostList } from '@/components/features/blog/PostList'

type Props = { params: Promise<{ locale: string; tag: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tag } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return { title: t('tagged_posts', { tag }) }
}

export default async function TagPage({ params }: Props) {
  const { locale, tag } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  return (
    <section className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">
        {t('tag_title', { tag })}
      </h1>
      <PostList filterTag={tag} />
    </section>
  )
}
