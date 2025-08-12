import {
  ReportSalesGridEndpoint,
  ReportSalesSummaryEndpoint,
  ReportSalesTimeChartEndpoint,
} from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import {
  GetSalesGridResponse,
  GetSalesSummaryResponse,
  GetSalesTimeChartResponse,
} from '@/types/api/Response/ReportResponse'
import { ResponseData } from '@/types/Error'

export type DashboardData = {
  summaryCardData: GetSalesSummaryResponse
  salesChartData: GetSalesTimeChartResponse[]
  recentSales: GetSalesGridResponse[]
}

export class ReportHttp {
  static async getDashBoardData(
    startDate: string,
    endDate: string,
  ): Promise<DashboardData> {
    const [summary, timeChart, recentSales] = await Promise.all([
      this.getReportSalesSummary(startDate, endDate),
      this.getReportSalesTimeChart(startDate, endDate),
      this.getReportSalesGrid(startDate, endDate),
    ])

    if (summary.hasError || timeChart.hasError || recentSales.hasError) {
      return {} as DashboardData
    }

    return {
      summaryCardData: summary.data,
      salesChartData: timeChart.data,
      recentSales: recentSales.data,
    }
  }

  static async getReportSalesSummary(
    startDate: string,
    endDate: string,
  ): Promise<ResponseData<GetSalesSummaryResponse>> {
    const response = await baseHttp.get<GetSalesSummaryResponse>(
      ReportSalesSummaryEndpoint,
      {
        To: endDate,
        From: startDate,
      },
    )
    return response
  }

  static async getReportSalesTimeChart(
    startDate: string,
    endDate: string,
  ): Promise<ResponseData<GetSalesTimeChartResponse[]>> {
    const response = await baseHttp.get<GetSalesTimeChartResponse[]>(
      ReportSalesTimeChartEndpoint,
      {
        To: endDate,
        From: startDate,
      },
    )
    return response
  }

  static async getReportSalesGrid(
    startDate: string,
    endDate: string,
  ): Promise<ResponseData<GetSalesGridResponse[]>> {
    const response = await baseHttp.get<GetSalesGridResponse[]>(
      ReportSalesGridEndpoint,
      {
        To: endDate,
        From: startDate,
      },
    )
    return response
  }
}
