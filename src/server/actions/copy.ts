'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireSession } from '@/server/auth/session'
import { Condition, Format, Rpm } from '@/generated/prisma'
import {
  mustString,
  optionalString,
  optionalInt,
  optionalDate,
  checkboxToBool,
  optionalEnum,
  makeNormalizedKey,
} from '@/lib/form'
import { redirect } from 'next/navigation'

type CopyState = { ok: true } | { ok: false; error: string }

export async function createCopy(
  _prevState: CopyState | null,
  formData: FormData,
): Promise<CopyState> {
  try {
    const session = await requireSession()
    const user = session.user

    // --- Release fields (from Discogs) ---
    const artist = mustString(formData.get('artist'), 'artist')
    const title = mustString(formData.get('title'), 'title')
    const year = optionalInt(formData.get('year'))
    const label = optionalString(formData.get('label'))
    const coverArt = optionalString(formData.get('coverArt'))
    const format = optionalEnum(formData.get('format'), Object.values(Format))
    const discogsId = optionalInt(formData.get('discogsId'))
    const normalizedKey = makeNormalizedKey(artist, title, year)

    // find existing release by discogsId first, normalizedKey fallback
    let release = discogsId
      ? await prisma.release.findUnique({
          where: { discogsId },
          select: { id: true },
        })
      : await prisma.release.findUnique({
          where: { normalizedKey },
          select: { id: true },
        })

    // Create release if it doesn't exist
    if (!release) {
      release = await prisma.release.create({
        data: {
          artist,
          title,
          year,
          label,
          coverArt,
          format,
          discogsId,
          normalizedKey,
        },
        select: { id: true },
      })
    }

    // --- Copy fields (user's specific copy) ---
    const purchaseDate = optionalDate(formData.get('purchaseDate'))
    const purchasePriceCents = optionalInt(formData.get('purchasePriceCents'))
    if (purchasePriceCents != null && purchasePriceCents < 0) {
      return { ok: false, error: 'Purchase price cannot be negative' }
    }

    const rpm = optionalEnum(formData.get('rpm'), Object.values(Rpm))
    const mediaCondition = optionalEnum(
      formData.get('mediaCondition'),
      Object.values(Condition),
    )
    const sleeveCondition = optionalEnum(
      formData.get('sleeveCondition'),
      Object.values(Condition),
    )
    const notes = optionalString(formData.get('notes'))
    const isFavorite = checkboxToBool(formData.get('isFavorite'))
    const storageLocation = optionalString(formData.get('storageLocation'))

    // --- Create copy ---
    await prisma.copy.create({
      data: {
        userId: user.id,
        releaseId: release.id,
        purchaseDate,
        purchasePriceCents,
        rpm,
        mediaCondition,
        sleeveCondition,
        notes,
        isFavorite,
        storageLocation,
      },
      select: { id: true },
    })

    revalidatePath('/collection')
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
  redirect('/collection')
}

export async function editCopy(
  copyId: string,
  _prevState: CopyState | null,
  formData: FormData,
): Promise<CopyState> {
  try {
    const session = await requireSession()
    const user = session.user

    const copy = await prisma.copy.findUnique({
      where: { id: copyId, userId: user.id },
    })
    if (!copy) return { ok: false, error: 'Copy not found.' }

    // --- Copy fields only ---
    const purchaseDate = optionalDate(formData.get('purchaseDate'))
    const purchasePriceCents = optionalInt(formData.get('purchasePriceCents'))
    if (purchasePriceCents !== null && purchasePriceCents < 0) {
      return { ok: false, error: 'Purchase price cannot be negative' }
    }

    const rpm = optionalEnum(formData.get('rpm'), Object.values(Rpm))
    const mediaCondition = optionalEnum(
      formData.get('mediaCondition'),
      Object.values(Condition),
    )

    const sleeveCondition = optionalEnum(
      formData.get('sleeveCondition'),
      Object.values(Condition),
    )

    const notes = optionalString(formData.get('notes'))
    const isFavorite = checkboxToBool(formData.get('isFavorite'))
    const storageLocation = optionalString(formData.get('storageLocation'))

    // --- Update copy
    await prisma.copy.update({
      where: { id: copyId, userId: user.id },
      data: {
        purchaseDate,
        purchasePriceCents,
        rpm,
        mediaCondition,
        sleeveCondition,
        notes,
        isFavorite,
        storageLocation,
      },
    })

    revalidatePath('/collection')
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
  redirect(`/collection/${copyId}`)
}

export async function deleteCopy(copyId: string): Promise<CopyState> {
  try {
    const session = await requireSession()
    const user = session.user

    const copy = await prisma.copy.findUnique({
      where: { id: copyId, userId: user.id },
    })
    if (!copy) return { ok: false, error: 'Copy not found.' }

    await prisma.copy.delete({
      where: { id: copyId, userId: user.id },
    })

    revalidatePath('/collection')
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
  redirect('/collection')
}

export async function toggleIsFavorite(copyId: string): Promise<CopyState> {
  try {
    const session = await requireSession()
    const user = session.user

    const copy = await prisma.copy.findUnique({
      where: { id: copyId, userId: user.id },
      select: { isFavorite: true },
    })
    if (!copy) return { ok: false, error: 'Copy not found.' }

    await prisma.copy.update({
      where: { id: copyId, userId: user.id },
      data: { isFavorite: !copy.isFavorite },
    })

    revalidatePath('/collection')
    revalidatePath(`/collection/${copyId}`)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
}
