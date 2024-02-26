import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

export default async function ProtectedRoute () {
  const session = await getServerSession()
  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div>
        Protected page.
        <br />
        Kalo bisa lihat ini berarti sudah login
      </div>
    </div>
  )
}
