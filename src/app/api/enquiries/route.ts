import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * POST /api/enquiries — General enquiry submission endpoint
 * Per architecture.md §3
 */

const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimits.get(ip)
  if (!limit || now > limit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60000 })
    return true
  }
  if (limit.count >= 5) return false
  limit.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()

    // Honeypot
    if (body.website) {
      return NextResponse.json({ referenceNumber: 'OMP-E-0000-0000', status: 'received' })
    }

    // Validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    const year = new Date().getFullYear()
    const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')
    const referenceNumber = `OMP-E-${year}-${seq}`

    const doc = await payload.create({
      collection: 'enquiries',
      data: {
        referenceNumber,
        name: body.name,
        phone: body.phone,
        email: body.email || '',
        company: body.company || '',
        message: body.message,
        status: 'new',
      },
    })

    return NextResponse.json({
      referenceNumber: doc.referenceNumber,
      status: 'received',
    })
  } catch (error) {
    console.error('[API] Enquiry submission error:', error)
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
