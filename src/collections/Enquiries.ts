import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'referenceNumber',
    defaultColumns: ['referenceNumber', 'status', 'name', 'createdAt'],
    group: 'Sales Pipeline',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
  },
  fields: [
    {
      name: 'referenceNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: { readOnly: true, description: 'Auto-generated: OMP-E-YYYY-NNNN' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Resolved', value: 'resolved' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
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
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data?.referenceNumber) {
          const year = new Date().getFullYear()
          const seq = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')
          data!.referenceNumber = `OMP-E-${year}-${seq}`
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            const { sendEnquiryNotification } = await import('../lib/notifications/email')
            await sendEnquiryNotification(doc)
          } catch (err) {
            console.error('[Notification] Failed to send enquiry notification:', err)
          }
        }
      },
    ],
  },
}
