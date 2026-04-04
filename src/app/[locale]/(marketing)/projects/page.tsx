import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'projects' })
  return {
    title: t('title'),
    description: 'Open source projects and side projects.',
  }
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('projects')

  return (
    <section className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>
      <p className="text-muted-foreground">{t('coming_soon')}</p>
    </section>
  )
}
