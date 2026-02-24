import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'www.discogs.com' }],
  },
}

export default nextConfig
