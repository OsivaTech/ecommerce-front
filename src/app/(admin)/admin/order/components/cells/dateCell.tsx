import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export const DateCell = ({ row }: { row: Row<Order> }) => {
  return (
    <div>
      {format(row.original.createdAt, 'dd/MM/yy HH:mm', {
        locale: ptBR,
      })}
    </div>
  )
}
