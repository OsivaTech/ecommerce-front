import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type StatusBadgeProps = {
  status:
    | 'none'
    | 'enabled'
    | 'outOfStock'
    | 'disabled'
    | 'pending'
    | 'processing'
    | 'approved'
    | 'completed'
    | 'canceled'
    | 'rejected'
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
        'cursor-pointer text-title w-24 text-center',
        status === 'none' && 'bg-[#B0BEC5]',
        status === 'disabled' && 'bg-[#B0BEC5]',
        status === 'pending' && 'bg-[#FFEB3B]',
        status === 'processing' && 'bg-[#FFA726]',
        status === 'approved' && 'bg-[#39D233]',
        status === 'enabled' && 'bg-[#39D233]',
        status === 'completed' && 'bg-[#42A5F5]',
        status === 'canceled' && 'bg-[#FF0000]',
        status === 'rejected' && 'bg-[#FF0000]',
        status === 'outOfStock' && 'bg-[#FF0000]',
      )}
      variant={variant}
    >
      {label}
    </Badge>
  )
}
