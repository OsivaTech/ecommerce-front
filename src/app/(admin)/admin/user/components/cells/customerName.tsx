import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const CustomerNameCell = ({ row }: { row: Row<User> }) => {
  return <div>{row.original.name}</div>
}
