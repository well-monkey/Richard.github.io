import { defineCollection, defineConfig, s } from 'velite'

const posts = defineCollection({
  name: 'Post',
  pattern: 'posts/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(99),
      description: s.string().max(999),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      featured: s.boolean().default(false),
      cover: s.string().optional(),
      // s.path() gives the file path relative to the content root (e.g. "posts/my-post").
      // Using the file path as slug guarantees uniqueness — unlike deriving from title.
      path: s.path(),
      body: s.markdown(),
    })
    .transform((data) => ({
      ...data,
      slug: data.path.replace(/^posts\//, ''),
      slugAsParams: data.path.replace(/^posts\//, ''),
    })),
})

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s.object({
    title: s.string().max(99),
    description: s.string().max(999),
    date: s.isodate(),
    tags: s.array(s.string()).default([]),
    url: s.string().url().optional(),
    github: s.string().url().optional(),
    featured: s.boolean().default(false),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts, projects },
})
