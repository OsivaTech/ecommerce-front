import { StatusBadge } from '@/components/StatusBadge'
import { User } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const StatusCell = ({ row }: { row: Row<User> }) => {
  const labelStatus = {
    None: 'Desconhecido',
    Active: 'Ativo',
    Inactive: 'Inativo',
    Blocked: 'Bloqueado',
    Deleted: 'Deletado',
  }

  return (
    <StatusBadge
      status={row.original.status}
      label={labelStatus[row.original.status]}
      variant="default"
    />
  )
}
