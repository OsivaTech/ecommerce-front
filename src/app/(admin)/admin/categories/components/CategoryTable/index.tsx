import { DataTable } from '@/components/ui/data-table'
import { CategoryHttp } from '@/http/Category'
import { columns } from '../columns'

export const CategoryTable = async () => {
  const categories = await CategoryHttp.getAllCategories()

  if (categories.hasError) {
    return <div>{categories.error[0]?.message}</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={categories.data} />
    </div>
  )
}
