import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const ProfileCell = ({ row }: { row: Row<User> }) => {
  return <div>{row.original.professionalDocument?.type}</div>
}
