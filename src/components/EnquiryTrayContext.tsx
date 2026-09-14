'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

/**
 * Enquiry Tray (Quote Basket) — design.md §4, PRD user flow §5
 * Persistent multi-product RFQ tray using React Context + localStorage
 */

export interface TrayItem {
  productId: string
  productName: string
  productSlug: string
  categorySlug: string
  quantity: string
  thumbnail?: string
}

interface EnquiryTrayContextType {
  items: TrayItem[]
  addItem: (item: Omit<TrayItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: string) => void
  clearTray: () => void
  isInTray: (productId: string) => boolean
  itemCount: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const EnquiryTrayContext = createContext<EnquiryTrayContextType | null>(null)

const STORAGE_KEY = 'om-polyplast-enquiry-tray'

export function EnquiryTrayProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TrayItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addItem = useCallback((item: Omit<TrayItem, 'quantity'>) => {
    setItems((prev) => {
      if (prev.find((i) => i.productId === item.productId)) return prev
      return [...prev, { ...item, quantity: '' }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: string) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }, [])

  const clearTray = useCallback(() => {
    setItems([])
    setIsOpen(false)
  }, [])

  const isInTray = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  )

  return (
    <EnquiryTrayContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearTray,
        isInTray,
        itemCount: items.length,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </EnquiryTrayContext.Provider>
  )
}

export function useEnquiryTray() {
  const context = useContext(EnquiryTrayContext)
  if (!context) {
    throw new Error('useEnquiryTray must be used within an EnquiryTrayProvider')
  }
  return context
}
