import { cn } from '@/utils/cn'

type Props = { content: string; className?: string }

// `content` is Velite-compiled MDX — generated from repository-controlled source files at
// build time, not from user input. It is safe to inject as HTML without runtime sanitization.
// If this ever ingests external content (CMS, drafts API), sanitize with `sanitize-html` first.
export function PostBody({ content, className }: Props) {
  return (
    <div
      className={cn('prose prose-neutral dark:prose-invert max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
