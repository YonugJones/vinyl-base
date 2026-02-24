// server side form helper functions
export function mustString(
  value: FormDataEntryValue | null,
  field: string,
): string {
  if (typeof value !== 'string') throw new Error(`Missing ${field}`)
  const trimmed = value.trim()
  if (!trimmed) throw new Error(`Missing ${field}`)
  return trimmed
}

export function optionalString(
  value: FormDataEntryValue | null,
): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

export function optionalInt(value: FormDataEntryValue | null): number | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const n = Number.parseInt(trimmed, 10)
  return Number.isFinite(n) ? n : null
}

export function optionalDate(value: FormDataEntryValue | null): Date | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  const d = new Date(trimmed)
  return Number.isNaN(d.getDate()) ? null : d
}

export function checkboxToBool(value: FormDataEntryValue | null): boolean {
  if (typeof value !== 'string') return false
  return value === 'on' || value === 'true' || value == '1'
}

export function optionalEnum<T extends string>(
  value: FormDataEntryValue | null,
  allowed: readonly T[],
): T | null {
  if (typeof value !== 'string') return null
  if (!value) return null
  return (allowed as readonly string[]).includes(value) ? (value as T) : null
}

export function makeNormalizedKey(
  artist: string,
  title: string,
  year?: number | null,
) {
  const norm = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '') // strip diacritics
      .replace(/[^a-z0-9]+/g, ' ') // punctuation -> spaces
      .replace(/\s+/g, ' ')
      .trim()

  const y = year ? String(year) : ''
  return `${norm(artist)}|${norm(title)}|${y}`.trim()
}
