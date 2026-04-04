import type { Post } from '@/types/blog'
import { formatDate } from '@/utils/format/date'
import { TagBadge } from './TagBadge'

type Props = { post: Post }

export function PostHeader({ post }: Props) {
  return (
    <header className="mb-10">
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
      <p className="text-lg text-muted-foreground mb-4">{post.description}</p>
      <time className="text-sm text-muted-foreground" dateTime={post.date}>
        {formatDate(post.date, 'MMMM dd, yyyy')}
      </time>
    </header>
  )
}
