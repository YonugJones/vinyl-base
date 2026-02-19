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
