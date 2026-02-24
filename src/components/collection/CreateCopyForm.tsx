'use client'

import { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { format as formatDate } from 'date-fns'
import { createCopy } from '@/server/actions/copy'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { Rpm, Format, Condition } from '@/generated/prisma'
import { CalendarIcon } from 'lucide-react'

type ActionState = { ok: true } | { ok: false; error: string }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      type='submit'
      disabled={pending}
      className='
        bg-accent hover:bg-accent/80 hover:cursor-pointer transition-all duration-200
        hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background
      '
    >
      {pending ? 'Adding to collection...' : 'Add to collection'}
    </Button>
  )
}

export function CreateCopyForm() {
  const [state, formAction] = useActionState<ActionState | null, FormData>(
    createCopy,
    null,
  )
  const formRef = useRef<HTMLFormElement | null>(null)

  const [rpm, setRpm] = useState<Rpm | null>(null)
  const rpmLabel = useMemo(() => {
    if (!rpm) return 'RPM'
    if (rpm === 'RPM_33') return '33 RPM'
    if (rpm === 'RPM_45') return '45 RPM'
    return '78 RPM'
  }, [rpm])

  const [format, setFormat] = useState<Format | null>(null)
  const formatLabel = useMemo(() => {
    if (!format) return 'Format'
    if (format === 'LP') return 'LP'
    if (format === 'EP') return 'EP'
    if (format === 'SINGLE') return 'Single'
    return 'Box set'
  }, [format])

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

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <Card className='max-w-2xl'>
      <CardHeader className='space-y-1'>
        <CardTitle className='flex items-center justify-center text-base'>
          Add a record
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-3'>
        <form action={formAction} ref={formRef} className='space-y-3'>
          <div className='space-y-6'>
            <div className='flex gap-4'>
              <Input
                id='artist'
                name='artist'
                type='text'
                placeholder='Artist *'
                required
              />
              <Input
                id='title'
                name='title'
                type='text'
                placeholder='Title *'
                required
              />
            </div>
            <div className='flex gap-4'>
              <Input id='year' name='year' type='text' placeholder='Year' />
              <Input id='label' name='label' type='text' placeholder='Label' />
              <Input
                id='coverArt'
                name='coverArt'
                type='text'
                placeholder='Cover Art (URL)'
              />
            </div>

            {/* Hidden inputs for UI state */}
            <input type='hidden' name='rpm' value={rpm ?? ''} />
            <input type='hidden' name='format' value={format ?? ''} />
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

            <div className='flex gap-5 mt-6'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={cn(
                      'justify-start text-left font-normal',
                      !purchaseDate && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {purchaseDate
                      ? formatDate(purchaseDate, 'PPP')
                      : 'Purchase date'}
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className='w-auto p-0'
                  align='start'
                  side='bottom'
                  sideOffset={8}
                  avoidCollisions={false}
                >
                  <Calendar
                    mode='single'
                    selected={purchaseDate}
                    onSelect={setPurchaseDate}
                    autoFocus
                  />
                  <div className='p-2'>
                    <Button
                      type='button'
                      variant='ghost'
                      className='w-full'
                      onClick={() => setPurchaseDate(undefined)}
                    >
                      Clear
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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

            {/* Dropdown Menus */}
            <div className='flex items-center justify-between flex-1 gap-6 mx-auto w-full'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type='button'
                    variant='outline'
                    className={rpm ? '' : 'text-muted-foreground'}
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
                    className={format ? '' : 'text-muted-foreground'}
                  >
                    {formatLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => setFormat('LP')}>
                      LP
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFormat('EP')}>
                      EP
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFormat('SINGLE')}>
                      Single
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFormat('BOX_SET')}>
                      Box set
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setFormat(null)}>
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
                    className={mediaCondition ? '' : 'text-muted-foreground'}
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
                    className={sleeveCondition ? '' : 'text-muted-foreground'}
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

            <div>
              <Textarea id='notes' name='notes' placeholder='Notes...' />
            </div>

            {state && state.ok === false && (
              <div className='rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive'>
                {state.error}
              </div>
            )}

            <div className='flex justify-center'>
              <SubmitButton />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
