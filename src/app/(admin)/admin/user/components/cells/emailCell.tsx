import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const EmailCell = ({ row }: { row: Row<User> }) => {
  return <div>{row.original.email}</div>
}
