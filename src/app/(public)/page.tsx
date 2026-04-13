import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Pencil, Search, SlidersHorizontal } from 'lucide-react'
import { getSession } from '@/server/auth/session'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getSession()
  if (session) redirect('/collection')

  return (
    <>
      {/* Hero Section */}
      <section className='py-16 md:py-24'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight md:text-6xl'>
            Organize your vinyl collection
          </h1>
          <p className='mt-6 text-lg text-muted-foreground md:text-xl'>
            Track what you own, how it sounds, and what it&apos;s worth to you
          </p>

          <div className='mt-10 flex flex-col items-center gap-4'>
            <Button
              asChild
              size='lg'
              className='h-12 px-8 text-lg font-medium bg-accent hover:bg-accent/90'
            >
              <Link href='/sign-up'>Get started</Link>
            </Button>
            <p className='text-sm text-muted-foreground'>
              Totally free. Sign up in seconds.
            </p>
          </div>
        </div>
      </section>

      <section className='border-t py-16 md:py-24'>
        <div className='grid gap-12 md:grid-cols-3'>
          <div className='flex flex-col items-center'>
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
              <Search className='h-6 w-6 text-accent' />
            </div>
            <h3 className='mb-3 text-2xl font-semibold text-foreground'>
              Find records fast
            </h3>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
              <SlidersHorizontal className='h-6 w-6 text-accent' />
            </div>
            <h3 className='mb-3 text-2xl font-semibold text-foreground'>
              Sort and filter your collection
            </h3>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
              <Pencil className='h-6 w-6 text-accent' />
            </div>
            <h3 className='mb-3 text-2xl font-semibold text-foreground'>
              Track condition, price, and notes
            </h3>
          </div>
        </div>
      </section>
    </>
  )
}
