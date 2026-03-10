'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { AlbumFallback } from '@/components/media/AlbumFallback'
import type { UserDetails as UserDetailsType } from '@/types/user'

type UserDetailsProps = { user: UserDetailsType }

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <Card className='overflow-hidden border-border bg-card max-w-md w-full'>
      <CardContent className='p-6'>
        <div className='flex items-center gap-4'>
          <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border bg-muted'>
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? 'User avatar'}
                fill
                className='object-cover'
              />
            ) : (
              <AlbumFallback />
            )}
          </div>

          <div className='min-w-0'>
            <p className='truncate text-lg font-semibold'>{user.name ?? '—'}</p>
            <p className='truncate text-sm text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-4 rounded-md border border-border p-4'>
          <div className='text-center'>
            <p className='text-2xl font-bold text-accent'>
              {user._count.copies}
            </p>
            <p className='text-xs text-muted-foreground'>Albums</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
