import { get } from '@/lib/api'

// export async function regusterUser() { }
export async function getPendingRegistrations() {
  const response = await get('/registration/pending', {}, false)

  return response.json()
}
