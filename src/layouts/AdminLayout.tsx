import { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <nav
        style={{
          width: '250px',
          background: '#222',
          color: '#fff',
          padding: '20px',
        }}
      >
        <h2>Painel Admin</h2>

        <ul>
          <li>
            <Link href="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/usuarios">Usuários</Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '20px' }}>{children}</main>
    </div>
  )
}
