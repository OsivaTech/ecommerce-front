import type { Metadata } from 'next'

import MainLayout from '@/layouts/MainLayout'

import { Work_Sans as workSans } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/providers/Toast/ToastProvider'
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
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
