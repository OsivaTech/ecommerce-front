'use client'

import { ColumnDef, CellContext } from '@tanstack/react-table'
import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { NameCell } from './cells/nameCell'
import { DimensionsCell } from './cells/dimensionsCell'
import { WeightCell } from './cells/weightCell'
import { ActionCell } from './cells/actionCell'
import { PreviewCell } from './cells/previewCell'
import { MaterialTypeCell } from './cells/materialTypeCell'

export const columns: ColumnDef<PackageResponse>[] = [
  {
    id: 'preview',
    header: 'Visualização',
    cell: (props: CellContext<PackageResponse, unknown>) => {
      const meta = props.table.options.meta as { maxDimensionGlobal?: number }
      const maxDimensionGlobal = meta?.maxDimensionGlobal || 1
      return (
        <PreviewCell
          package={props.row.original}
          maxDimensionGlobal={maxDimensionGlobal}
        />
      )
    },
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }: CellContext<PackageResponse, unknown>) => (
      <NameCell package={row.original} />
    ),
  },
  {
    accessorKey: 'dimensions',
    header: 'Dimensões (cm)',
    cell: ({ row }: CellContext<PackageResponse, unknown>) => (
      <DimensionsCell package={row.original} />
    ),
  },
  {
    accessorKey: 'materialType',
    header: 'Tipo de Material',
    cell: ({ row }: CellContext<PackageResponse, unknown>) => (
      <MaterialTypeCell materialType={row.original.materialType} />
    ),
  },
  {
    accessorKey: 'maxWeight',
    header: 'Peso Máximo (kg)',
    cell: ({ row }: CellContext<PackageResponse, unknown>) => (
      <WeightCell package={row.original} />
    ),
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }: CellContext<PackageResponse, unknown>) => (
      <ActionCell package={row.original} />
    ),
  },
]
