'use client'

import { GetSalesTimeChartResponse } from '@/types/api/Response/ReportResponse'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  registerables,
} from 'chart.js'
import { format } from 'date-fns'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables,
)

export const DashboardChart = ({
  data,
}: {
  data: GetSalesTimeChartResponse[]
}) => {
  const chartData = {
    labels: data?.map((item) => format(item.date, 'dd/MM/yyyy')),
    datasets: [
      {
        label: 'Total de vendas',
        data: data?.map((item) => item.totalSales),
        backgroundColor: 'rgba(34, 197, 94, 0.15)', // verde-600 com opacidade para fundo
        borderColor: '#22c55e', // verde-600
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#22c55e',
      },
      {
        label: 'Total de pedidos',
        data: data?.map((item) => item.totalOrder),
        backgroundColor: 'rgba(30, 64, 175, 0.15)', // azul-700 com opacidade para fundo
        borderColor: '#1e40af', // azul-700
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#1e40af',
        pointBorderColor: '#1e40af',
      },
    ],
  }

  const chartOptions: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  }
  return (
    <Chart
      type="line"
      className="max-h-[442px]"
      data={chartData}
      options={chartOptions as ChartOptions}
    />
  )
}
