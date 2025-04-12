'use client'
import { ColumnDef } from '@tanstack/react-table'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
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
