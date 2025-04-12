import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'

export const CustomerCell = ({ row }: { row: Row<Order> }) => {
  return <div>{row.original.user.name}</div>
}
