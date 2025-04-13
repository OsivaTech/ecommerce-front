import '../globals.css'
import { AdminSideMenu } from '@/components/AdminSideMenu'
import Header from '@/client/home/header/Header'
import { ToastProvider } from '@/providers/Toast/ToastProvider'
export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="h-[calc(100vh - 72px)] ">
        <ToastProvider />
        <Header />
        <div className="h-full py-5 px-6 flex">
          <AdminSideMenu />
          <div className="w-full px-6">{children}</div>
        </div>
      </body>
    </html>
  )
}
