import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatDate(date: string | Date, fmt = 'MMM dd, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, fmt)
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true, locale: zhCN })
}

export function formatISO(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return d.toISOString()
}
