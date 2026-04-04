'use client'

import { useTranslations } from 'next-intl'
import { useComments } from '@/queries/comments'
import { CommentItem } from './CommentItem'
import { CommentForm } from './CommentForm'
import type { Comment } from '@/types/comment'

type Props = { slug: string }

export function CommentList({ slug }: Props) {
  const t = useTranslations('comments')
  const { data: comments, isLoading } = useComments(slug)

  return (
    <section className="mt-12 border-t border-border pt-8">
      <h2 className="text-xl font-semibold mb-6">
        {t('title')} {comments ? `(${comments.length})` : ''}
      </h2>
      <CommentForm slug={slug} />
      <div className="mt-8 space-y-6">
        {isLoading && <p className="text-muted-foreground text-sm">{t('loading')}</p>}
        {comments?.map((comment: Comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        {!isLoading && comments?.length === 0 && (
          <p className="text-muted-foreground text-sm">{t('empty')}</p>
        )}
      </div>
    </section>
  )
}
