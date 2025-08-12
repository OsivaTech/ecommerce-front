'use client'
import { GetSalesGridResponse } from '@/types/api/Response/ReportResponse'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columns: ColumnDef<GetSalesGridResponse>[] = [
  {
    header: 'orderId',
    accessorKey: 'Pedido',
    cell: ({ row }) => {
      return <div>{row.original.orderNumber}</div>
    },
  },
  {
    header: 'date',
    accessorKey: 'Data',
    cell: ({ row }) => {
      return <div>{format(row.original.date, 'dd/MM/yyyy')}</div>
    },
  },
  {
    header: 'customerName',
    accessorKey: 'Cliente',
    cell: ({ row }) => {
      return <div>{row.original.customer}</div>
    },
  },
  {
    header: 'totalItems',
    accessorKey: 'Itens',
    cell: ({ row }) => {
      return <div>{row.original.itemCount}</div>
    },
  },
  {
    header: 'paymentMethod',
    accessorKey: 'Forma de Pagamento',
    cell: ({ row }) => {
      return <div>{row.original.paymentMethod}</div>
    },
  },
  {
    header: 'totalPrice',
    accessorKey: 'Total',
    cell: ({ row }) => {
      return (
        <div>
          {row.original.totalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
      )
    },
  },
]
