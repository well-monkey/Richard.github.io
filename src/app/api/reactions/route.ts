import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ok, fail } from '@/types/api'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const slugSchema = z.string().min(1).max(200)
const toggleSchema = z.object({
  slug: slugSchema,
  type: z.enum(['like']),
})

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax' as const,
}

async function getOrCreateSessionId(): Promise<{ sessionId: string; isNew: boolean }> {
  const cookieStore = await cookies()
  const existing = cookieStore.get('session_id')?.value
  if (existing) return { sessionId: existing, isNew: false }
  return { sessionId: crypto.randomUUID(), isNew: true }
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const parsed = slugSchema.safeParse(slug)
  if (!parsed.success) return NextResponse.json(fail('Invalid slug'), { status: 400 })

  const { sessionId, isNew } = await getOrCreateSessionId()

  try {
    const [likes, hasLiked] = await Promise.all([
      db.reaction.count({ where: { postSlug: parsed.data, type: 'like' } }),
      db.reaction.findUnique({
        where: { postSlug_type_sessionId: { postSlug: parsed.data, type: 'like', sessionId } },
      }),
    ])

    const response = NextResponse.json(ok({ likes, hasLiked: !!hasLiked }))
    // Persist the session cookie on first visit so subsequent GET calls are consistent
    if (isNew) {
      response.cookies.set('session_id', sessionId, COOKIE_OPTIONS)
    }
    return response
  } catch (err) {
    console.error('[reactions GET]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!rateLimit(`reactions:${ip}`, 20, 60_000)) {
    return NextResponse.json(fail('Too many requests'), { status: 429 })
  }

  const body = await request.json()
  const parsed = toggleSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(fail('Validation error'), { status: 400 })
  }

  const { sessionId, isNew } = await getOrCreateSessionId()
  const { slug, type } = parsed.data

  try {
    const existing = await db.reaction.findUnique({
      where: { postSlug_type_sessionId: { postSlug: slug, type, sessionId } },
    })

    if (existing) {
      await db.reaction.delete({ where: { id: existing.id } })
    } else {
      await db.reaction.create({ data: { postSlug: slug, type, sessionId } })
    }

    const response = NextResponse.json(ok({ toggled: !existing }))
    if (isNew) {
      response.cookies.set('session_id', sessionId, COOKIE_OPTIONS)
    }
    return response
  } catch (err) {
    console.error('[reactions POST]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}
