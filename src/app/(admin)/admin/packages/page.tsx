import { PackageTable } from '@/app/(admin)/admin/packages/components/PackageTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Suspense } from 'react'
import { PackagePageClient } from './PackagePageClient'

export default function PackagePage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle
          title="Pacotes"
          description="Gerenciamento de pacotes para envio"
        />
        <PackagePageClient />
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <PackageTable />
      </Suspense>
    </div>
  )
}
