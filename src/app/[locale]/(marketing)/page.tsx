import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/config/site'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home' })
  return {
    title: siteConfig.name,
    description: siteConfig.description,
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')

  return (
    <section className="container mx-auto max-w-4xl px-4 py-24">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t('greeting', { name: siteConfig.author.name })}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          {siteConfig.description}
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t('cta_blog')}
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            {t('cta_about')}
          </Link>
        </div>
      </div>
    </section>
  )
}
