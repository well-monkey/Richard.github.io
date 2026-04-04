'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateCommentInput } from '@/types/comment'

export function useComments(slug: string) {
  return useQuery({
    queryKey: ['comments', slug],
    queryFn: async () => {
      const res = await fetch(`/api/comments?slug=${slug}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to fetch comments')
      return json.data
    },
  })
}

export function useCreateComment(slug: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreateCommentInput) => {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', slug] })
    },
  })
}
