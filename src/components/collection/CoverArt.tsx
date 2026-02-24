'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  sizes?: string
  className?: string
  fallback: React.ReactNode
}

export function CoverArt({ src, alt, sizes, className, fallback }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) return <>{fallback}</>

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  )
}
