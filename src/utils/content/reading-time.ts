const WORDS_PER_MINUTE = 200

export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return words / WORDS_PER_MINUTE
}
