import { describe, it, expect } from 'vitest'
import { COLOR_THEMES, type ColorTheme } from '@/config/themes'

describe('Theme Config', () => {
  it('should export exactly 4 color themes', () => {
    expect(COLOR_THEMES).toHaveLength(4)
  })

  it('should include blue, purple, green, orange', () => {
    const values = COLOR_THEMES.map((t) => t.value)
    expect(values).toEqual(['blue', 'purple', 'green', 'orange'])
  })

  it('should have a bg class for each theme', () => {
    for (const theme of COLOR_THEMES) {
      expect(theme.bg).toMatch(/^bg-\[hsl\(/)
    }
  })

  it('ColorTheme type should accept valid values', () => {
    const valid: ColorTheme[] = ['blue', 'purple', 'green', 'orange']
    expect(valid).toHaveLength(4)
  })
})
