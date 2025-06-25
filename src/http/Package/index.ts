import { PackageByIdEndpoint, PackageEndpoint } from '@/constants/endpoints'
import baseHttp from '../BaseHttp'

import { PackageResponse } from '@/types/api/Response/PackageResponse'
import {
  CreatePackageRequest,
  UpdatePackageRequest,
} from '@/types/api/Request/PackageRequest'

export class HttpPackage {
  private static http = baseHttp

  static async getPackages() {
    await this.http.setUseAuth(true)
    const response = await this.http.get<PackageResponse[]>(PackageEndpoint)
    return response
  }

  static async getPackageById(id: string) {
    await this.http.setUseAuth(true)
    const response = await this.http.get<PackageResponse>(
      PackageByIdEndpoint(id),
    )
    return response
  }

  static async createPackage(data: CreatePackageRequest) {
    await this.http.setUseAuth(true)
    const response = await this.http.post<PackageResponse>(PackageEndpoint, {
      body: JSON.stringify(data),
    })
    return response
  }

  static async updatePackage(id: string, data: UpdatePackageRequest) {
    await this.http.setUseAuth(true)
    const response = await this.http.put<PackageResponse>(
      PackageByIdEndpoint(id),
      { body: JSON.stringify(data) },
    )
    return response
  }

  static async deletePackage(id: string) {
    await this.http.setUseAuth(true)
    const response = await this.http.delete<PackageResponse>(
      PackageByIdEndpoint(id),
    )
    return response
  }
}
