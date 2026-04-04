import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/config/site'

export async function Footer() {
  const t = await getTranslations('footer')

  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {siteConfig.author.name}. {t('rights')}</p>
        <div className="flex items-center gap-4">
          <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={siteConfig.author.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
