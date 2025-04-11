import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { Row } from '@tanstack/react-table'

export const CustomerNameCell = ({
  row,
}: {
  row: Row<RegistrationPending>
}) => {
  return <div>{row.original.name}</div>
}
