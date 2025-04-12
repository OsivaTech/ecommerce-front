import { columns } from '@/app/(admin)/admin/user-management/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { RegistrationHttp } from '@/http/Registration'

export const UserManagementTable = async () => {
  const pendingRegistrations = await RegistrationHttp.getPendingRegistrations()

  if ('message' in pendingRegistrations) {
    return null
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={pendingRegistrations} />
    </div>
  )
}
