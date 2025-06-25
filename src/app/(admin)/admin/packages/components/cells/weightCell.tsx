import { PackageResponse } from '@/types/api/Response/PackageResponse'

interface WeightCellProps {
  package: PackageResponse
}

export function WeightCell({ package: packageData }: WeightCellProps) {
  return (
    <div className="text-sm text-muted-foreground">
      {packageData.maxWeight} kg
    </div>
  )
}
