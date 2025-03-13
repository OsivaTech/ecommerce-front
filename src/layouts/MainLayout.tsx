import Header from '@/components/header/Header'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <footer
        style={{ background: '#eee', padding: '10px', marginTop: '20px' }}
      >
        <p>© 2025 Meu Site</p>
      </footer>
    </div>
  )
}
