'use client'

import { useActionState, useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { format as formatDate } from 'date-fns'
import { createCopy } from '@/server/actions/copy'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Rpm, Condition } from '@/generated/prisma'
import { CalendarIcon } from 'lucide-react'

type ActionState = { ok: true } | { ok: false; error: string }

type Prefill = {
  discogsId?: string
  artist?: string
  title?: string
  year?: string
  label?: string
  format?: string
  coverArt?: string
}

type CreateCopyFormProps = {
  prefill?: Prefill
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending}
      className='
        bg-accent hover:bg-accent/90 hover:cursor-pointer transition-all duration-200 hover:text-white
      '
    >
      {pending ? 'Adding to collection...' : 'Add to collection'}
    </Button>
  )
}

export function CreateCopyForm({ prefill }: CreateCopyFormProps) {
  const [state, formAction] = useActionState<ActionState | null, FormData>(
    createCopy,
    null,
  )

  const [rpm, setRpm] = useState<Rpm | null>(null)
  const rpmLabel = useMemo(() => {
    if (!rpm) return 'RPM'
    if (rpm === 'RPM_33') return '33 RPM'
    if (rpm === 'RPM_45') return '45 RPM'
    return '78 RPM'
  }, [rpm])

  const [mediaCondition, setMediaCondition] = useState<Condition | null>(null)
  const mediaConditionLabel = useMemo(() => {
    if (!mediaCondition) return 'Media condition'
    if (mediaCondition === 'MINT') return 'Mint'
    if (mediaCondition === 'NEAR_MINT') return 'Near mint'
    if (mediaCondition === 'VERY_GOOD_PLUS') return 'Very good plus'
    if (mediaCondition === 'VERY_GOOD') return 'Very good'
    if (mediaCondition === 'GOOD_PLUS') return 'Good plus'
    if (mediaCondition === 'GOOD') return 'Good'
    if (mediaCondition === 'FAIR') return 'Fair'
    return 'Poor'
  }, [mediaCondition])

  const [sleeveCondition, setSleeveCondition] = useState<Condition | null>(null)
  const sleeveConditionLabel = useMemo(() => {
    if (!sleeveCondition) return 'Sleeve condition'
    if (sleeveCondition === 'MINT') return 'Mint'
    if (sleeveCondition === 'NEAR_MINT') return 'Near mint'
    if (sleeveCondition === 'VERY_GOOD_PLUS') return 'Very good plus'
    if (sleeveCondition === 'VERY_GOOD') return 'Very good'
    if (sleeveCondition === 'GOOD_PLUS') return 'Good plus'
    if (sleeveCondition === 'GOOD') return 'Good'
    if (sleeveCondition === 'FAIR') return 'Fair'
    return 'Poor'
  }, [sleeveCondition])

  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined)
  const [purchaseDateOpen, setPurchaseDateOpen] = useState(false)

  return (
    <Card className='max-w-2xl'>
      <CardHeader className='space-y-1'>
        <CardTitle className='flex items-center justify-center text-base'>
          Add a record
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <form action={formAction} className='space-y-6'>
          {/* Release Info (read-only) */}
          <div className='rounded-md border bg-muted/20 p-4'>
            <div className='mb-3 text-sm font-medium'>Release</div>

            <div className='flex items-center gap-4'>
              {prefill?.coverArt ? (
                <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-md border'>
                  <Image
                    src={prefill.coverArt}
                    alt={prefill.title ?? 'Cover art'}
                    fill
                    className='object-cover'
                  />
                </div>
              ) : null}

              <div className='min-w-0'>
                <p className='font-medium'>{prefill?.artist}</p>
                <p className='text-sm text-muted-foreground'>
                  {prefill?.title}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {[prefill?.year, prefill?.label, prefill?.format]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </div>

            {/* Hidden Release Fields */}
            <input
              type='hidden'
              name='discogsId'
              value={prefill?.discogsId ?? ''}
            />
            <input type='hidden' name='artist' value={prefill?.artist ?? ''} />
            <input type='hidden' name='title' value={prefill?.title ?? ''} />
            <input type='hidden' name='year' value={prefill?.year ?? ''} />
            <input type='hidden' name='label' value={prefill?.label ?? ''} />
            <input type='hidden' name='format' value={prefill?.format ?? ''} />
            <input
              type='hidden'
              name='coverArt'
              value={prefill?.coverArt ?? ''}
            />
          </div>

          {/* Hidden Copy State Inputs */}
          <input type='hidden' name='rpm' value={rpm ?? ''} />
          <input
            type='hidden'
            name='mediaCondition'
            value={mediaCondition ?? ''}
          />
          <input
            type='hidden'
            name='sleeveCondition'
            value={sleeveCondition ?? ''}
          />
          <input
            type='hidden'
            name='purchaseDate'
            value={purchaseDate ? formatDate(purchaseDate, 'yyyy-MM-dd') : ''}
          />

          {/* Acquisition */}
          <div className='rounded-md border p-4'>
            <div className='mb-3 text-sm font-medium'>Acquisition</div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
              <Dialog
                open={purchaseDateOpen}
                onOpenChange={setPurchaseDateOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !purchaseDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {purchaseDate
                      ? formatDate(purchaseDate, 'PPP')
                      : 'Purchase date'}
                  </Button>
                </DialogTrigger>

                <DialogContent className='w-auto p-0'>
                  <DialogHeader className='p-4 pb-0'>
                    <DialogTitle>Purchase date</DialogTitle>
                  </DialogHeader>
                  <div className='p-4 pt-2'>
                    <Calendar
                      mode='single'
                      selected={purchaseDate}
                      onSelect={(date) => {
                        setPurchaseDate(date)
                        if (date) setPurchaseDateOpen(false)
                      }}
                      autoFocus
                    />
                    <div className='mt-2'>
                      <Button
                        type='button'
                        variant='ghost'
                        className='w-full'
                        onClick={() => {
                          setPurchaseDate(undefined)
                          setPurchaseDateOpen(false)
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Input
                id='purchasePriceCents'
                name='purchasePriceCents'
                placeholder='Purchase price'
              />

              <Input
                id='storageLocation'
                name='storageLocation'
                placeholder='Storage location'
              />
            </div>
          </div>

          {/* Details */}
          <div className='rounded-md border p-4'>
            <div className='mb-3 text-sm font-medium'>Details</div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn('w-full', !rpm && 'text-muted-foreground')}
                  >
                    {rpmLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => setRpm('RPM_33')}>
                      33
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setRpm('RPM_45')}>
                      45
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setRpm('RPM_78')}>
                      78
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setRpm(null)}>
                      Clear
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn(
                      'w-full',
                      !mediaCondition && 'text-muted-foreground',
                    )}
                  >
                    {mediaConditionLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('MINT')}
                    >
                      Mint
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('NEAR_MINT')}
                    >
                      Near mint
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('VERY_GOOD_PLUS')}
                    >
                      Very good plus
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('VERY_GOOD')}
                    >
                      Very good
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('GOOD_PLUS')}
                    >
                      Good plus
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('GOOD')}
                    >
                      Good
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('FAIR')}
                    >
                      Fair
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setMediaCondition('POOR')}
                    >
                      Poor
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setMediaCondition(null)}>
                      Clear
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn(
                      'w-full',
                      !sleeveCondition && 'text-muted-foreground',
                    )}
                  >
                    {sleeveConditionLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('MINT')}
                    >
                      Mint
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('NEAR_MINT')}
                    >
                      Near mint
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('VERY_GOOD_PLUS')}
                    >
                      Very good plus
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('VERY_GOOD')}
                    >
                      Very good
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('GOOD_PLUS')}
                    >
                      Good plus
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('GOOD')}
                    >
                      Good
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('FAIR')}
                    >
                      Fair
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setSleeveCondition('POOR')}
                    >
                      Poor
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSleeveCondition(null)}>
                      Clear
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Notes */}
          <Textarea id='notes' name='notes' placeholder='Notes...' />

          {state?.ok === false && (
            <div className='rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive'>
              {state.error}
            </div>
          )}

          <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-2'>
            <SubmitButton />
            <Link href='/collection'>
              <Button
                className='hover:cursor-pointer hover:text-muted-foreground w-full'
                variant='outline'
              >
                Back to collection
              </Button>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
