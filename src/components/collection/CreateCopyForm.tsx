'use client'

import { useActionState, useEffect, useMemo, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import Image from 'next/image'
import { format as formatDate } from 'date-fns'
import { createCopy } from '@/server/actions/copy'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Rpm, Format, Condition } from '@/generated/prisma'
import { CalendarIcon } from 'lucide-react'

type ActionState = { ok: true } | { ok: false; error: string }

function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus()
  const isDisabled = pending || disabled
  return (
    <Button
      type='submit'
      disabled={isDisabled}
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
  const [purchaseDateOpen, setPurchaseDateOpen] = useState(false)
  const [coverArtUrl, setCoverArtUrl] = useState<string | null>(null)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [coverError, setCoverError] = useState<string | null>(null)

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
      setPurchaseDate(undefined)
      setCoverArtUrl(null)
      setCoverError(null)
      setRpm(null)
      setFormat(null)
      setMediaCondition(null)
      setSleeveCondition(null)
    }
  }, [state])

  async function handleCoverFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget
    const file = e.target.files?.[0]
    if (!file) return

    setCoverError(null)
    setUploadingCover(true)

    try {
      const fd = new FormData()
      fd.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      })

      const data = (await res.json()) as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        setCoverError(data.error ?? 'Upload failed.')
        return
      }

      setCoverArtUrl(data.url)
    } catch {
      setCoverError('Upload failed.')
    } finally {
      setUploadingCover(false)
      input.value = ''
    }
  }

  return (
    <Card className='max-w-2xl'>
      <CardHeader className='space-y-1'>
        <CardTitle className='flex items-center justify-center text-base'>
          Add a record
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-6'>
        <form action={formAction} ref={formRef} className='space-y-6'>
          <div className='space-y-6'>
            {/* Release: artist/title */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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

            {/* Release: year/label */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Input id='year' name='year' type='text' placeholder='Year' />
              <Input id='label' name='label' type='text' placeholder='Label' />
            </div>

            {/* Cover art */}
            <div className='rounded-md border bg-muted/20 p-4'>
              <div className='mb-3 text-sm font-medium'>Cover art</div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-start'>
                <div className='space-y-2'>
                  <Label htmlFor='coverFile' className='sr-only'>
                    Cover art
                  </Label>

                  <Input
                    id='coverFile'
                    name='coverFile'
                    type='file'
                    accept='image/png,image/jpeg,image/webp'
                    onChange={handleCoverFileChange}
                    disabled={uploadingCover}
                  />

                  {uploadingCover ? (
                    <p className='text-sm text-muted-foreground'>
                      Uploading...
                    </p>
                  ) : null}

                  {coverError ? (
                    <p className='text-sm text-destructive'>{coverError}</p>
                  ) : null}

                  {!coverArtUrl && !uploadingCover ? (
                    <p className='text-xs text-muted-foreground'>
                      PNG, JPEG, or WebP. Recommended: square cover art.
                    </p>
                  ) : null}
                </div>

                {coverArtUrl ? (
                  <div className='relative aspect-square w-32 overflow-hidden rounded-md border md:w-40'>
                    <Image
                      src={coverArtUrl}
                      alt='Cover preview'
                      fill
                      className='object-cover'
                      sizes='(min-width: 768px) 160px, 128px'
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* Hidden inputs for UI state */}
            <input type='hidden' name='coverArt' value={coverArtUrl ?? ''} />
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

            {/* Acquisition */}
            <div className='rounded-md border p-4'>
              <div className='mb-3 text-sm font-medium'>Acquisition</div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
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

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type='button'
                      variant='outline'
                      className={cn(
                        'w-full',
                        rpm ? '' : 'text-muted-foreground',
                      )}
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
                        format ? '' : 'text-muted-foreground',
                      )}
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
                      className={cn(
                        'w-full',
                        mediaCondition ? '' : 'text-muted-foreground',
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
                      <DropdownMenuItem
                        onSelect={() => setMediaCondition(null)}
                      >
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
                        sleeveCondition ? '' : 'text-muted-foreground',
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
                      <DropdownMenuItem
                        onSelect={() => setSleeveCondition(null)}
                      >
                        Clear
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Notes */}
            <div className='space-y-2'>
              <Textarea id='notes' name='notes' placeholder='Notes...' />
            </div>

            {state && state.ok === false && (
              <div className='rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive'>
                {state.error}
              </div>
            )}

            <div className='flex items-center justify-center gap-3'>
              <SubmitButton disabled={uploadingCover} />
              {uploadingCover ? (
                <span className='text-xs text-muted-foreground'>
                  Cover uploading…
                </span>
              ) : null}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
