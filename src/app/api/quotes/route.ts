import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

/**
 * POST /api/quotes — Custom RFQ submission endpoint
 * Per architecture.md §3: wraps validation, honeypot check, and reference number
 * generation before delegating to payload.create
 */

// Simple in-memory rate limiting
const rateLimits = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimits.get(ip)
  if (!limit || now > limit.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + 60000 }) // 1 minute window
    return true
  }
  if (limit.count >= 5) return false // 5 requests per minute max
  limit.count++
  return true
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()

    // Honeypot check — if the hidden field has a value, it's a bot
    if (body.website) {
      // Silently discard per PRD.md §7
      return NextResponse.json({ referenceNumber: 'OMP-Q-0000-0000', status: 'received' })
    }

    // Validation
    if (!body.buyerName?.trim()) {
      return NextResponse.json({ error: 'Buyer name is required' }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

    const payload = await getPayloadClient()

    // Generate reference number
    const year = new Date().getFullYear()
    const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')
    const referenceNumber = `OMP-Q-${year}-${seq}`

    // Format items for Payload
    const items = body.items?.map((item: any) => ({
      product: item.productId,
      quantity: item.quantity || '',
    })) || []

    // Create quote via Payload
    const doc = await payload.create({
      collection: 'quotes',
      data: {
        referenceNumber,
        buyerName: body.buyerName,
        company: body.company || '',
        phone: body.phone,
        email: body.email || '',
        city: body.city || '',
        items,
        message: body.message || '',
        source: body.source || 'website',
        status: 'new',
      },
    })

    return NextResponse.json({
      referenceNumber: doc.referenceNumber,
      status: 'received',
    })
  } catch (error) {
    console.error('[API] Quote submission error:', error)
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 })
  }
}
