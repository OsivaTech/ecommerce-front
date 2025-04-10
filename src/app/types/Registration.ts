import { RegistrationPendingResponse } from '@/app/types/api/Response/RegistrationPendingResponse'
import { get } from '@/lib/api'
import { RegistrationPendingEndpoint } from '@/lib/endpoints'

export async function getPendingRegistrations() {
  const response = await get(RegistrationPendingEndpoint, {}, false)

  const pendingRegistrations: RegistrationPendingResponse =
    await response.json()

  return pendingRegistrations
}
