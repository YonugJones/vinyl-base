import { getCopy } from '@/server/queries/collection'
import { CopyDetails } from '@/components/collection/CopyDetails'
import { notFound } from 'next/navigation'
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
      <div className='flex justify-center items-center mt-8'>
        <Link href='/collection'>
          <Button
            className='hover:cursor-pointer hover:text-foreground/50'
            variant='outline'
          >
            Back to collection
          </Button>
        </Link>
      </div>
    </>
  )
}
