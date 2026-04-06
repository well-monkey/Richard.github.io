'use client'

import { useColorTheme } from '@/context/color-theme'
import { COLOR_THEMES } from '@/config/themes'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'

export function ColorThemePicker() {
  const { color, setColor } = useColorTheme()
  const t = useTranslations('theme')

  return (
    <div className="flex items-center gap-1.5">
      {COLOR_THEMES.map(({ value, bg }) => (
        <button
          key={value}
          onClick={() => setColor(value)}
          className={cn(
            'h-4 w-4 rounded-full transition-shadow',
            bg,
            color === value ? 'ring-2 ring-offset-2 ring-offset-background ring-current' : '',
          )}
          aria-label={t(value)}
          aria-pressed={color === value}
        />
      ))}
    </div>
  )
}
