import '../globals.css'
import { AdminSideMenu } from '@/components/AdminSideMenu'
import Header from '@/components/Header'
import { ToastProvider } from '@/providers/Toast/ToastProvider'
import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/session'
import { CartProvider } from '@/context/useCart'
import { AuthProvider } from '@/providers/Auth/AuthContext'
import Footer from '@/components/Footer'

export default async function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userIsAuthenticated = await isAuthenticated()

  if (!userIsAuthenticated) {
    redirect('/login')
  }

  return (
    <html lang="pt-BR">
      <body className="h-[calc(100vh - 72px)] ">
        <CartProvider>
          <ToastProvider />
          <AuthProvider userIsAlreadyAuthenticated={await isAuthenticated()}>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex flex-1 py-5 px-6">
                <AdminSideMenu />
                <div className="w-full px-6">{children}</div>
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  )
}
