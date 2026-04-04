import { cn } from '@/utils/cn'
import type { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'danger' | 'tip'

const styles: Record<CalloutType, string> = {
  info: 'border-blue-500/50 bg-blue-500/10 text-blue-900 dark:text-blue-200',
  warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-900 dark:text-yellow-200',
  danger: 'border-red-500/50 bg-red-500/10 text-red-900 dark:text-red-200',
  tip: 'border-green-500/50 bg-green-500/10 text-green-900 dark:text-green-200',
}

const icons: Record<CalloutType, string> = {
  info: 'ℹ️',
  warning: '⚠️',
  danger: '🚨',
  tip: '💡',
}

type Props = { type?: CalloutType; children: ReactNode }

export function Callout({ type = 'info', children }: Props) {
  return (
    <div className={cn('my-4 flex gap-3 rounded-lg border p-4', styles[type])}>
      <span className="shrink-0 text-lg">{icons[type]}</span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}
