import type { Copy, Release } from '@/generated/prisma'

export type CopyWithRelease = Copy & { release: Release }
