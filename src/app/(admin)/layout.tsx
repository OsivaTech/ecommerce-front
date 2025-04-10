import '../globals.css'
import { AdminSideMenu } from '@/components/AdminSideMenu'

export default function RootAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="h-screen">
        <main className="flex h-full">
          <AdminSideMenu />
          {children}
        </main>
      </body>
    </html>
  )
}
