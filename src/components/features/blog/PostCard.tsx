import { Link } from '@/i18n/navigation'
import type { Post } from '@/types/blog'
import { formatDate } from '@/utils/format/date'
import { TagBadge } from './TagBadge'

type Props = { post: Post }

export function PostCard({ post }: Props) {
  return (
    <article className="group flex flex-col gap-3 py-6 border-b border-border last:border-0">
      <div className="flex items-center gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-muted-foreground text-sm line-clamp-2">{post.description}</p>
      <time className="text-xs text-muted-foreground" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
    </article>
  )
}
