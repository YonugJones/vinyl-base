import Image from 'next/image'
import type { CopyWithRelease } from '@/types/db'
import { Card, CardContent } from '@/components/ui/card'
import { AlbumFallback } from '@/components/media/AlbumFallback'
import { formatEnum, formatPrice } from '@/lib/format'
import { Heart } from 'lucide-react'

type CopyDetailsProps = { copy: CopyWithRelease }

export function CopyDetails({ copy }: CopyDetailsProps) {
  return (
    <Card className='overflow-hidden border-border bg-card'>
      <CardContent className='p-6'>
        <div className='flex flex-col gap-6 md:flex-row'>
          {/* LEFT SIDE: Artwork (fixed square) */}
          <div className='w-full md:w-72'>
            <div className='relative aspect-square w-full overflow-hidden rounded-md border border-border bg-muted'>
              {copy.release.coverArt ? (
                <Image
                  src={copy.release.coverArt}
                  alt={`${copy.release.artist} - ${copy.release.title}`}
                  fill
                  className='object-cover'
                  sizes='(min-width: 768px) 288px, 90vw'
                />
              ) : (
                <AlbumFallback />
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Info */}
          <div className='min-w-0 flex-1'>
            <div className='flex items-start justify-between gap-4'>
              <h1 className='min-w-0 text-3xl font-semibold tracking-tight md:text-4xl'>
                <span className='text-foreground'>{copy.release.artist}</span>{' '}
                <span className='text-muted-foreground'>-</span>{' '}
                <span className='text-foreground'>{copy.release.title}</span>
              </h1>

              <Heart
                className={`mt-1 h-5 w-5 shrink-0 ${
                  copy.isFavorite
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
                strokeWidth={1.5}
              />
            </div>

            {/* 2 Colum Grid */}
            <div className='mt-6 grid grid-cols-[140px_1fr] gap-x-6 gap-y-3 text-sm'>
              <div className='text-muted-foreground'>Label</div>
              <div className='text-foreground'>{copy.release.label ?? '—'}</div>

              <div className='text-muted-foreground'>Format</div>
              <div className='text-foreground'>
                {copy.release.format ? formatEnum(copy.release.format) : '—'}
                {copy.release.rpm
                  ? `, ${formatEnum(copy.release.rpm).replace('RPM ', '')} RPM`
                  : ''}
              </div>

              <div className='text-muted-foreground'>Released</div>
              <div className='text-foreground'>{copy.release.year ?? '—'}</div>

              <div className='text-muted-foreground'>Media condition</div>
              <div className='text-foreground'>
                {copy.mediaCondition ? formatEnum(copy.mediaCondition) : '—'}
              </div>

              <div className='text-muted-foreground'>Sleeve condition</div>
              <div className='text-foreground'>
                {copy.sleeveCondition ? formatEnum(copy.sleeveCondition) : '—'}
              </div>

              <div className='text-muted-foreground'>Purchase price</div>
              <div className='text-foreground'>
                {formatPrice(copy.purchasePriceCents)}
              </div>

              <div className='text-muted-foreground'>Purchase date</div>
              <div className='text-foreground'>
                {copy.purchaseDate
                  ? new Date(copy.purchaseDate).toLocaleDateString()
                  : '—'}
              </div>

              <div className='text-muted-foreground'>Storage</div>
              <div className='text-foreground'>
                {copy.storageLocation ?? '—'}
              </div>

              <div className='text-muted-foreground'>Notes</div>
              <div className='text-foreground'>
                {copy.notes ? (
                  <p className='whitespace-pre-wrap leading-relaxed'>
                    {copy.notes}
                  </p>
                ) : (
                  '—'
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
