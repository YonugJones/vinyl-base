import { CreateCopyForm } from '@/components/collection/CreateCopyForm'

type SearchParams = {
  artist?: string
  title?: string
  year?: string
  label?: string
  format?: string
  coverArt?: string
}

type Props = {
  searchParams: Promise<SearchParams>
}

export default async function NewCopyPage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className='flex justify-center mt-12'>
      <CreateCopyForm prefill={params} />
    </div>
  )
}
