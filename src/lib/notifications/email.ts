/**
 * Email notification service using Resend
 * Sends notifications to admin when new Quotes/Enquiries are submitted
 * Per architecture.md §2.3–2.4 afterChange hooks
 */

interface QuoteDoc {
  referenceNumber: string
  buyerName: string
  company?: string
  phone: string
  email?: string
  city?: string
  message?: string
  items?: Array<{ product: any; quantity?: string }>
}

interface EnquiryDoc {
  referenceNumber: string
  name: string
  phone: string
  email?: string
  company?: string
  message: string
}

async function sendEmail(subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ompolyplast.com'

  if (!apiKey || apiKey.startsWith('re_test')) {
    console.log('[Email] Dev mode — would send:')
    console.log(`  To: ${adminEmail}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  Body: ${html.substring(0, 200)}...`)
    return
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'OM Polyplast <notifications@ompolyplast.com>',
      to: adminEmail,
      subject,
      html,
    })
    console.log(`[Email] Sent: ${subject}`)
  } catch (error) {
    console.error('[Email] Failed to send:', error)
  }
}

export async function sendQuoteNotification(doc: QuoteDoc) {
  const itemsList = doc.items?.map((item) => {
    const productName = typeof item.product === 'object' ? item.product.name : item.product
    return `<li>${productName}${item.quantity ? ` — Qty: ${item.quantity}` : ''}</li>`
  }).join('') || '<li>No items specified</li>'

  const html = `
    <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #023E8A; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">🔔 New Quote Request — ${doc.referenceNumber}</h2>
      </div>
      <div style="background: #F4F8FB; padding: 24px; border: 1px solid #DCE6ED; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Buyer:</td><td style="padding: 8px 0;">${doc.buyerName}</td></tr>
          ${doc.company ? `<tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Company:</td><td style="padding: 8px 0;">${doc.company}</td></tr>` : ''}
          <tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${doc.phone}">${doc.phone}</a></td></tr>
          ${doc.email ? `<tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${doc.email}">${doc.email}</a></td></tr>` : ''}
          ${doc.city ? `<tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">City:</td><td style="padding: 8px 0;">${doc.city}</td></tr>` : ''}
        </table>
        <h3 style="margin: 16px 0 8px; font-size: 16px; color: #051423;">Requested Products:</h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 14px;">${itemsList}</ul>
        ${doc.message ? `<h3 style="margin: 16px 0 8px; font-size: 16px; color: #051423;">Message:</h3><p style="margin: 0; font-size: 14px; color: #3A4A57;">${doc.message}</p>` : ''}
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #DCE6ED;">
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/quotes" style="display: inline-block; background: #0077B6; color: white; padding: 10px 24px; border-radius: 4px; text-decoration: none; font-weight: 500;">View in Admin Panel →</a>
        </div>
      </div>
    </div>
  `

  await sendEmail(`New Quote Request: ${doc.referenceNumber} from ${doc.buyerName}`, html)
}

export async function sendEnquiryNotification(doc: EnquiryDoc) {
  const html = `
    <div style="font-family: 'IBM Plex Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #023E8A; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h2 style="margin: 0; font-size: 20px;">📩 New Enquiry — ${doc.referenceNumber}</h2>
      </div>
      <div style="background: #F4F8FB; padding: 24px; border: 1px solid #DCE6ED; border-top: none; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Name:</td><td style="padding: 8px 0;">${doc.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${doc.phone}">${doc.phone}</a></td></tr>
          ${doc.email ? `<tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${doc.email}">${doc.email}</a></td></tr>` : ''}
          ${doc.company ? `<tr><td style="padding: 8px 0; color: #3A4A57; font-weight: 500;">Company:</td><td style="padding: 8px 0;">${doc.company}</td></tr>` : ''}
        </table>
        <h3 style="margin: 16px 0 8px; font-size: 16px; color: #051423;">Message:</h3>
        <p style="margin: 0; font-size: 14px; color: #3A4A57;">${doc.message}</p>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #DCE6ED;">
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/enquiries" style="display: inline-block; background: #0077B6; color: white; padding: 10px 24px; border-radius: 4px; text-decoration: none; font-weight: 500;">View in Admin Panel →</a>
        </div>
      </div>
    </div>
  `

  await sendEmail(`New Enquiry: ${doc.referenceNumber} from ${doc.name}`, html)
}
