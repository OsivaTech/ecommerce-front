import { StatusBadge } from '@/components/StatusBadge'
import { userStatus } from '@/constants/utils'
import { User, UserStatus } from '@/types/api/Response/UserResponse'
import { Row } from '@tanstack/react-table'

export const StatusCell = ({ row }: { row: Row<User> }) => {
  const mappedStatus: Record<UserStatus, 'pending' | 'approved' | 'rejected'> =
    {
      None: 'rejected',
      Active: 'approved',
      Inactive: 'pending',
      Blocked: 'rejected',
      Deleted: 'rejected',
    }

  return (
    <StatusBadge
      status={mappedStatus[row.original.status]}
      label={userStatus[row.original.status as keyof typeof userStatus]}
      variant="default"
    />
  )
}
