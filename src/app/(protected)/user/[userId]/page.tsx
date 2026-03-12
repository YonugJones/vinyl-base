import { requireSession } from '@/server/auth/session'
import { getUser } from '@/server/queries/user'
import { UserDetails } from '@/components/user/UserDetails'
import { notFound } from 'next/navigation'

export default async function UserPage() {
  const { user } = await requireSession()
  const userDetails = await getUser(user.id)
  if (!userDetails) notFound()

  return (
    <div className='flex h-full items-center justify-center'>
      <UserDetails user={userDetails} />
    </div>
  )
}
