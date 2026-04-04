'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { useUIStore } from '@/store/useUIStore'
import { mainNav } from '@/config/nav'
import { cn } from '@/utils/cn'

export function MobileNav() {
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUIStore()
  const t = useTranslations('nav')

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMobileNav}
        className="p-2 text-muted-foreground hover:text-foreground"
        aria-label="Toggle menu"
      >
        <span className={cn('block w-5 h-0.5 bg-current transition-all', isMobileNavOpen && 'rotate-45 translate-y-1')} />
        <span className={cn('block w-5 h-0.5 bg-current my-1 transition-all', isMobileNavOpen && 'opacity-0')} />
        <span className={cn('block w-5 h-0.5 bg-current transition-all', isMobileNavOpen && '-rotate-45 -translate-y-1')} />
      </button>

      {isMobileNavOpen && (
        <div className="absolute top-14 left-0 w-full border-b border-border bg-background px-4 py-4 shadow-lg">
          <nav className="flex flex-col gap-3">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className="text-sm text-muted-foreground hover:text-foreground py-1"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
