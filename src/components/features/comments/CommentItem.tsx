import type { Comment } from '@/types/comment'
import { formatRelativeTime } from '@/utils/format/date'

type Props = { comment: Comment }

export function CommentItem({ comment }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium uppercase">
          {comment.author[0] ?? '?'}
        </div>
        <span className="text-sm font-medium">{comment.author}</span>
        <span className="text-xs text-muted-foreground">
          {formatRelativeTime(comment.createdAt)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground pl-9">{comment.body}</p>
    </div>
  )
}
