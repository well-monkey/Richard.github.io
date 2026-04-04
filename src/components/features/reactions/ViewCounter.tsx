'use client'

import { useEffect } from 'react'
import { useViews, useIncrementView } from '@/queries/views'
import { formatCompact } from '@/utils/format/number'

type Props = { slug: string }

export function ViewCounter({ slug }: Props) {
  const { data } = useViews(slug)
  const { mutate: increment } = useIncrementView(slug)

  useEffect(() => {
    // Deduplicate per session: only increment once per post per browser session.
    const key = `viewed:${slug}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
    increment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  return (
    <span className="text-xs text-muted-foreground">
      {data ? `${formatCompact(data.count)} views` : '—'}
    </span>
  )
}
