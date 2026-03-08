import { getCopies } from '@/server/queries/collection'
import { CollectionView } from '@/components/collection/CollectionView'
import { requireSession } from '@/server/auth/session'

export default async function CollectionPage() {
  await requireSession()
  const copies = await getCopies()

  return (
    <main className='min-h-screen bg-background text-foreground px-6'>
      <CollectionView copies={copies} />
    </main>
  )
}
