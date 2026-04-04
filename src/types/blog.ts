export type Post = {
  title: string
  description: string
  date: string
  tags: string[]
  draft: boolean
  featured: boolean
  cover?: string
  slug: string
  slugAsParams: string
}

export type Project = {
  title: string
  description: string
  date: string
  tags: string[]
  url?: string
  github?: string
  featured: boolean
}
