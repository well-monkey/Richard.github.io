import { NextRequest } from 'next/server'

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

/** Returns true if the request is within the rate limit, false if it should be blocked. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= limit) {
    return false
  }

  store.set(key, { count: entry.count + 1, resetAt: entry.resetAt })
  return true
}

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
