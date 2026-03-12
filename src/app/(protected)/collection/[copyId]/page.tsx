import { notFound } from 'next/navigation'
import { requireSession } from '@/server/auth/session'
import { getCopy } from '@/server/queries/collection'
import { CopyDetails } from '@/components/collection/CopyDetails'
import { DetailsButtonGroup } from '@/components/collection/DetailsButtonGroup'

type Params = { copyId: string }
type Props = { params: Promise<Params> }

export default async function CopyDetailsPage({ params }: Props) {
  await requireSession()
  const { copyId } = await params
  if (!copyId) notFound()

  const copy = await getCopy(copyId)
  if (!copy) notFound()

  return (
    <>
      <CopyDetails copy={copy} />
      <DetailsButtonGroup copyId={copyId} />
    </>
  )
}
