'use client'
import { ReactNode } from 'react'

import Header from '@/components/header/Header'

interface LayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </>
  )
}
