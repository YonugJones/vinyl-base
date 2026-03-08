'use client'

import { useMemo, useState } from 'react'
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

  return (
    <>
      <div className='flex items-center justify-between gap-2 mb-8'>
        <div className='flex'>
          <Link href='/collection/new'>
            <Button className='bg-accent hover:bg-accent/90 hover:cursor-pointer hover:text-white'>
              Add to collection
            </Button>
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='hover:cursor-pointer hover:text-foreground/70'
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
            className='hover:cursor-pointer'
            onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}
          >
            {direction === 'asc' ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>
      </div>

      <div className='mx-auto grid max-w-7xl gap-4 grid-cols-[repeat(auto-fill,minmax(170px,1fr))]'>
        {sortedCopies.map((copy) => (
          <CopyCard key={copy.id} copy={copy} />
        ))}
      </div>
    </>
  )
}
