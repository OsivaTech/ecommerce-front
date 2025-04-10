import type { Metadata } from 'next'

import { Work_Sans as workSans } from 'next/font/google'
import '../globals.css'
import { ToastProvider } from '@/providers/Toast/ToastProvider'
import Header from '@/client/home/header/Header'
import { AuthProvider } from '@/providers/Auth/AuthContext'

const workSansInstance = workSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: 'Ls Injectable',
  description: 'E-commerce de produtos para cabelo e pele',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={workSansInstance.variable}>
      <body cz-shortcut-listen="true">
        <ToastProvider />
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gray-100 w-full">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer
              style={{ background: '#eee', padding: '10px', marginTop: '20px' }}
            >
              <p>© 2025 Meu Site</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
