export type Comment = {
  id: string
  postSlug: string
  author: string
  email: string
  body: string
  createdAt: string
}

export type CreateCommentInput = {
  postSlug: string
  author: string
  email: string
  body: string
}
