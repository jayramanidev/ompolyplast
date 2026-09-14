import React from 'react'

/**
 * Trust Bar — design.md §4, §5.1
 * Years in operation, certifications, response promise
 */

interface TrustBarProps {
  yearsInBusiness?: string
  productsManufactured?: string
  clientsServed?: string
  dispatchTime?: string
}

export default function TrustBar({
  yearsInBusiness = '10+',
  productsManufactured = '200+',
  clientsServed = '500+',
  dispatchTime = '48 Hours',
}: TrustBarProps) {
  const stats = [
    { value: yearsInBusiness, label: 'Years in Business', icon: '🏭' },
    { value: productsManufactured, label: 'Products', icon: '📦' },
    { value: clientsServed, label: 'Clients Served', icon: '🤝' },
    { value: dispatchTime, label: 'Dispatch Time', icon: '🚛' },
  ]

  return (
    <section className="bg-brand-deep py-12">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="mb-2 text-3xl">{stat.icon}</div>
            <div className="text-3xl font-bold text-base-white md:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm font-medium text-brand-sky/80">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
