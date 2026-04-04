export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read'
  return `${Math.ceil(minutes)} min read`
}
