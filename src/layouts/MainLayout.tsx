'use client'

import Header from '@/client/home/header/Header'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const pathname = usePathname()

  const hiddenRoutes = ['/admin']

  if (hiddenRoutes.includes(pathname)) {
    return <>{children}</>
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">{children}</main>
      <footer
        style={{ background: '#eee', padding: '10px', marginTop: '20px' }}
      >
        <p>© 2025 Meu Site</p>
      </footer>
    </div>
  )
}
