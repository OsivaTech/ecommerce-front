'use client'

import { ColumnDef } from '@tanstack/react-table'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import { ActionsCell } from './cells/actionCell'

export const columns: ColumnDef<AdvertisementResponse>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const type = row.getValue('type') as string
      const typeLabels = {
        MediaOnly: 'Apenas Mídia',
        MediaAndText: 'Mídia e Texto',
        None: 'Nenhum',
      }
      return <div>{typeLabels[type as keyof typeof typeLabels] || type}</div>
    },
  },
  {
    accessorKey: 'medias',
    header: 'Preview',
    cell: ({ row }) => {
      const medias = row.getValue('medias') as Array<{
        id: number
        title?: string | null
        description?: string | null
        type: string
        size: string
        imageId: number
        urlGoTo: string
        cta?: string | null
        image: {
          id: number
          name: string
          url: string
          size: number
          contentType: string
        }
      }> | null
      const firstMedia = medias?.[0]

      if (!firstMedia?.image?.url) {
        return <div className="text-gray-400">Sem imagem</div>
      }

      return (
        <div
          className="relative w-28 h-12 rounded-md overflow-hidden"
          style={{ aspectRatio: '21/9' }}
        >
          <Image
            src={firstMedia.image.url}
            alt={firstMedia.title || 'Anúncio'}
            fill
            className="object-cover"
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Data Início',
    cell: ({ row }) => {
      const date = row.getValue('startDate') as string
      return <div>{formatDate(date)}</div>
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Data Fim',
    cell: ({ row }) => {
      const date = row.getValue('endDate') as string
      return <div>{date ? formatDate(date) : 'Sem data fim'}</div>
    },
  },
  {
    accessorKey: 'enabled',
    header: 'Status',
    cell: ({ row }) => {
      const enabled = row.getValue('enabled') as boolean
      const endDate = row.getValue('endDate') as string

      // Verifica se está habilitado e se a data de fim não passou
      const isActive = enabled && (!endDate || new Date(endDate) > new Date())

      return (
        <StatusBadge
          status={isActive ? 'Enabled' : 'Disabled'}
          label={isActive ? 'Ativo' : 'Inativo'}
        />
      )
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ActionsCell,
  },
]
