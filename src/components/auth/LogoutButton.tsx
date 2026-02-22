'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogout() {
    setLoading(true)
    setError(null)

    try {
      await authClient.signOut()

      router.push('/sign-in')
      router.refresh()
    } catch {
      setError('Logout error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant='ghost'
      size='sm'
      disabled={loading}
      className='w-full flex justify-start'
    >
      <LogOut />
      {loading ? 'Signing out...' : error ? error : 'Sign out'}
    </Button>
  )
}
