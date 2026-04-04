import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ok, fail } from '@/types/api'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const slugSchema = z.string().min(1).max(200)
const createSchema = z.object({
  postSlug: z.string().min(1).max(200),
  author: z.string().min(1).max(50).trim(),
  email: z.string().email(),
  body: z.string().min(1).max(2000).trim(),
})

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const parsed = slugSchema.safeParse(slug)
  if (!parsed.success) {
    return NextResponse.json(fail('Invalid slug'), { status: 400 })
  }

  try {
    const comments = await db.comment.findMany({
      where: { postSlug: parsed.data },
      orderBy: { createdAt: 'desc' },
      select: { id: true, postSlug: true, author: true, body: true, createdAt: true },
    })
    return NextResponse.json(ok(comments))
  } catch (err) {
    console.error('[comments GET]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!rateLimit(`comments:${ip}`, 5, 60_000)) {
    return NextResponse.json(fail('Too many requests'), { status: 429 })
  }

  const body = await request.json()
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(fail(parsed.error.errors[0]?.message ?? 'Validation error'), { status: 400 })
  }

  try {
    const comment = await db.comment.create({ data: parsed.data })
    const { email: _email, ...safe } = comment
    return NextResponse.json(ok(safe), { status: 201 })
  } catch (err) {
    console.error('[comments POST]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}
