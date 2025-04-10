import { get } from '@/lib/api'

export async function getPendingUsers() {
  const response = await get('/users/pending', {}, false)

  return response.json()
}
