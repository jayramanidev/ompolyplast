import { getPayload } from 'payload'
import configPromise from './src/payload.config'

async function seed() {
  console.log('Initializing Payload...')
  const payload = await getPayload({ config: configPromise })

  console.log('Seeding categories...')
  const cats = [
    {
      name: 'BOPP Tapes',
      slug: 'bopp-tapes',
      shortDescription: 'Black, Transparent, Milky White, Brown, and Blue BOPP packaging tapes.',
      order: 1,
    },
    {
      name: 'Masking Tapes',
      slug: 'masking-tapes',
      shortDescription: 'High-quality paper masking tapes for painting and industrial applications.',
      order: 2,
    },
    {
      name: 'Shrink & Stretch Films',
      slug: 'shrink-stretch-films',
      shortDescription: 'Polyolefin, LDPE, PVC, and PE stretch and shrink films.',
      order: 3,
    },
    {
      name: 'Box Strapping Rolls',
      slug: 'box-strapping-rolls',
      shortDescription: 'Durable PP box strapping rolls for secure carton packaging.',
      order: 4,
    },
    {
      name: 'Shrink Bags',
      slug: 'shrink-bags',
      shortDescription: 'POF shrink bags for custom product packaging.',
      order: 5,
    },
  ]

  const createdCats = []
  for (const cat of cats) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
    })
    if (existing.docs.length === 0) {
      const doc = await payload.create({ collection: 'categories', data: cat })
      createdCats.push(doc)
      console.log(`Created category: ${doc.name}`)
    } else {
      createdCats.push(existing.docs[0])
      console.log(`Category exists: ${cat.name}`)
    }
  }

  console.log('Seeding products...')
  const products = [
    {
      name: 'Transparent BOPP Packaging Tape',
      slug: 'transparent-bopp-tape',
      category: createdCats.find(c => c.slug === 'bopp-tapes')?.id,
      shortDescription: 'Standard transparent BOPP tape for carton sealing and general packaging. High tensile strength and excellent adhesion.',
      inStock: true,
      featured: true,
      sku: 'BOPP-CLR-48',
      moq: '1 Box',
      specs: [
        { label: 'Price', value: '₹ 1,450 / Box' },
        { label: 'Width', value: '48mm (2 inch)' },
        { label: 'Color', value: 'Transparent' },
      ],
    },
    {
      name: 'Black BOPP Tape',
      slug: 'black-bopp-tape',
      category: createdCats.find(c => c.slug === 'bopp-tapes')?.id,
      shortDescription: 'Black BOPP tape for secure packaging and marking.',
      inStock: true,
      featured: true,
      sku: 'BOPP-BLK-48',
      moq: '1 Box',
      specs: [
        { label: 'Price', value: '₹ 1,560 / Box' },
        { label: 'Width', value: '48mm (2 inch)' },
        { label: 'Color', value: 'Black' },
      ],
    },
    {
      name: 'Milky White BOPP Tape',
      slug: 'milky-white-bopp-tape',
      category: createdCats.find(c => c.slug === 'bopp-tapes')?.id,
      shortDescription: 'Milky White BOPP tape.',
      inStock: true,
      featured: false,
      sku: 'BOPP-WHT-48',
      moq: '1 Box',
      specs: [
        { label: 'Price', value: '₹ 1,600 / Box' },
        { label: 'Color', value: 'Milky White' },
      ],
    },
    {
      name: 'Paper Masking Tape',
      slug: 'paper-masking-tape',
      category: createdCats.find(c => c.slug === 'masking-tapes')?.id,
      shortDescription: 'High-quality paper masking tape.',
      inStock: true,
      featured: true,
      sku: 'MASK-PPR',
      moq: '1 Roll',
      specs: [
        { label: 'Price', value: '₹ 27 / Roll' },
        { label: 'Material', value: 'Paper' },
      ],
    },
    {
      name: 'PVC Stretch Film',
      slug: 'pvc-stretch-film',
      category: createdCats.find(c => c.slug === 'shrink-stretch-films')?.id,
      shortDescription: 'PVC stretch film for pallet wrapping.',
      inStock: true,
      featured: true,
      sku: 'FILM-PVC-STR',
      moq: '1 Kg',
      specs: [
        { label: 'Price', value: '₹ 100 / Kg' },
        { label: 'Material', value: 'PVC' },
      ],
    },
    {
      name: 'PP Box Strapping Roll',
      slug: 'pp-box-strapping-roll',
      category: createdCats.find(c => c.slug === 'box-strapping-rolls')?.id,
      shortDescription: 'PP box strapping rolls for secure bundling.',
      inStock: true,
      featured: true,
      sku: 'STRAP-PP',
      moq: '1 Roll',
      specs: [
        { label: 'Price', value: '₹ 100 / Roll' },
        { label: 'Material', value: 'Polypropylene (PP)' },
      ],
    },
    {
      name: 'POF Shrink Bags',
      slug: 'pof-shrink-bags',
      category: createdCats.find(c => c.slug === 'shrink-bags')?.id,
      shortDescription: 'POF shrink bags for custom product packaging.',
      inStock: true,
      featured: true,
      sku: 'BAG-POF',
      moq: '1 Piece',
      specs: [
        { label: 'Price', value: '₹ 0.40 / Piece' },
        { label: 'Material', value: 'POF' },
      ],
    },
  ]

  for (const prod of products) {
    const existing = await payload.find({
      collection: 'products',
      where: { slug: { equals: prod.slug } },
    })
    if (existing.docs.length === 0 && prod.category) {
      await payload.create({ collection: 'products', data: prod as any })
      console.log(`Created product: ${prod.name}`)
    } else {
      console.log(`Product exists or missing category: ${prod.name}`)
    }
  }

  // Set up Site Settings
  console.log('Setting up Site Settings...')
  const existingSettings = await payload.findGlobal({ slug: 'site-settings' })
  if (!existingSettings || !(existingSettings as any).companyName) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        companyName: 'OM Polyplast',
        contactEmail: 'sales@ompolyplast.com',
        contactPhone: '+91 00000 00000',
        address: 'Rajkot, Gujarat 360004, India',
        gstNumber: '24BIRPV1809G1ZY',
      } as any,
    })
    console.log('Updated site settings with placeholder phone and GST number.')
  }

  // Set up first user
  console.log('Setting up admin user...')
  const users = await payload.find({ collection: 'users' })
  if (users.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@ompolyplast.com',
        password: 'password123',
        name: 'Super Admin',
        role: 'super-admin',
      },
    })
    console.log('Created admin user: admin@ompolyplast.com / password123')
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch(console.error)
