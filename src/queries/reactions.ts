'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useReactions(slug: string) {
  return useQuery({
    queryKey: ['reactions', slug],
    queryFn: async () => {
      const res = await fetch(`/api/reactions?slug=${slug}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to fetch reactions')
      return json.data as { likes: number; hasLiked: boolean }
    },
  })
}

export function useToggleLike(slug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, type: 'like' }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reactions', slug] })
    },
  })
}
