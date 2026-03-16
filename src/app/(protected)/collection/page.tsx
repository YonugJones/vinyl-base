import { getCopies } from '@/server/queries/collection'
import { CollectionView } from '@/components/collection/CollectionView'
import { requireSession } from '@/server/auth/session'

export default async function CollectionPage() {
  const { user } = await requireSession()
  const copies = await getCopies(user.id)

  return (
    <>
      <CollectionView copies={copies} />
    </>
  )
}
