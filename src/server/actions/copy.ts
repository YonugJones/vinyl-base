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

type CopyState = { ok: true } | { ok: false; error: string }

export async function createCopy(
  _prevState: CopyState | null,
  formData: FormData,
): Promise<CopyState> {
  try {
    const session = await requireSession()
    const user = session.user

    // --- Release fields (manual entry) ---
    const artist = mustString(formData.get('artist'), 'artist')
    const title = mustString(formData.get('title'), 'title')
    const year = optionalInt(formData.get('year'))
    const label = optionalString(formData.get('label'))
    const coverArt = optionalString(formData.get('coverArt'))

    const format = optionalEnum(formData.get('format'), Object.values(Format))
    const rpm = optionalEnum(formData.get('rpm'), Object.values(Rpm))

    const normalizedKey = makeNormalizedKey(artist, title, year)

    // Dedupe: upsert by unique normalizedKey
    const release = await prisma.release.upsert({
      where: { normalizedKey },
      create: {
        artist,
        title,
        year,
        label,
        coverArt,
        format,
        rpm,
        normalizedKey,
      },
      update: {
        artist,
        title,
        year,
        label,
        coverArt,
        format,
        rpm,
      },
      select: { id: true },
    })

    // --- Copy fields (manual entry) ---
    const purchaseDate = optionalDate(formData.get('purchaseDate'))

    const purchasePriceCents = optionalInt(formData.get('purchasePriceCents'))
    if (purchasePriceCents != null && purchasePriceCents < 0) {
      return { ok: false, error: 'Purchase price cannot be negative' }
    }

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

    await prisma.copy.create({
      data: {
        userId: user.id,
        releaseId: release.id,
        purchaseDate,
        purchasePriceCents,
        mediaCondition,
        sleeveCondition,
        notes,
        isFavorite,
        storageLocation,
      },
      select: { id: true },
    })

    revalidatePath('/collection')
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
}
