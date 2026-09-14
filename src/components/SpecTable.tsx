import React from 'react'

/**
 * Spec Table — design.md §4
 * Mono numerals, zebra striping, responsive
 */

interface SpecTableProps {
  specs: Array<{ label: string; value: string }>
}

export default function SpecTable({ specs }: SpecTableProps) {
  if (!specs || specs.length === 0) return null

  return (
    <div className="overflow-x-auto rounded-md border border-border-subtle">
      <table className="spec-table w-full text-sm">
        <thead>
          <tr className="bg-brand-deep text-base-white">
            <th className="px-4 py-3 text-left font-semibold">Specification</th>
            <th className="px-4 py-3 text-left font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec, i) => (
            <tr key={i} className="border-t border-border-subtle">
              <td className="px-4 py-2.5 font-medium text-ink-600">{spec.label}</td>
              <td className="px-4 py-2.5 font-mono text-ink-900">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
