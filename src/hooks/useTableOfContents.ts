'use client'

import { useEffect, useState } from 'react'

export function useTableOfContents(selector = 'h2, h3'): string {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll(selector))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '0% 0% -80% 0%' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [selector])

  return activeId
}
