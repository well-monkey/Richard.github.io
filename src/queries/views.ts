'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useViews(slug: string) {
  return useQuery({
    queryKey: ['views', slug],
    queryFn: async () => {
      const res = await fetch(`/api/views?slug=${slug}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to fetch views')
      return json.data as { count: number }
    },
  })
}

export function useIncrementView(slug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['views', slug] })
    },
  })
}
