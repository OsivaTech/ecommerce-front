import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'
import { format } from 'date-fns'

export const DateCell = ({ row }: { row: Row<User> }) => {
  const createdAt = new Date()
  return <div>{format(new Date(createdAt || ''), 'dd/MM')}</div>
}
