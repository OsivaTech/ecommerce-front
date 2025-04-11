'use server'
import { get, put } from '@/lib/api'
import {
  RegistrationApprovedEndpoint,
  RegistrationPendingEndpoint,
  RegistrationRejectedEndpoint,
} from '@/constants/endpoints'
import { RegistrationPendingResponse } from '@/types/api/Response/RegistrationResponse'
import { ResponseError } from '@/types/Error'

export async function getPendingRegistrations() {
  const response = await get(RegistrationPendingEndpoint, {}, false)

  const pendingRegistrations: RegistrationPendingResponse =
    await response.json()

  return pendingRegistrations
}

export async function approveRegistration(
  id: string,
): Promise<void | ResponseError> {
  const response = await put(RegistrationApprovedEndpoint(id), {}, false)
  const approvedRegistration = await response.json()

  if (approvedRegistration.status === 500) {
    return {
      code: '500',
      message: 'Ocorreu um erro ao aprovar o registro',
    }
  } else if (approvedRegistration.status > 300) {
    return {
      code: approvedRegistration.code,
      message: approvedRegistration.message,
    }
  } else {
    return {
      code: '200',
      message: 'Registro aprovado com sucesso',
    }
  }
  
}

export async function rejectRegistration(id: string, rejectReason: string) {
  const response = await put(
    RegistrationRejectedEndpoint(id),
    { body: JSON.stringify({ rejectReason }) },
    false,
  )

  const rejectedRegistration = await response.json()

  console.log(rejectedRegistration)
}
