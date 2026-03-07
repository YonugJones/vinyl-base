import { notFound } from 'next/navigation'
import { getCopy } from '@/server/queries/collection'
import { CopyDetails } from '@/components/collection/CopyDetails'
import { DeleteCopyButton } from '@/components/collection/DeleteCopyButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Params = { copyId: string }
type Props = { params: Promise<Params> }

export default async function CopyDetailsPage({ params }: Props) {
  const { copyId } = await params
  if (!copyId) notFound()

  const copy = await getCopy(copyId)
  if (!copy) notFound()

  return (
    <>
      <CopyDetails copy={copy} />
      {/* Button div */}
      <div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3'>
        <Link href='/collection'>
          <Button
            className='hover:cursor-pointer hover:text-muted-foreground w-full'
            variant='outline'
          >
            Back to collection
          </Button>
        </Link>
        <Link href={`/collection/${copyId}/edit`}>
          <Button className='hover:cursor-pointer hover:text-accent w-full'>
            Edit album
          </Button>
        </Link>
        <DeleteCopyButton copyId={copyId} />
      </div>
    </>
  )
}
