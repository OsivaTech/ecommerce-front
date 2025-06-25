'use client'

import { DataTable } from '@/components/ui/data-table'
import { columns } from '../columns'
import { HttpPackage } from '@/http/Package'
import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'

export function PackageTable() {
  const [packages, setPackages] = useState<PackageResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchPackages = useCallback(async () => {
    try {
      const response = await HttpPackage.getPackages()
      if (response.hasError) {
        toast.error('Erro ao carregar pacotes')
      } else {
        setPackages(Array.isArray(response.data) ? response.data : [])
      }
    } catch (error) {
      toast.error('Erro ao carregar pacotes')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  // Expor a função de recarregamento globalmente para ser usada pelos modais
  if (typeof window !== 'undefined') {
    ;(
      window as Window & { refreshPackages?: () => Promise<void> }
    ).refreshPackages = fetchPackages
  }

  // Calcular a maior dimensão global para todas as pré-visualizações
  const maxDimensionGlobal =
    packages.length > 0
      ? Math.max(...packages.flatMap((p) => [p.width, p.height, p.length]))
      : 1

  if (isLoading) {
    return <div>Carregando...</div>
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={packages}
        meta={{ maxDimensionGlobal }}
      />
    </div>
  )
}
