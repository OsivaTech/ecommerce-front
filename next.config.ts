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
        hostname: 'cdn.shopify.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'r2est-catalogo.s3.sa-east-1.amazonaws.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
