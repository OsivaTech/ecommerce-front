import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { Row } from '@tanstack/react-table'
import { format } from 'date-fns'

export const DateCell = ({ row }: { row: Row<RegistrationPending> }) => {
  return <div>{format(new Date(row.original.date || ''), 'dd/MM')}</div>
}
