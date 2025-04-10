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
      <div className="flex w-full items-center justify-between">
        <AdminTitle title="Dashboard" description="Welcome to the dashboard" />
        <DatePicker />
      </div>
      <div className="grid grid-cols-3 gap-4">
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
        <h1 className="text-2xl font-bold">Volume de vendas</h1>
        <DashboardChart />
      </div>
      <div>
        <DataTable data={data.recentSales} columns={columns} />
      </div>
    </div>
  )
}
