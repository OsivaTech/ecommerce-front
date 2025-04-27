import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    styledComponents: {
      ssr: true,
      fileName: false,
      displayName: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.lsinjectable.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'osiva.tech',
        port: '',
      },
    ],
  },
}

export default nextConfig
