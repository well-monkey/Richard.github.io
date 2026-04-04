'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { useTransition } from 'react'
import { cn } from '@/utils/cn'

const LOCALES = [
  { code: 'zh', label: '中' },
  { code: 'en', label: 'EN' },
] as const

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next })
    })
  }

  return (
    <div className="flex items-center rounded-md border border-border overflow-hidden">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          disabled={isPending || locale === code}
          className={cn(
            'px-2 py-1 text-xs font-medium transition-colors',
            locale === code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
