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
}

export default nextConfig
