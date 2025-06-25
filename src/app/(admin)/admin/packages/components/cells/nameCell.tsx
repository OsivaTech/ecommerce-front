import { PackageResponse } from '@/types/api/Response/PackageResponse'

interface NameCellProps {
  package: PackageResponse
}

export function NameCell({ package: packageData }: NameCellProps) {
  return <div className="font-medium">{packageData.name}</div>
}
