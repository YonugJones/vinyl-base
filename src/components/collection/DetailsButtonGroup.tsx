import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteCopyButton } from '@/components/collection/DeleteCopyButton'

export function DetailsButtonGroup({ copyId }: { copyId: string }) {
  return (
    <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3'>
      <Link href='/collection'>
        <Button
          className='hover:cursor-pointer hover:text-accent w-full'
          variant='outline'
        >
          Back to collection
        </Button>
      </Link>
      <Link href={`/collection/${copyId}/edit`}>
        <Button className='hover:cursor-pointer hover:text-accent/70 w-full'>
          Edit album
        </Button>
      </Link>
      <DeleteCopyButton copyId={copyId} />
    </div>
  )
}
