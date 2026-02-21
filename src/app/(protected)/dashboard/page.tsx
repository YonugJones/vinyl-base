import { requireSession } from '@/server/auth/session'

export default async function DashboardPage() {
  const session = await requireSession()

  return <h1>{session.user.name}</h1>
}
