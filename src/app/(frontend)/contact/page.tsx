'use client'

import React, { useState } from 'react'

/**
 * Contact Page — design.md §5.6
 * Enquiry form + phone/WhatsApp + Google Map + business hours
 */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', company: '', message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    if (!formData.message.trim()) e.message = 'Message is required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.referenceNumber) {
        setRefNumber(data.referenceNumber)
        setSubmitted(true)
      }
    } catch (err) {
      console.error('Failed to submit enquiry:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <h1 className="mb-4">Contact OM Polyplast</h1>
      <p className="mb-12 max-w-2xl text-lg text-ink-600">
        Get in touch for bulk packaging orders, custom requirements, or general enquiries. We typically respond within 24 business hours via call or WhatsApp.
      </p>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="rounded-md border border-success/20 bg-success/5 p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-ink-900">Enquiry Submitted!</h2>
              <p className="mb-2 font-mono text-lg text-brand-primary">{refNumber}</p>
              <p className="text-sm text-ink-600">We'll get back to you within 24 business hours via call or WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink-900">Name *</label>
                <input id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="Your full name" />
                {errors.name && <p className="mt-1 flex items-center gap-1 text-xs text-error"><span>⚠</span>{errors.name}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-ink-900">Phone *</label>
                  <input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="+91-XXXXXXXXXX" />
                  {errors.phone && <p className="mt-1 flex items-center gap-1 text-xs text-error"><span>⚠</span>{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink-900">Email</label>
                  <input id="contact-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="you@company.com" />
                  {errors.email && <p className="mt-1 flex items-center gap-1 text-xs text-error"><span>⚠</span>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-ink-900">Company</label>
                <input id="contact-company" type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="Company name" />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink-900">Message *</label>
                <textarea id="contact-message" rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="Tell us about your packaging needs, quantities, or any questions..." />
                {errors.message && <p className="mt-1 flex items-center gap-1 text-xs text-error"><span>⚠</span>{errors.message}</p>}
              </div>

              <button type="submit" disabled={submitting} className="w-full rounded-sm bg-brand-primary py-3.5 font-semibold text-base-white transition-colors hover:bg-brand-mid disabled:cursor-not-allowed disabled:opacity-50">
                {submitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-8">
          <div className="rounded-md border border-border-subtle bg-base-white p-6 shadow-card">
            <h3 className="mb-4 text-lg font-semibold text-ink-900">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-brand-sky text-brand-deep">📞</div>
                <div>
                  <div className="font-medium text-ink-900">Phone</div>
                  <a href="tel:+91-9876543210" className="text-brand-primary hover:text-brand-mid">+91-9876543210</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-[#25D366]/10 text-[#25D366]">💬</div>
                <div>
                  <div className="font-medium text-ink-900">WhatsApp</div>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-mid">Chat with us →</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-brand-sky text-brand-deep">✉️</div>
                <div>
                  <div className="font-medium text-ink-900">Email</div>
                  <a href="mailto:info@ompolyplast.com" className="text-brand-primary hover:text-brand-mid">info@ompolyplast.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-brand-sky text-brand-deep">📍</div>
                <div>
                  <div className="font-medium text-ink-900">Address</div>
                  <p className="text-ink-600">Industrial Area, Rajkot,<br />Gujarat — 360001</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-md border border-border-subtle bg-base-white p-6 shadow-card">
            <h3 className="mb-3 text-lg font-semibold text-ink-900">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-ink-600">Monday – Friday</span><span className="font-medium">9:00 AM – 6:00 PM</span></li>
              <li className="flex justify-between"><span className="text-ink-600">Saturday</span><span className="font-medium">9:00 AM – 2:00 PM</span></li>
              <li className="flex justify-between"><span className="text-ink-600">Sunday</span><span className="font-medium text-error">Closed</span></li>
            </ul>
          </div>

          <div className="rounded-md border border-border-subtle bg-base-white p-6 shadow-card">
            <h3 className="mb-3 text-lg font-semibold text-ink-900">Registration</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-ink-600">GST</span><span className="font-mono text-ink-900">24XXXXX0000X1ZX</span></li>
              <li className="flex justify-between"><span className="text-ink-600">Udyam/MSME</span><span className="font-mono text-ink-900">UDYAM-XX-XX-XXXXXXX</span></li>
            </ul>
          </div>

          {/* Map */}
          <div className="h-64 overflow-hidden rounded-md border border-border-subtle">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118149.68121002128!2d70.73812!3d22.30396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3a!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="OM Polyplast — Rajkot, Gujarat"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
