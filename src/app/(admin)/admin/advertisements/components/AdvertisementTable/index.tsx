import { DataTable } from '@/components/ui/data-table'
import { AdvertisementHttp } from '@/http/Advertisement'
import { columns } from '../columns'

export const AdvertisementTable = async () => {
  const advertisements = await AdvertisementHttp.getAllAdvertisements()

  if (advertisements.hasError) {
    return <div>{advertisements.error[0]?.message}</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={advertisements.data} />
    </div>
  )
}
