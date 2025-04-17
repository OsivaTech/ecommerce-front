import { Row } from '@tanstack/react-table'
import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
export const EmailCell = ({ row }: { row: Row<RegistrationPending> }) => {
  return <div>{row.original.email}</div>
}
