import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type StatusBadgeProps = {
  status:
    | 'None'
    | 'Active'
    | 'Inactive'
    | 'Blocked'
    | 'Deleted'
    | 'Enabled'
    | 'OutOfStock'
    | 'Disabled'
    | 'Pending'
    | 'Processing'
    | 'WaitingShipment'
    | 'Approved'
    | 'Shipped'
    | 'Completed'
    | 'Canceled'
    | 'Rejected'
  variant?: 'default' | 'secondary' | 'outline'
  label: string
}

export const StatusBadge = ({
  status,
  variant = 'default',
  label,
}: StatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        'cursor-pointer text-title w-28 text-center',
        status === 'None' && 'bg-[#B0BEC5]',
        status === 'Active' && 'bg-[#39D233]',
        status === 'Inactive' && 'bg-[#B0BEC5]',
        status === 'Blocked' && 'bg-[#FF0000]',
        status === 'Deleted' && 'bg-[#FF0000]',
        status === 'Disabled' && 'bg-[#B0BEC5]',
        status === 'Pending' && 'bg-[#FFA726]',
        status === 'Processing' && 'bg-[#FFEB3B]',
        status === 'WaitingShipment' && 'bg-[#b3ff26]',
        status === 'Approved' && 'bg-[#39D233]',
        status === 'Shipped' && 'bg-[#39D233]',
        status === 'Enabled' && 'bg-[#39D233]',
        status === 'Completed' && 'bg-[#42A5F5]',
        status === 'Canceled' && 'bg-[#FF0000]',
        status === 'Rejected' && 'bg-[#FF0000]',
        status === 'OutOfStock' && 'bg-[#FF0000]',
      )}
      variant={variant}
    >
      {label}
    </Badge>
  )
}
