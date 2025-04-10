'use client'
import { Sales } from '@/http/types/Sales'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Sales>[] = [
  {
    header: 'orderId',
    accessorKey: 'Pedido',
    cell: ({ row }) => {
      return <div>{row.original.orderId}</div>
    },
  },
  {
    header: 'date',
    accessorKey: 'Data',
    cell: ({ row }) => {
      return <div>{row.original.date}</div>
    },
  },
  {
    header: 'customerName',
    accessorKey: 'Cliente',
    cell: ({ row }) => {
      return <div>{row.original.customerName}</div>
    },
  },
  {
    header: 'totalItems',
    accessorKey: 'Itens',
    cell: ({ row }) => {
      return <div>{row.original.totalItems}</div>
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
      return <div>{row.original.totalPrice}</div>
    },
  },
]
