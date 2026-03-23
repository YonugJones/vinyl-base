'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { searchDiscogs, type DiscogsResult } from '@/server/actions/discogs'

export function DiscogsSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [results, setResults] = useState<DiscogsResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        const data = await searchDiscogs(debouncedQuery)
        setResults(data)
      } catch {
        setError('Search failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [debouncedQuery])

  function handleSelect(result: DiscogsResult) {
    const params = new URLSearchParams({
      artist: result.artist,
      title: result.title,
      year: result.year?.toString() ?? '',
      label: result.label ?? '',
      format: result.format ?? '',
      coverArt: result.coverArt ?? '',
    })
    router.push(`/collection/new?${params}`)
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='relative mb-6'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search Discogs...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='pl-9'
        />
      </div>

      {loading && (
        <p className='text-sm text-muted-foreground text-center'>
          Searching...
        </p>
      )}

      {error && <p className='text-sm text-destructive text-center'>{error}</p>}

      {!loading && results.length === 0 && debouncedQuery && (
        <p className='text-sm text-muted-foreground text-center'>
          No results for &quot;{debouncedQuery}&quot;
        </p>
      )}

      <div className='flex flex-col gap-3'>
        {results.map((result) => (
          <Card
            key={result.discogsId}
            className='cursor-pointer hover:border-accent transition-colors'
            onClick={() => handleSelect(result)}
          >
            <CardContent className='flex items-center gap-4 p-4'>
              <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-muted'>
                {result.thumb ? (
                  <Image
                    src={result.thumb}
                    alt={result.title}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='h-full w-full bg-muted' />
                )}
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate font-medium'>{result.artist}</p>
                <p className='truncate text-sm text-muted-foreground'>
                  {result.title}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {[result.year, result.label, result.format]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
