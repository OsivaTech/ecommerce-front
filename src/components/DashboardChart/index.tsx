'use client'

import { Chart } from 'react-chartjs-2'
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

export const DashboardChart = () => {
  const chartData = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Vendas',
        data: [200, 150, 250, 300, 200, 350],
        backgroundColor: '#8A1F1F',
        borderColor: '#000',
        borderWidth: 1,
        tension: 0.5,
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
        display: false,
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
