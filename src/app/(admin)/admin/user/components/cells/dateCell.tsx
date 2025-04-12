import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'
import { format } from 'date-fns'

export const DateCell = ({ row }: { row: Row<User> }) => {
  const createdAt = new Date(row.original.createdAt)
  return <div>{format(createdAt, 'dd/MM')}</div>
}
