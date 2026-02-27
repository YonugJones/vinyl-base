import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { requireSession } from '@/server/auth/session'

// Keep uploads sane
const MAX_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])

export async function POST(req: Request) {
  await requireSession()

  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Unsupported file type. Use JPG, PNG, or WEBP.' },
      { status: 400 },
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'File too large (max 5MB).' },
      { status: 400 },
    )
  }

  // Put into a folder so it’s organized
  const pathname = `covers/${Date.now()}-${file.name}`

  const blob = await put(pathname, file, {
    access: 'public',
    addRandomSuffix: true, // prevents collisions
  })

  return NextResponse.json({ url: blob.url })
}
