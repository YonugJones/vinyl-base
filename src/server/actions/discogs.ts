'use server'

import { requireSession } from '@/server/auth/session'

export type DiscogsResult = {
  discogsId: number
  title: string
  artist: string
  year: number | null
  label: string | null
  format: string | null
  coverArt: string | null
  thumb: string | null
}

export async function searchDiscogs(query: string): Promise<DiscogsResult[]> {
  await requireSession()

  if (!query.trim()) return []

  const params = new URLSearchParams({
    q: query,
    type: 'release',
    per_page: '20',
  })

  const res = await fetch(`https://api.discogs.com/database/search?${params}`, {
    headers: {
      Authorization: `Discogs token=${process.env.DISCOGS_TOKEN}`,
      'User-Agent': 'VinylBase/1.0',
    },
  })

  if (!res.ok) throw new Error('Discogs search failed')

  const data = await res.json()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.map((item: any) => {
    const artist = item.title?.split(' - ')[0] ?? ''
    const title = item.title?.split(' - ')[1] ?? item.title ?? ''

    return {
      discogsId: item.id,
      title,
      artist,
      year: item.year ? Number(item.year) : null,
      label: item.label?.[0] ?? null,
      format: item.format?.[0] ?? null,
      coverArt: item.cover_image ?? null,
      thumb: item.thumb ?? null,
    }
  })
}
