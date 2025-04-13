'use client'

import { Product } from '@/types/api/Response/ProductResponse'
import { ColumnDef } from '@tanstack/react-table'
import { ProductCell } from './cells/productCell'
import { QuantityCell } from '@/app/(admin)/admin/stock/components/cells/quantityCell'
import { CategoryCell } from '@/app/(admin)/admin/stock/components/cells/categoryCell'
import { PriceCell } from '@/app/(admin)/admin/stock/components/cells/priceCell'
import { StatusCell } from '@/app/(admin)/admin/stock/components/cells/statusCell'
import { ActionsCell } from '@/app/(admin)/admin/stock/components/cells/actionCell'

export const columns: ColumnDef<Product>[] = [
  {
    header: 'Produto',
    accessorKey: 'name',
    cell: ProductCell,
  },
  {
    header: 'Quantidade',
    accessorKey: 'quantity',
    cell: QuantityCell,
  },
  {
    header: 'Categoria',
    accessorKey: 'category',
    cell: CategoryCell,
  },
  {
    header: 'Preço',
    accessorKey: 'price',
    cell: PriceCell,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: StatusCell,
  },
  {
    header: 'Ações',
    accessorKey: 'actions',
    cell: ActionsCell,
  },
]
