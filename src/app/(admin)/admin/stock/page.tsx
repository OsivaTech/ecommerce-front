import { StockTable } from '@/app/(admin)/admin/stock/components/StockTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

export default function StockPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle title="Estoque" description="Análise de estoque" />
        <Button className="bg-primary text-white cursor-pointer">
          Adicionar produto
        </Button>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <StockTable />
      </Suspense>
    </div>
  )
}
