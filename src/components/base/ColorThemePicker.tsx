'use client'

import { useColorTheme, type ColorTheme } from '@/context/color-theme'
import { cn } from '@/utils/cn'

const colors: { value: ColorTheme; bg: string }[] = [
  { value: 'blue', bg: 'bg-[hsl(221.2_83.2%_53.3%)]' },
  { value: 'purple', bg: 'bg-[hsl(262.1_83.3%_57.8%)]' },
  { value: 'green', bg: 'bg-[hsl(142.1_76.2%_36.3%)]' },
  { value: 'orange', bg: 'bg-[hsl(24.6_95%_53.1%)]' },
]

export function ColorThemePicker() {
  const { color, setColor } = useColorTheme()

  return (
    <div className="flex items-center gap-1.5">
      {colors.map(({ value, bg }) => (
        <button
          key={value}
          onClick={() => setColor(value)}
          className={cn(
            'h-4 w-4 rounded-full transition-shadow',
            bg,
            color === value ? 'ring-2 ring-offset-2 ring-offset-background ring-current' : '',
          )}
          aria-label={value}
          aria-pressed={color === value}
        />
      ))}
    </div>
  )
}
