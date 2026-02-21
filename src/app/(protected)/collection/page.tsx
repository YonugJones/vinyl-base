import { getCopies } from '@/server/queries/collection'
import { CopyCard } from '@/components/collection/CopyCard'

export default async function CollectionPage() {
  const copies = await getCopies()

  return (
    <main className='min-h-screen bg-background text-foreground p-6'>
      <div className='mx-auto grid max-w-7xl gap-4 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
        {copies.map((copy) => (
          <CopyCard key={copy.id} copy={copy} />
        ))}
      </div>
    </main>
  )
}
