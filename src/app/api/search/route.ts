import { NextRequest, NextResponse } from 'next/server'
import { ok, fail } from '@/types/api'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)
  if (!rateLimit(`search:${ip}`, 30, 60_000)) {
    return NextResponse.json(fail('Too many requests'), { status: 429 })
  }

  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json(fail('Query too short'), { status: 400 })
  }

  // Posts are loaded from the Velite-generated module
  let posts: { title: string; description: string; slug: string; tags: string[] }[] = []
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    posts = require('@/.velite').posts
  } catch {
    posts = []
  }

  const lower = q.toLowerCase()
  const results = posts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)),
    )
    .slice(0, 10)
    .map(({ title, description, slug }) => ({ title, description, slug }))

  return NextResponse.json(ok(results))
}
