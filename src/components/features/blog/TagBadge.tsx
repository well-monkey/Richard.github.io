import { Link } from '@/i18n/navigation'
import { cn } from '@/utils/cn'

type Props = { tag: string; className?: string }

export function TagBadge({ tag, className }: Props) {
  return (
    <Link
      href={`/blog/tag/${tag}`}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors',
        className,
      )}
    >
      {tag}
    </Link>
  )
}
