import { PackageResponse } from '@/types/api/Response/PackageResponse'

interface DimensionsCellProps {
  package: PackageResponse
}

export function DimensionsCell({ package: packageData }: DimensionsCellProps) {
  return (
    <div className="flex flex-col text-sm text-muted-foreground">
      <span>Altura: {packageData.height}cm</span>
      <span>Largura: {packageData.width}cm</span>
      <span>Comprimento: {packageData.length}cm</span>
    </div>
  )
}
