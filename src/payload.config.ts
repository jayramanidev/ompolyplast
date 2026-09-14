import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Quotes } from './collections/Quotes'
import { Enquiries } from './collections/Enquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — OM Polyplast Admin',
    },
    components: {
      beforeNavLinks: ['@/components/LiveSiteButton.tsx#LiveSiteButton'],
    },
  },
  collections: [Users, Media, Categories, Products, Quotes, Enquiries],
  globals: [
    {
      slug: 'site-settings',
      label: 'Site Settings',
      access: {
        read: () => true,
        update: ({ req }) => req.user?.role === 'super-admin',
      },
      fields: [
        {
          name: 'responseTimePromise',
          type: 'text',
          defaultValue: 'We typically respond within 24 business hours via call or WhatsApp',
          label: 'Response Time Promise',
          admin: { description: 'Shown on quote confirmation screen' },
        },
        {
          name: 'trustBarStats',
          type: 'group',
          label: 'Trust Bar Statistics (Homepage)',
          fields: [
            { name: 'yearsInBusiness', type: 'text', defaultValue: '10+' },
            { name: 'productsManufactured', type: 'text', defaultValue: '200+' },
            { name: 'clientsServed', type: 'text', defaultValue: '500+' },
            { name: 'dispatchTime', type: 'text', defaultValue: '48 Hours' },
          ],
        },
        {
          name: 'contact',
          type: 'group',
          label: 'Contact Information',
          fields: [
            { name: 'phone', type: 'text', defaultValue: '+91-9876543210' },
            { name: 'whatsapp', type: 'text', defaultValue: '919876543210' },
            { name: 'email', type: 'email', defaultValue: 'info@ompolyplast.com' },
            { name: 'address', type: 'textarea', defaultValue: 'Industrial Area, Rajkot, Gujarat — 360001' },
            { name: 'gst', type: 'text', defaultValue: '24XXXXX0000X1ZX', label: 'GST Number' },
            { name: 'mapEmbedUrl', type: 'text', admin: { description: 'Google Maps embed URL' } },
          ],
        },
        {
          name: 'featuredProductIds',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
          label: 'Featured Products Override',
          admin: { description: 'Override which products appear in the homepage featured section. Leave empty to use the "featured" checkbox on individual products.' },
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./db/payload.db',
    },
  }),
  sharp,
})
