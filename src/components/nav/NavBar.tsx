import Link from 'next/link'
import { Disc3, Eye, Gauge, LibraryBig, User } from 'lucide-react'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { getSession } from '@/server/auth/session'
import { getInitials } from '@/lib/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export async function NavBar() {
  const session = await getSession()
  const user = session?.user
  const initials = getInitials(user?.name ?? '?')

  return (
    <nav className='border-b'>
      <div className='h-15 flex items-center justify-between max-w-6xl mx-auto'>
        <Link href='/'>
          <div className='flex items-center text-5xl text-accent font-semibold tracking-tight'>
            <Disc3 size={45} />
            Vinyl-Base
          </div>
        </Link>
        <div className='flex items-center gap-2'>
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size='icon'
                    type='button'
                    className='
                      h-8 w-8 p-0 rounded-full
                      transition-all duration-200
                      hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-background
                      focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background
                    '
                  >
                    <Avatar className='h-8 w-8 shrink-0'>
                      <AvatarImage src={user.image ?? undefined} />
                      <AvatarFallback className='bg-primary text-primary-foreground'>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* Unclickable Summary */}
                  <div className='flex items-center gap-3 px-3 py-2'>
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className='bg-primary text-primary-foreground'>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='truncate text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='truncate text-xs text-muted-foreground'>
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href='/dashboard'
                      className='flex w-full items-center gap-2 px-3'
                    >
                      <Gauge />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href='/collection'
                      className='flex w-full items-center gap-2 px-3'
                    >
                      <LibraryBig />
                      Collection
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href='#'
                      className='flex w-full items-center gap-2 px-3'
                    >
                      <Eye />
                      Browse
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href={`/user/${user.id}`}
                      className='flex w-full items-center gap-2 px-3'
                    >
                      <User />
                      User
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant='ghost'>
                <Link href='/sign-in'>Sign in</Link>
              </Button>
              <Button asChild className='hover:bg-accent'>
                <Link href='/sign-up'>Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
