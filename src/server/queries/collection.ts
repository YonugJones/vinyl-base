import prisma from '@/lib/prisma'
import type { CopyWithRelease } from '@/types/db'

export async function getCopies(userId: string): Promise<CopyWithRelease[]> {
  return prisma.copy.findMany({
    where: { userId },
    take: 64,
    orderBy: { createdAt: 'desc' },
    include: { release: true },
  })
}

export async function getCopy(copyId: string): Promise<CopyWithRelease | null> {
  return prisma.copy.findUnique({
    where: { id: copyId },
    include: { release: true },
  })
}
