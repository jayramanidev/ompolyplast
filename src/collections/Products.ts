import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'inStock', 'featured'],
    group: 'Catalog',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'sku',
      type: 'text',
      unique: true,
      admin: { description: 'Stock Keeping Unit — unique product code' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: { description: '1–2 sentences, shown on catalog cards' },
    },
    {
      name: 'description',
      type: 'richText',
      admin: { description: 'Longer detail, shown on product detail page' },
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: false,
      minRows: 1,
    },
    {
      name: 'specs',
      type: 'array',
      label: 'Specifications',
      admin: { description: 'Fill every spec that applies — never leave a spec blank (seo-checklist.md §2)' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g., "Thickness", "Width", "Length"' } },
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g., "40 micron", "48mm", "65 meters"' } },
      ],
    },
    {
      name: 'applications',
      type: 'array',
      label: 'Applications / Industries',
      fields: [
        { name: 'industry', type: 'text', admin: { description: 'e.g., "E-commerce shipping", "Agriculture packaging"' } },
      ],
    },
    {
      name: 'moq',
      type: 'text',
      label: 'Minimum Order Quantity',
      admin: { description: 'Free text — e.g., "500 rolls", "1 ton"' },
    },
    {
      name: 'specSheetPdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Spec Sheet PDF',
      admin: { description: 'Downloadable spec sheet for procurement teams (P1 feature)' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on homepage "Featured Products" section' },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      label: 'In Stock',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      admin: { description: 'Product-specific FAQs — feeds FAQ schema markup (P1)' },
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'textarea' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', admin: { description: 'Falls back to "{Product Name} — {Key Spec} | OM Polyplast"' } },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
