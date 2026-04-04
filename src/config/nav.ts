export type NavItem = {
  key: 'blog' | 'projects' | 'about'
  href: string
  external?: boolean
}

export const mainNav: NavItem[] = [
  { key: 'blog', href: '/blog' },
  { key: 'projects', href: '/projects' },
  { key: 'about', href: '/about' },
]
