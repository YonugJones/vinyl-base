import { getCopies } from '@/server/queries/collection'
import { CopyCard } from '@/components/collection/CopyCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function CollectionPage() {
  const copies = await getCopies()

  return (
    <main className='min-h-screen bg-background text-foreground px-6'>
      <div className='pb-8 flex items-center justify-center'>
        <Link href='/collection/new'>
          <Button className='bg-accent hover:bg-accent/90 hover:cursor-pointer hover:text-white'>
            Add to collection
          </Button>
        </Link>
      </div>
      <div className='mx-auto grid max-w-7xl gap-4 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
        {copies.map((copy) => (
          <CopyCard key={copy.id} copy={copy} />
        ))}
      </div>
    </main>
  )
}
