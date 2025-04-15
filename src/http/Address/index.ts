'use server'

import baseHttp from '@/http/BaseHttp'
import { AddressResponse } from '@/types/api/Response/AddressResponse'

export const getAddressByPostalCode = async (postalCode: string) => {
  const response = await baseHttp.get<AddressResponse>(
    `/address/postalcode/${postalCode}`,
  )
  return response
}
