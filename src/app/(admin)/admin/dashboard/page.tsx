import { AdminTitle } from '@/components/AdminTitle'
import { DashboardCard } from '@/components/DashboardCard'
import { DataTable } from '@/components/ui/data-table'
import { DatePicker } from '@/components/ui/date-picker'
import { columns } from './components/columns'

import { DashboardChart } from '@/components/DashboardChart'
import { ReportHttp } from '@/http/Report'

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ from: string; to: string }>
}) {
  const { from, to } = await searchParams
  const data = await ReportHttp.getDashBoardData(from, to)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-between lg:flex-row flex-col">
        <AdminTitle title="Dashboard" description="Welcome to the dashboard" />
        <DatePicker />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <DashboardCard
          isCurrency
          title="Total de vendas"
          value={data.summaryCardData?.totalSales ?? 0}
        />
        <DashboardCard
          title="Produtos vendidos"
          value={data.summaryCardData?.totalProductsSold ?? 0}
        />
        <DashboardCard
          isCurrency
          title="Valor Médio por cliente"
          value={data.summaryCardData?.averageValuePerCustomer ?? 0}
        />
        <DashboardCard
          isCurrency
          title="Ticket Médio"
          value={data.summaryCardData?.averageTicket ?? 0}
        />
        <DashboardCard
          title="Pedidos"
          value={data.summaryCardData?.totalOrders ?? 0}
        />
        <DashboardCard
          title="Pedidos Cancelados"
          value={data.summaryCardData?.totalOrders ?? 0}
        />
      </div>
      <div>
        <h2 className="app-title-secondary py-4">Volume de vendas</h2>
        <DashboardChart data={data.salesChartData} />
      </div>
      <div>
        <h2 className="app-title-secondary py-4">Últimos pedidos</h2>
        <DataTable data={data.recentSales ?? []} columns={columns} />
      </div>
    </div>
  )
}
