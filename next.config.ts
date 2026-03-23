import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.discogs.com' },
      { protocol: 'https', hostname: 'i.discogs.com' },
      { protocol: 'https', hostname: 'img.discogs.com' },

      {
        protocol: 'https',
        hostname: '7nzpbc7gg8szt9nx.public.blob.vercel-storage.com',
      },

      // Imgur
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'imgur.com' },
    ],
  },
}

export default nextConfig
