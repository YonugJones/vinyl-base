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

export default function SignInPage() {
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
      const res = await authClient.signIn.email({ email, password })

      if (res?.error) {
        setError(res.error.message ?? 'Invalid credentials.')
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
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to continue.</CardDescription>
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
                autoComplete='current-password'
                required
                minLength={12}
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
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className='justify-center text-sm text-muted-foreground'>
          <span>
            Don&apos;t have an account?{' '}
            <Link href='/sign-up' className='text-foreground hover:underline'>
              Sign up
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}
