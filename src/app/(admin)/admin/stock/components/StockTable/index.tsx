import { columns } from '@/app/(admin)/admin/stock/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { ProductHttp } from '@/http/Product'

export const StockTable = async () => {
  const products = await ProductHttp.getProducts()

  if (products.hasError) {
    return <div>{products.error[0]?.message}</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={products.data} />
    </div>
  )
}
