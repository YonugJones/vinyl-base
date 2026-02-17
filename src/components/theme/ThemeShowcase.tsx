'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Mode = 'light' | 'dark'

function Swatch({
  title,
  className,
  description,
}: {
  title: string
  className: string
  description?: string
}) {
  return (
    <div className='space-y-2'>
      <div className='flex items-baseline justify-between'>
        <p className='text-sm font-medium'>{title}</p>
        {description ? (
          <p className='text-xs text-muted-foreground'>{description}</p>
        ) : null}
      </div>
      <div
        className={`h-12 w-full rounded-xl border border-border ${className}`}
      />
    </div>
  )
}

export function ThemeShowcase() {
  const [mode, setMode] = useState<Mode>('dark')

  // Wrap content so you can preview both modes without changing <html class="dark">.
  // Your @custom-variant dark (&:is(.dark *)) makes this work.
  const modeClass = mode === 'dark' ? 'dark' : ''

  return (
    <div className={modeClass}>
      <main className='min-h-screen bg-background text-foreground'>
        <div className='mx-auto max-w-5xl px-6 py-10'>
          {/* Header */}
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
            <div className='space-y-1'>
              <h1 className='text-3xl font-semibold tracking-tight'>
                Theme Showcase
              </h1>
              <p className='text-sm text-muted-foreground'>
                A quick lab to validate shadcn/Tailwind tokens while tuning{' '}
                <code className='rounded bg-muted px-1 py-0.5'>
                  globals.css
                </code>
                .
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant={mode === 'dark' ? 'default' : 'secondary'}
                onClick={() => setMode('dark')}
              >
                Dark
              </Button>
              <Button
                variant={mode === 'light' ? 'default' : 'secondary'}
                onClick={() => setMode('light')}
              >
                Light
              </Button>
            </div>
          </div>

          <Separator className='my-8' />

          {/* Token surfaces */}
          <div className='grid gap-6 md:grid-cols-2'>
            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle>Surfaces</CardTitle>
                <CardDescription>
                  Background, cards, popovers, borders, and muted text.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <Swatch
                  title='Background'
                  className='bg-background'
                  description='bg-background'
                />
                <Swatch
                  title='Card'
                  className='bg-card'
                  description='bg-card'
                />
                <Swatch
                  title='Muted'
                  className='bg-muted'
                  description='bg-muted'
                />
                <Swatch
                  title='Accent'
                  className='bg-accent'
                  description='bg-accent'
                />
                <Swatch
                  title='Destructive'
                  className='bg-destructive'
                  description='bg-destructive'
                />
              </CardContent>
            </Card>

            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>
                  Foreground + muted-foreground contrast checks.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-1'>
                  <p className='text-base font-medium'>Foreground text</p>
                  <p className='text-sm text-muted-foreground'>
                    Muted foreground text
                  </p>
                </div>

                <div className='rounded-xl border border-border bg-background p-4'>
                  <p className='text-sm'>
                    This is normal text on{' '}
                    <code className='rounded bg-muted px-1'>bg-background</code>
                    . Check readability and contrast.
                  </p>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    This is muted text. Make sure it’s not too faint.
                  </p>
                </div>

                <div className='rounded-xl bg-accent p-4 text-accent-foreground'>
                  <p className='text-sm font-medium'>Accent surface</p>
                  <p className='text-sm opacity-90'>
                    Text here uses{' '}
                    <code className='rounded bg-black/10 px-1'>
                      text-accent-foreground
                    </code>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className='my-8' />

          {/* Components */}
          <div className='grid gap-6 lg:grid-cols-2'>
            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>
                  Primary, secondary, outline, ghost, destructive.
                </CardDescription>
              </CardHeader>
              <CardContent className='flex flex-wrap gap-3'>
                <Button>Primary</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='outline'>Outline</Button>
                <Button variant='ghost'>Ghost</Button>
                <Button variant='destructive'>Destructive</Button>
                <Button disabled>Disabled</Button>
              </CardContent>
            </Card>

            <Card className='border-border bg-card'>
              <CardHeader>
                <CardTitle>Inputs</CardTitle>
                <CardDescription>
                  Input border, ring, focus style, and muted text.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='title'>Title</Label>
                  <Input id='title' placeholder='e.g., Kind of Blue' />
                  <p className='text-xs text-muted-foreground'>
                    Focus this input and confirm the ring/border colors feel
                    right.
                  </p>
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='artist'>Artist</Label>
                  <Input id='artist' placeholder='e.g., Miles Davis' />
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className='my-8' />

          {/* Badges / status */}
          <Card className='border-border bg-card'>
            <CardHeader>
              <CardTitle>Status & Accents</CardTitle>
              <CardDescription>
                Badges + a simple “notice” box using tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex flex-wrap gap-2'>
                <Badge>Default</Badge>
                <Badge variant='secondary'>Secondary</Badge>
                <Badge variant='outline'>Outline</Badge>
                <Badge className='bg-accent text-accent-foreground hover:bg-accent/90'>
                  Accent
                </Badge>
              </div>

              <div className='rounded-xl border border-border bg-background p-4'>
                <p className='text-sm font-medium'>Notice</p>
                <p className='mt-1 text-sm text-muted-foreground'>
                  This block uses{' '}
                  <code className='rounded bg-muted px-1'>bg-background</code>,{' '}
                  <code className='rounded bg-muted px-1'>border-border</code>,
                  and{' '}
                  <code className='rounded bg-muted px-1'>
                    text-muted-foreground
                  </code>
                  .
                </p>
              </div>
            </CardContent>
          </Card>

          <p className='mt-10 text-xs text-muted-foreground'>
            Tip: tweak <code className='rounded bg-muted px-1'>--accent</code>{' '}
            and <code className='rounded bg-muted px-1'>--ring</code> in{' '}
            <code className='rounded bg-muted px-1'>globals.css</code> and
            refresh.
          </p>
        </div>
      </main>
    </div>
  )
}
