import { EditCopyForm } from '@/components/collection/EditCopyForm'
import { notFound } from 'next/navigation'
import { getCopy } from '@/server/queries/collection'

type Params = { copyId: string }
type Props = { params: Promise<Params> }

export default async function EditCopyPage({ params }: Props) {
  const { copyId } = await params
  if (!copyId) notFound()

  const copy = await getCopy(copyId)
  if (!copy) notFound()

  return (
    <div className='flex justify-center mt-12'>
      <EditCopyForm copy={copy} />
    </div>
  )
}
