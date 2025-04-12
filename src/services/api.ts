import axios from 'axios'

export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || 'https://ecommerce-stg.osiva.tech:8443',
  headers: {
    'Content-Type': 'application/json',
  },
})

/* api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
) */
