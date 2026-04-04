import { getTranslations } from 'next-intl/server'
import { PostCard } from './PostCard'

// Posts loaded server-side from Velite generated output
let allPosts: {
  title: string
  description: string
  date: string
  tags: string[]
  draft: boolean
  featured: boolean
  slug: string
  slugAsParams: string
}[] = []

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  allPosts = require('@/.velite').posts
} catch {
  allPosts = []
}

type Props = { filterTag?: string }

export async function PostList({ filterTag }: Props) {
  const t = await getTranslations('blog')

  const posts = allPosts
    .filter((p) => !p.draft)
    .filter((p) => (filterTag ? p.tags.includes(filterTag) : true))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (posts.length === 0) {
    return <p className="text-muted-foreground py-8">{t('no_posts')}</p>
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
