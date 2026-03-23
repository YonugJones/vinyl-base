import { requireSession } from '@/server/auth/session'
import { DiscogsSearch } from '@/components/browse/DiscogsSearch'

export default async function BrowsePage() {
  await requireSession()

  return (
    <main className='px-6 py-8'>
      <h1 className='text-2xl font-semibold text-center mb-8'>
        Search Discogs
      </h1>
      <DiscogsSearch />
    </main>
  )
}
