import { env } from '@/env'

const apiBaseUrl = env.NEXT_PUBLIC_API_BASE_URL

export const RegistrationPendingEndpoint = `${apiBaseUrl}/registration/pending`
