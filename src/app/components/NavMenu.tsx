'use client'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const ACTIVE_ROUTE = 'py-1 px-2 text-gray-300 bg-gray-700'
const INACTIVE_ROUTE =
  'py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700'

function AuthButton () {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div className='font-bold text-xl'>
          {session?.user?.name} <br />
        </div>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default function NavMenu () {
  const pathname = usePathname()
  return (
    <div className='flex justify-between'>
      <div className='flex gap-3 items-center px-5'>
        <AuthButton />
      </div>
      <hr className='my-4' />
      <ul className='flex gap-5'>
        <Link href='/'>
          <li className={pathname === '/' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href='/protected'>
          <li
            className={
              pathname === '/protected' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Khusus Sudah Login
          </li>
        </Link>
        <Link href='/seller'>
          <li
            className={pathname === '/seller' ? ACTIVE_ROUTE : INACTIVE_ROUTE}
          >
            Khusus Seller
          </li>
        </Link>
        <Link href='/buyer'>
          <li className={pathname === '/buyer' ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Khusus Buyer
          </li>
        </Link>
        <Link href='/apiFromClient'>
          <li
            className={
              pathname === '/apiFromClient' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link>
        <Link href='/apiFromServer'>
          <li
            className={
              pathname === '/apiFromServer' ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link>
      </ul>
    </div>
  )
}
