import { UserTable } from '@/app/(admin)/admin/user/components/UserTable'
import { AdminTitle } from '@/components/AdminTitle'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'
import { Suspense } from 'react'

export default async function UserPage() {
  return (
    <div>
      <AdminTitle
        title="Usuários"
        description="Gerencie os usuários do sistema"
      />
      <Suspense fallback={<DataTableSkeleton />}>
        <UserTable />
      </Suspense>
    </div>
  )
}
