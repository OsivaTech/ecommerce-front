import { Card } from '@/components/ui/card'
import { DashboardCardProps } from './type'
import { formatPrice } from '@/utils/mask'

export const DashboardCard = ({
  title,
  value,
  isCurrency = false,
}: DashboardCardProps) => {
  return (
    <Card className="w-[281px] h-[112px] p-6 gap-2">
      <h1 className="text-sm font-medium ">{title}</h1>
      <p className="text-2xl font-bold leading-none">
        {isCurrency ? formatPrice(value) : value}
      </p>
    </Card>
  )
}
