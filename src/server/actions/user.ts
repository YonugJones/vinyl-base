'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { requireSession } from '../auth/session'
import { mustString } from '@/lib/form'

type UserState = { ok: true } | { ok: false; error: string }

export async function editUser(
  _prevState: UserState | null,
  formData: FormData,
): Promise<UserState> {
  try {
    const session = await requireSession()
    const user = session.user

    const name = mustString(formData.get('name'), 'name')

    await prisma.user.update({
      where: { id: user.id },
      data: { name },
    })

    revalidatePath(`/user/${user.id}`)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed.' }
  }
}
