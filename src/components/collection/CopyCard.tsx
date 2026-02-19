import Link from 'next/link'
import Image from 'next/image'
import type { CopyWithRelease } from '@/types/db'
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { AlbumFallback } from '@/components/media/AlbumFallback'

type CopyCardProps = { copy: CopyWithRelease }

export function CopyCard({ copy }: CopyCardProps) {
  return (
    <Link href={`/collection/${copy.id}`} className='block'>
      <Card className='overflow-hidden border-border bg-card transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg'>
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

              <Heart
                className={`h-4 w-4 ${
                  copy.isFavorite
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
                strokeWidth={1.5}
              />
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
