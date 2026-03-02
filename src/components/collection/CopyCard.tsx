'use client'

import Link from 'next/link'
import type { CopyWithRelease } from '@/types/db'
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { CoverArt } from '@/components/collection/CoverArt'
import { AlbumFallback } from '@/components/media/AlbumFallback'
import { Button } from '@/components/ui/button'
import { toggleIsFavorite } from '@/server/actions/copy'

type CopyCardProps = { copy: CopyWithRelease }

export function CopyCard({ copy }: CopyCardProps) {
  return (
    <Link href={`/collection/${copy.id}`} className='block'>
      <Card className='overflow-hidden border-border bg-card transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg'>
        <CardContent className='p-4'>
          {/* Artwork */}
          <div className='relative aspect-square w-full overflow-hidden rounded-md border border-border bg-muted'>
            {copy.release.coverArt ? (
              <CoverArt
                src={copy.release.coverArt}
                alt={`${copy.release.artist} - ${copy.release.title}`}
                className='object-cover'
                sizes='(min-width: 1280px) 18vw, (min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw'
                fallback={<AlbumFallback />}
              />
            ) : (
              <AlbumFallback />
            )}
          </div>

          {/* Text */}
          <div className='mt-3 space-y-1'>
            <h3 className='line-clamp-1 text-sm font-semibold'>
              {copy.release.title}
            </h3>
            <p className='line-clamp-1 text-xs text-muted-foreground'>
              {copy.release.artist}
            </p>

            <div className='flex items-center justify-between pt-1 text-[11px] text-muted-foreground'>
              <span>{copy.release.year ?? '—'}</span>

              <Button
                size='icon'
                className='group h-6 w-6 bg-card hover:bg-card'
                onClick={async (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  await toggleIsFavorite(copy.id)
                }}
              >
                <Heart
                  className={`h-4 w-4 transition-all ${
                    copy.isFavorite
                      ? 'fill-accent text-accent group-hover:fill-transparent'
                      : 'text-muted-foreground group-hover:fill-accent group-hover:text-accent'
                  }`}
                  strokeWidth={1.5}
                />
              </Button>
            </div>

            <div className='pt-1 text-[11px] text-muted-foreground'>
              <span className='line-clamp-1'>
                {copy.release.label ?? '—'}{' '}
                {copy.release.format
                  ? `- ${copy.release.format.replaceAll('_', ' ')}`
                  : ''}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
