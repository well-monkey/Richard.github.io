import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { siteConfig } from '@/config/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: `About ${siteConfig.author.name}`,
  }
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('about')

  return (
    <section className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{t('coming_soon')}</p>
      </div>
    </section>
  )
}
