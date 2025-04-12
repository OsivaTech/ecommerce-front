import { columns } from '@/app/(admin)/admin/user/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { UserHttp } from '@/http/User'

export const UserTable = async () => {
  const users = await UserHttp.getAllUsers()

  console.log('users 123', users)

  if ('code' in users && 'message' in users) {
    return <div>{users.message}</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={users} />
    </div>
  )
}
