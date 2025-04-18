import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  status: 'pending' | 'approved' | 'rejected'
  variant?: 'default' | 'destructive'
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
        'cursor-pointer text-title',
        status === 'pending' && 'bg-[#FFE60A]',
        status === 'approved' && 'bg-[#39D233]',
        status === 'rejected' && 'bg-[#FF0000]',
      )}
      variant={variant}
    >
      {label}
    </Badge>
  )
}
