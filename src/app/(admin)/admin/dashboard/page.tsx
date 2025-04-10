import { AdminTitle } from '@/components/AdminTitle'
import { DashboardCard } from '@/components/DashboardCard'
import { DataTable } from '@/components/ui/data-table'
import { DatePicker } from '@/components/ui/date-picker'
import { columns } from './components/columns'
import { getDashBoardData } from '@/http/Dashboard'

import { DashboardChart } from '@/components/DashboardChart'

export default async function AdminPage() {
  const data = await getDashBoardData()

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
          value={data.summaryCardData.totalSales}
        />
        <DashboardCard
          title="Produtos vendidos"
          value={data.summaryCardData.totalProducts}
        />
        <DashboardCard
          title="Valor Médio por cliente"
          value={data.summaryCardData.totalRevenue}
        />
        <DashboardCard
          title="Ticket Médio"
          value={data.summaryCardData.totalRevenue}
        />
        <DashboardCard
          title="Pedidos"
          value={data.summaryCardData.totalOrders}
        />
        <DashboardCard
          title="Pedidos Cancelados"
          value={data.summaryCardData.totalOrders}
        />
      </div>
      <div>
        <h2 className="app-title-secondary py-4">Volume de vendas</h2>
        <DashboardChart />
      </div>
      <div>
        <h2 className="app-title-secondary py-4">Últimos pedidos</h2>
        <DataTable data={data.recentSales} columns={columns} />
      </div>
    </div>
  )
}
