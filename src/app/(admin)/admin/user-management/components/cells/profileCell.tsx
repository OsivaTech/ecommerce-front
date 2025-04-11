import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { Row } from '@tanstack/react-table'

export const ProfileCell = ({ row }: { row: Row<RegistrationPending> }) => {
  return <div>{row.original.professionalDocument?.type}</div>
}
