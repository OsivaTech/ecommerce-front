'use server'
import { Sales } from '@/http/types/Sales'

export type DashboardData = {
  summaryCardData: {
    totalSales: number
    totalProducts: number
    totalCustomers: number
    totalOrders: number
    totalRevenue: number
  }
  salesChartData: {
    labels: string[]
    data: number[]
  }
  recentSales: Sales[]
}
export async function getDashBoardData() {
  return {
    summaryCardData: {
      totalSales: 100,
      totalProducts: 100,
      totalCustomers: 100,
      totalOrders: 100,
      totalRevenue: 100,
    },
    salesChartData: {
      labels: [
        '2021-01-01',
        '2021-01-02',
        '2021-01-03',
        '2021-01-04',
        '2021-01-05',
        '2021-01-06',
      ],
      data: [100, 200, 300, 400, 500, 600],
    },
    recentSales: [
      {
        id: '1',
        orderId: '1',
        date: '2021-01-01',
        customerName: 'John Doe',
        totalItems: '100',
        paymentMethod: 'Credit Card',
        totalPrice: '100',
      },
      {
        id: '2',
        orderId: '2',
        date: '2021-01-01',
        customerName: 'John Doe',
        totalItems: '100',
        paymentMethod: 'Credit Card',
        totalPrice: '100',
      },
    ],
  }
}
