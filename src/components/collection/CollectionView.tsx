'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import type { CopyWithRelease } from '@/types/db'
import { CopyCard } from './CopyCard'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ArrowUp, ArrowDown } from 'lucide-react'

type FilterBy = 'artist' | 'title' | 'year' | 'label'
type Direction = 'asc' | 'desc'

const filterLabels: Record<FilterBy, string> = {
  artist: 'Artist',
  title: 'Title',
  year: 'Year',
  label: 'Label',
}

export function CollectionView({ copies }: { copies: CopyWithRelease[] }) {
  const [filterBy, setFilterBy] = useState<FilterBy>('artist')
  const [direction, setDirection] = useState<Direction>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const sortedCopies = useMemo(() => {
    return [...copies].sort((a, b) => {
      let aVal: string | number | null
      let bVal: string | number | null

      if (filterBy === 'artist') {
        aVal = a.release.artist.toLowerCase()
        bVal = b.release.artist.toLowerCase()
      } else if (filterBy === 'title') {
        aVal = a.release.title.toLowerCase()
        bVal = b.release.title.toLowerCase()
      } else if (filterBy === 'label') {
        aVal = (a.release.label ?? a.release.artist).toLowerCase()
        bVal = (b.release.label ?? b.release.artist).toLowerCase()
      } else {
        aVal = a.release.year ?? 0
        bVal = b.release.year ?? 0
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (bVal < aVal) return direction === 'asc' ? 1 : -1
      return 0
    })
  }, [copies, filterBy, direction])

  const filteredCopies = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim()
    if (!q) return sortedCopies
    return sortedCopies.filter((copy) => {
      return (
        copy.release.artist.toLowerCase().includes(q) ||
        copy.release.title.toLowerCase().includes(q) ||
        copy.release.label?.toLowerCase().includes(q)
      )
    })
  }, [sortedCopies, debouncedQuery])

  return (
    <>
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 mb-8'>
        <div className='flex justify-center sm:justify-start w-full sm:w-auto'>
          <Link href='/collection/new'>
            <Button className='bg-accent hover:bg-accent/90 hover:cursor-pointer hover:text-white'>
              Add to collection
            </Button>
          </Link>
        </div>
        <div className='flex items-center gap-2 sm:w-auto'>
          <Search />
          <Input
            placeholder='Search collection...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className='flex justify-center sm:justify-start items-center gap-2 w-full sm:w-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='hover:cursor-pointer hover:text-accent'
              >
                Filter by: {filterLabels[filterBy]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setFilterBy('artist')}>
                  Artist
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilterBy('title')}>
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilterBy('year')}>
                  Year
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setFilterBy('label')}>
                  Label
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant='outline'
            className='hover:cursor-pointer hover:text-accent'
            onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}
          >
            {direction === 'asc' ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>
      </div>

      {filteredCopies.length === 0 ? (
        <div className='flex flex-col items-center justify-center gap-3 py-24 text-center'>
          {searchQuery ? (
            <>
              <p className='text-lg font-medium'>
                No results for &quot;{debouncedQuery}&quot;
              </p>
              <p className='text-sm text-muted-foreground'>
                Try a different search term
              </p>
            </>
          ) : (
            <>
              <p className='text-lg font-medium'>Your collection is empty</p>
              <p className='text-sm text-muted-foreground'>
                Add your first record to get started
              </p>
              <Link href='/collection/new'>
                <Button className='bg-accent hover:bg-accent/90 hover:cursor-pointer hover:text-white'>
                  Add a record
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className='mx-auto grid max-w-7xl gap-4 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
          {filteredCopies.map((copy) => (
            <CopyCard key={copy.id} copy={copy} />
          ))}
        </div>
      )}
    </>
  )
}
