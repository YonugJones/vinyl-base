import prisma from '@/lib/prisma'
import type { CopyWithRelease } from '@/types/db'

export async function getCopies(): Promise<CopyWithRelease[]> {
  const copies = await prisma.copy.findMany({
    take: 64,
    orderBy: { createdAt: 'desc' },
    include: {
      release: true,
    },
  })

  return copies
}
