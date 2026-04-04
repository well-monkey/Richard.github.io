import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ok, fail } from '@/types/api'
import { z } from 'zod'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

const slugSchema = z.string().min(1).max(200)

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const parsed = slugSchema.safeParse(slug)
  if (!parsed.success) {
    return NextResponse.json(fail('Invalid slug'), { status: 400 })
  }

  try {
    const view = await db.view.findUnique({ where: { postSlug: parsed.data } })
    return NextResponse.json(ok({ count: view?.count ?? 0 }))
  } catch (err) {
    console.error('[views GET]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!rateLimit(`views:${ip}`, 30, 60_000)) {
    return NextResponse.json(fail('Too many requests'), { status: 429 })
  }

  const body = await request.json()
  const parsed = slugSchema.safeParse(body?.slug)
  if (!parsed.success) {
    return NextResponse.json(fail('Invalid slug'), { status: 400 })
  }

  try {
    const view = await db.view.upsert({
      where: { postSlug: parsed.data },
      create: { postSlug: parsed.data, count: 1 },
      update: { count: { increment: 1 } },
    })
    return NextResponse.json(ok({ count: view.count }))
  } catch (err) {
    console.error('[views POST]', err)
    return NextResponse.json(fail('Internal server error'), { status: 500 })
  }
}
