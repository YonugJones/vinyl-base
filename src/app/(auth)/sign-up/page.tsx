'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await authClient.signUp.email({
        email,
        password,
        name: 'Vinyl Lover',
      })

      if (res?.error) {
        setError(res.error.message ?? 'Failed to create account')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center p-4'>
      <Card className='w-full'>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Sign up to start cataloging your records.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                autoComplete='email'
                required
                disabled={loading}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(null)
                }}
                autoComplete='new-password'
                required
                minLength={12}
                disabled={loading}
              />
            </div>

            {error && (
              <div className='rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive'>
                {error}
              </div>
            )}

            <Button
              type='submit'
              className='mt-4 w-full bg-accent hover:bg-accent/80'
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='justify-center text-sm text-muted-foreground'>
          <span>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-foreground hover:underline'>
              Sign in
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
