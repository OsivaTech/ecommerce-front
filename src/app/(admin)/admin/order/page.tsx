import { AdminTitle } from '@/components/AdminTitle'
import { OrderTable } from '@/app/(admin)/admin/order/components/OrderTable'
import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'

export default async function Order() {
  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Pedidos"
        description="Pedidos realizados e seus status"
      />
      <Suspense fallback={<DataTableSkeleton />}>
        <OrderTable />
      </Suspense>
    </div>
  )
}
