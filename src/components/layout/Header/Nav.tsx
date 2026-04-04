import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { mainNav } from '@/config/nav'

export async function Nav() {
  const t = await getTranslations('nav')

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-muted-foreground transition-colors hover:text-foreground"
          {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {t(item.key)}
        </Link>
      ))}
    </nav>
  )
}
