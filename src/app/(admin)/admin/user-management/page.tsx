import { AdminTitle } from '@/components/AdminTitle'
import { getPendingRegistrations } from '@/app/types/Registration'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(admin)/admin/user-management/components/columns'

export default async function UserManagement() {
  const pendingRegistrations = await getPendingRegistrations()

  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Gestão de Usuários"
        description="Análise de Perfil e Validações de Usuários"
      />
      <div>
        <DataTable columns={columns} data={pendingRegistrations} />
      </div>
    </div>
  )
}
