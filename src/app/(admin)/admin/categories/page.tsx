import { CategoryTable } from '@/app/(admin)/admin/categories/components/CategoryTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Suspense } from 'react'
import { CategoryPageClient } from './CategoryPageClient'

export default function CategoryPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminTitle
          title="Categorias"
          description="Gerenciamento de categorias de produtos"
        />
        <CategoryPageClient />
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <CategoryTable />
      </Suspense>
    </div>
  )
}
