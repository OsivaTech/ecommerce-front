import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'

export const ItemsCell = ({ row }: { row: Row<Order> }) => {
  return <div>{row.original.items?.length}</div>
}
