'use client'

import { useActionState, useState, useEffect } from 'react'
import Image from 'next/image'
import { Pencil, X, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlbumFallback } from '@/components/media/AlbumFallback'
import { editUser } from '@/server/actions/user'
import type { UserDetails as UserDetailsType } from '@/types/user'

type UserDetailsProps = { user: UserDetailsType }
type ActionState = { ok: true } | { ok: false; error: string }

export function UserDetails({ user }: UserDetailsProps) {
  const [state, formAction] = useActionState<ActionState | null, FormData>(
    editUser,
    null,
  )

  const [displayname, setDisplayName] = useState(user.name ?? '')
  const [isEditing, setIsEditing] = useState(false)
  const [nameInput, setNameInput] = useState(user.name ?? '')
  const hasChanged = nameInput !== displayname

  useEffect(() => {
    if (state?.ok) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayName(nameInput)
      setIsEditing(false)
    }
  }, [state, nameInput])

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

          <div className='min-w-0 flex-1'>
            {isEditing ? (
              <form action={formAction} className='flex items-center gap-2'>
                <Input
                  name='name'
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className='h-8'
                  autoFocus
                />
                <Button
                  type='submit'
                  size='icon'
                  variant='ghost'
                  disabled={!hasChanged}
                  className='shrink-0 hover:cursor-pointer'
                >
                  <Check className='h-4 w-4 text-accent' />
                </Button>
                <Button
                  type='button'
                  size='icon'
                  variant='ghost'
                  className='shrink-0 hover:cursor-pointer'
                  onClick={() => {
                    setNameInput(displayname)
                    setIsEditing(false)
                  }}
                >
                  <X className='h-4 w-4' />
                </Button>
              </form>
            ) : (
              <div
                className='flex items-center gap-2 cursor-pointer group'
                onClick={() => setIsEditing(true)}
              >
                <p className='truncate text-lg font-semibold'>
                  {displayname ?? '—'}
                </p>
                <Pencil className='h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0' />
              </div>
            )}
            <p className='truncate text-sm text-muted-foreground'>
              {user.email}
            </p>
          </div>
        </div>

        {state?.ok === false && (
          <p className='mt-3 text-sm text-destructive'>{state.error}</p>
        )}

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
