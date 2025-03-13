import AdminLayout from '@/layouts/AdminLayout'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AdminLayout>{children}</AdminLayout>
      </body>
    </html>
  )
}
