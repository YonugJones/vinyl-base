import { getCopy } from '@/server/queries/collection'
import { CopyDetails } from '@/components/collection/CopyDetails'
import { notFound } from 'next/navigation'

type Params = { copyId: string }
type Props = { params: Promise<Params> }

export default async function CopyDetailsPage({ params }: Props) {
  const { copyId } = await params
  if (!copyId) notFound()

  const copy = await getCopy(copyId)
  if (!copy) notFound()

  return <CopyDetails copy={copy} />
}
