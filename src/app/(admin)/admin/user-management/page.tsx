import { AdminTitle } from '@/components/AdminTitle'
import { Suspense } from 'react'
import { UserManagementTable } from '@/app/(admin)/admin/user-management/components/UserManagementTable'
import { DataTableSkeleton } from '@/components/DataTableSkeleton'

export default async function UserManagement() {
  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Gestão de Cadastros"
        description="Análise de Perfil e Validações de Usuários"
      />
      <Suspense fallback={<DataTableSkeleton />}>
        <UserManagementTable />
      </Suspense>
    </div>
  )
}
