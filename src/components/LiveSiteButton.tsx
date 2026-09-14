'use client'

import React from 'react'
import Link from 'next/link'

export const LiveSiteButton: React.FC = () => {
  return (
    <div style={{ padding: '0 20px', marginBottom: '20px' }}>
      <Link 
        href="/"
        target="_blank"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '10px',
          backgroundColor: 'var(--theme-elevation-150)',
          color: 'var(--theme-text)',
          borderRadius: '4px',
          textDecoration: 'none',
          fontWeight: 600,
          border: '1px solid var(--theme-elevation-200)',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-elevation-200)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--theme-elevation-150)'
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View Live Site
      </Link>
    </div>
  )
}
