import { AdminTitle } from '@/components/AdminTitle'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/app/(admin)/admin/user-management/components/columns'
import { Suspense } from 'react'
import { RegistrationHttp } from '@/http/Registration'

export default async function UserManagement() {
  const pendingRegistrations = await RegistrationHttp.getPendingRegistrations()
  console.log(pendingRegistrations)
  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Gestão de Cadastros"
        description="Análise de Perfil e Validações de Usuários"
      />
      <div>
        <Suspense key={Math.random()} fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={pendingRegistrations} />
        </Suspense>
      </div>
    </div>
  )
}
