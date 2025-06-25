import { PackageMaterialType } from '@/types/api/Types/PackageMaterialType'
import { Badge } from '@/components/ui/badge'

interface MaterialTypeCellProps {
  materialType: PackageMaterialType
}

const materialTypeLabels: Record<PackageMaterialType, string> = {
  None: 'Nenhum',
  Styrofoam: 'Isopor',
  Cardboard: 'Papelão',
}

const materialTypeColors: Record<PackageMaterialType, string> = {
  None: 'bg-gray-100 text-gray-800',
  Styrofoam: 'bg-blue-100 text-blue-800',
  Cardboard: 'bg-amber-100 text-amber-800',
}

export function MaterialTypeCell({ materialType }: MaterialTypeCellProps) {
  return (
    <Badge className={materialTypeColors[materialType]}>
      {materialTypeLabels[materialType]}
    </Badge>
  )
}
