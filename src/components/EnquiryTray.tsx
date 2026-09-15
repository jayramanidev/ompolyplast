'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useEnquiryTray, type TrayItem } from './EnquiryTrayContext'

/**
 * Enquiry Tray (Quote Basket) — design.md §4
 * Persistent slide-out drawer for multi-product RFQs
 */

export default function EnquiryTray() {
  const { items, removeItem, updateQuantity, clearTray, itemCount, isOpen, setIsOpen } = useEnquiryTray()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const [formData, setFormData] = useState({
    buyerName: '', company: '', phone: '', email: '', city: '', message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (itemCount === 0 && !isOpen) return null

  const validate = () => {
    const e: Record<string, string> = {}
    if (!formData.buyerName.trim()) e.buyerName = 'Name is required'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          source: 'enquiry-tray',
        }),
      })
      const data = await res.json()
      if (data.referenceNumber) {
        setRefNumber(data.referenceNumber)
        setSubmitted(true)
        clearTray()
      }
    } catch (err) {
      console.error('Failed to submit RFQ:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Tray toggle badge */}
      {!isOpen && itemCount > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-24 z-50 flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 font-semibold text-base-white shadow-modal transition-transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          Enquiry ({itemCount})
        </button>
      )}

      {/* Tray drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-ink-900/40" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-base-white shadow-modal" style={{ transition: 'var(--transition-drawer)' }}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
              <h2 className="text-lg font-semibold text-ink-900">
                {submitted ? 'Quote Submitted!' : `Enquiry Tray (${itemCount})`}
              </h2>
              <button onClick={() => { setIsOpen(false); setSubmitted(false); }} className="text-ink-600 hover:text-ink-900" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-ink-900">Quote Request Received!</h3>
                  <p className="mb-2 font-mono text-lg text-brand-primary">{refNumber}</p>
                  <p className="text-sm text-ink-600">We typically respond within 24 business hours via call or WhatsApp.</p>
                  <button
                    onClick={() => { setIsOpen(false); setSubmitted(false); }}
                    className="mt-6 rounded-sm bg-brand-primary px-6 py-2.5 font-medium text-base-white hover:bg-brand-mid"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <>
                  {/* Items list */}
                  {items.map((item) => (
                    <div key={item.productId} className="mb-3 flex items-start gap-3 rounded-md border border-border-subtle p-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-base-mist">
                        {item.thumbnail ? (
                          <Image src={item.thumbnail} alt={item.productName} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xl">📦</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-ink-900">{item.productName}</div>
                        <input
                          type="text"
                          placeholder="Quantity (e.g., 500 rolls)"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.productId, e.target.value)}
                          className="mt-1 w-full rounded-sm border border-border-subtle bg-base-mist px-2 py-1 text-sm"
                        />
                      </div>
                      <button onClick={() => removeItem(item.productId)} className="text-ink-600 hover:text-error" aria-label="Remove">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </button>
                    </div>
                  ))}

                  {itemCount > 0 && (
                    <button onClick={clearTray} className="mb-6 text-sm text-ink-600 hover:text-error">
                      Clear all items
                    </button>
                  )}

                  {/* RFQ Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-base font-semibold text-ink-900">Your Details</h3>
                    
                    {/* Honeypot */}
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                    <div>
                      <label htmlFor="tray-name" className="mb-1 block text-sm font-medium text-ink-900">Name *</label>
                      <input id="tray-name" type="text" value={formData.buyerName} onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                      {errors.buyerName && <p className="mt-1 text-xs text-error">{errors.buyerName}</p>}
                    </div>

                    <div>
                      <label htmlFor="tray-company" className="mb-1 block text-sm font-medium text-ink-900">Company</label>
                      <input id="tray-company" type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>

                    <div>
                      <label htmlFor="tray-phone" className="mb-1 block text-sm font-medium text-ink-900">Phone *</label>
                      <input id="tray-phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                      {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="tray-email" className="mb-1 block text-sm font-medium text-ink-900">Email</label>
                      <input id="tray-email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                      {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="tray-city" className="mb-1 block text-sm font-medium text-ink-900">City</label>
                      <input id="tray-city" type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>

                    <div>
                      <label htmlFor="tray-message" className="mb-1 block text-sm font-medium text-ink-900">Message</label>
                      <textarea id="tray-message" rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-sm border border-border-subtle bg-base-mist px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || itemCount === 0}
                      className="w-full rounded-sm bg-brand-primary py-3 font-semibold text-base-white transition-colors hover:bg-brand-mid disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : `Submit Quote Request (${itemCount} items)`}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
