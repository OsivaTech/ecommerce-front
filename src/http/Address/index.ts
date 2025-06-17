'use server'

import { AddressEndpoint } from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { UpdateAddressRequest } from '@/types/api/Request/AddressRequest'
import { AddressResponse } from '@/types/api/Response/AddressResponse'

export const getAddressByPostalCode = async (postalCode: string) => {
  const response = await baseHttp.get<AddressResponse>(
    `/address/postalcode/${postalCode}`,
  )
  return response
}

export const updateAddress = async (
  id: number,
  address: UpdateAddressRequest,
) => {
  await baseHttp.setUseAuth(true)
  const response = await baseHttp.put<AddressResponse>(
    `${AddressEndpoint}/${id}`,
    {
      body: JSON.stringify(address),
    },
  )
  return response
}
