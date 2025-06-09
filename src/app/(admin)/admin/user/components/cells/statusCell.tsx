import { StatusBadge } from '@/components/StatusBadge'
import { userStatus } from '@/constants/utils'
import { User, UserStatus } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const StatusCell = ({ row }: { row: Row<User> }) => {
  const mappedStatus: Record<
    UserStatus,
    'None' | 'Active' | 'Inactive' | 'Blocked' | 'Deleted'
  > = {
    None: 'None',
    Active: 'Active',
    Inactive: 'Inactive',
    Blocked: 'Blocked',
    Deleted: 'Deleted',
  }

  return (
    <StatusBadge
      status={mappedStatus[row.original.status]}
      label={userStatus[row.original.status as keyof typeof userStatus]}
      variant="default"
    />
  )
}
