import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@/types/api/Types/OrderStatus'
import { ProductStatus } from '@/types/api/Types/ProductStatus'
import { RegistrationStatus } from '@/types/api/Types/RegistrationStatus'
import { TransactionStatus } from '@/types/api/Types/TransactionStatus'
import { UserStatus } from '@/types/api/Types/UserStatus'

export type StatusBadgeProps = {
  status:
    | UserStatus
    | RegistrationStatus
    | OrderStatus
    | ProductStatus
    | TransactionStatus
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
        'cursor-pointer text-title w-32 text-center',
        status === 'None' && 'bg-[#B0BEC5]',
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
        status === 'Declined' && 'bg-[#FF0000]',
        status === 'Refunded' && 'bg-[#42A5F5]',
      )}
      variant={variant}
    >
      {label}
    </Badge>
  )
}
