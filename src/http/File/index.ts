import baseHttp from "@/http/BaseHttp"
import { FileResponse } from "@/types/api/Response/FileResponse"
import { FileEndpoint } from "@/constants/endpoints"

export class FileHttp {
  static async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await baseHttp.post<FileResponse>(FileEndpoint, {
      body: formData,
      headers: {},
    })
    return response
  }
}