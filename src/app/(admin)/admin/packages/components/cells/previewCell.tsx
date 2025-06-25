import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { PackagePreview } from '@/components/PackagePreview'

interface PreviewCellProps {
  package: PackageResponse
  maxDimensionGlobal: number
}

export function PreviewCell({
  package: packageData,
  maxDimensionGlobal,
}: PreviewCellProps) {
  return (
    <div className="flex py-2">
      <PackagePreview
        width={packageData.width}
        height={packageData.height}
        length={packageData.length}
        maxDimensionGlobal={maxDimensionGlobal}
        materialType={packageData.materialType}
      />
    </div>
  )
}
