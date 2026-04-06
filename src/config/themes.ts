export const COLOR_THEMES = [
  { value: 'blue', bg: 'bg-[hsl(221.2_83.2%_53.3%)]' },
  { value: 'purple', bg: 'bg-[hsl(262.1_83.3%_57.8%)]' },
  { value: 'green', bg: 'bg-[hsl(142.1_76.2%_36.3%)]' },
  { value: 'orange', bg: 'bg-[hsl(24.6_95%_53.1%)]' },
] as const

export type ColorTheme = (typeof COLOR_THEMES)[number]['value']
