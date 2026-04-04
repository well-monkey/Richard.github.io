export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function excerpt(content: string, maxLength = 160): string {
  const stripped = content.replace(/#{1,6}\s|[*_~`]/g, '').trim()
  if (stripped.length <= maxLength) return stripped
  return `${stripped.slice(0, maxLength).trimEnd()}…`
}
