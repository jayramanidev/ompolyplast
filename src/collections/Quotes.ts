import type { CollectionConfig } from 'payload'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  admin: {
    useAsTitle: 'referenceNumber',
    defaultColumns: ['referenceNumber', 'status', 'buyerName', 'company', 'createdAt'],
    group: 'Sales Pipeline',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true, // Public form submissions
  },
  fields: [
    {
      name: 'referenceNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true, description: 'Auto-generated: OMP-Q-YYYY-NNNN' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Won', value: 'won' },
        { label: 'Lost', value: 'lost' },
      ],
      admin: { description: 'Quote workflow: New → Contacted → Quoted → Won/Lost' },
    },
    {
      name: 'buyerName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Requested Products',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'text',
          admin: { description: 'Free text — buyers often give ranges ("~2 tons/month")' },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: { description: 'Sales staff member handling this quote' },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: { description: 'Internal notes — not visible to the buyer' },
    },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'e.g., "product-page", "whatsapp-fab" — for GA4 cross-check' },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data?.referenceNumber) {
          const year = new Date().getFullYear()
          const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')
          data!.referenceNumber = `OMP-Q-${year}-${seq}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          // Send email notification via Resend
          try {
            const { sendQuoteNotification } = await import('../lib/notifications/email')
            await sendQuoteNotification(doc)
          } catch (err) {
            console.error('[Notification] Failed to send quote notification:', err)
          }
        }
      },
    ],
  },
}
