import { Music } from 'lucide-react'

export function AlbumFallback() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-muted'>
      <Music className='h-6 w-6 text-muted-foreground' />
    </div>
  )
}
