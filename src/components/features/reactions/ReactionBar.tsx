'use client'

import { useReactions, useToggleLike } from '@/queries/reactions'
import { formatCompact } from '@/utils/format/number'
import { cn } from '@/utils/cn'

type Props = { slug: string }

export function ReactionBar({ slug }: Props) {
  const { data } = useReactions(slug)
  const { mutate: toggle } = useToggleLike(slug)

  return (
    <div className="flex items-center gap-3 py-4">
      <button
        onClick={() => toggle()}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium border transition-colors',
          data?.hasLiked
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border hover:border-primary hover:text-primary',
        )}
        aria-label="Like this post"
      >
        ♥ {data ? formatCompact(data.likes) : '—'}
      </button>
    </div>
  )
}
