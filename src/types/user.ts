export type UserDetails = {
  name: string | null
  id: string
  createdAt: Date
  email: string
  image: string | null
  _count: { copies: number }
}
