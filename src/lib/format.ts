// UI formatting

export function formatEnum(value?: string | null) {
  if (!value) return '—'
  return value.replaceAll('_', ' ')
}

export function formatPrice(cents?: number | null) {
  if (cents == null) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100)
}

export function getInitials(name: string) {
  const trimmed = name.trim()
  if (!trimmed) return '?'

  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) {
    return parts[0][0].toUpperCase()
  }

  const first = parts[0][0] ?? ''
  const last = parts[parts.length - 1][0] ?? ''
  return (first + last).toUpperCase()
}
