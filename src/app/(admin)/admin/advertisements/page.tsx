import { AdvertisementTable } from '@/app/(admin)/admin/advertisements/components/AdvertisementTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Suspense } from 'react'
import { AdvertisementPageClient } from './AdvertisementPageClient'

export default function AdvertisementPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle
          title="Anúncios"
          description="Gerenciamento de anúncios do site"
        />
        <AdvertisementPageClient />
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <AdvertisementTable />
      </Suspense>
    </div>
  )
}
