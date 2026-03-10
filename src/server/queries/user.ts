import prisma from '@/lib/prisma'

export async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      _count: { select: { copies: true } },
    },
  })
}
