import { columns } from '@/app/(admin)/admin/user/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { UserHttp } from '@/http/User'

export const UserTable = async () => {
  const users = await UserHttp.getAllUsers()

  if (users.hasError) {
    return <div>Error</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={users.data} />
    </div>
  )
}
