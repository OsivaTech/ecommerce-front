import { StockTable } from '@/app/(admin)/admin/stock/components/StockTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Suspense } from 'react'
import { StockPageClient } from './StockPageClient'

export default function StockPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle title="Estoque" description="Análise de estoque" />
        <StockPageClient />
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <StockTable />
      </Suspense>
    </div>
  )
}
