import Image from 'next/image'
import type { CopyWithRelease } from '@/types/db'
import { Card, CardContent } from '@/components/ui/card'
import { Music, Heart } from 'lucide-react'

type CopyCardProps = {
  copy: CopyWithRelease
}

function TempImage() {
  return <Music className='h-6 w-6 text-muted-foreground' />
}

export function CopyCard({ copy }: CopyCardProps) {
  return (
    <Card className='overflow-hidden border-border bg-card cursor-pointer transition-transform duration-250 ease-out hover:scale-[1.03] hover:shadow-lg'>
      <CardContent className='p-4'>
        {/* Artwork */}
        <div className='relative aspect-square w-full overflow-hidden rounded-md border border-border bg-muted'>
          {copy.release.coverArt ? (
            <Image
              src={copy.release.coverArt}
              alt={`${copy.release.artist} - ${copy.release.title}`}
              fill
              className='object-cover'
              sizes='(min-width: 1280px) 18vw, (min-width: 1024px) 20vw, (min-width: 640px) 40vw, 90vw'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center'>
              <TempImage />
            </div>
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

          {/* optional micro-meta row */}
          <div className='flex items-center justify-between pt-1 text-[11px] text-muted-foreground'>
            <span>{copy.release.year ?? '—'}</span>
            <span>
              {copy.isFavorite ? (
                <Heart
                  className='h-4 w-4 fill-accent text-accent'
                  strokeWidth={1.5}
                />
              ) : (
                <Heart
                  className='h-4 w-4 text-muted-foreground'
                  strokeWidth={1.5}
                />
              )}
            </span>
          </div>

          {/* Label - Format row */}
          <div className='pt-1 text-[11px] text-muted-foreground'>
            <span className='line-clamp-1'>
              {copy.release.label ?? '—'}{' '}
              {copy.release.format
                ? `– ${copy.release.format.replaceAll('_', ' ')}`
                : ''}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
