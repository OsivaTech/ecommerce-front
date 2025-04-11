import { RegistrationPending } from '@/types/api/Response/RegistrationPendingResponse'
import { Row } from '@tanstack/react-table'

export const EmailCell = ({ row }: { row: Row<RegistrationPending> }) => {
  return <div>{row.original.email}</div>
}
