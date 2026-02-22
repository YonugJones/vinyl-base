import type { Metadata } from 'next'
import { NavBar } from '@/components/nav/NavBar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vinylbase',
  description: 'Keep track of and easily interact with your vinyl collection',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='dark bg-background text-foreground'>
        <NavBar />
        <main className='mx-auto max-w-6xl px-4 py-8'>{children}</main>
      </body>
    </html>
  )
}
