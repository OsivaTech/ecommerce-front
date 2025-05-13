import type { Metadata } from 'next'

import { Work_Sans as workSans } from 'next/font/google'
import '../globals.css'
import { ToastProvider } from '@/providers/Toast/ToastProvider'
import Header from '@/components/Header'
import { AuthProvider } from '@/providers/Auth/AuthContext'
import { CartProvider } from '@/context/useCart'
import { isAuthenticated } from '@/lib/session'
import Footer from '@/components/Footer'

const workSansInstance = workSans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-work-sans',
})

export const metadata: Metadata = {
  title: 'Ls Injectable',
  description: 'E-commerce de produtos para cabelo e pele',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={workSansInstance.variable}>
      <body cz-shortcut-listen="true">
        <CartProvider>
          <ToastProvider />
          <AuthProvider userIsAlreadyAuthenticated={await isAuthenticated()}>
            <div className="flex flex-col w-full h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  )
}
