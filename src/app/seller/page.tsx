import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function ProtectedRoute () {
  const session = await getServerSession(authOptions)
  console.log('Halaman seller', session?.user)
  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }
  const isSeller = session?.user?.role === 'seller'

  return (
    <div className='flex items-center justify-center min-h-screen'>
      {isSeller ? (
        <div className='text-white bg-green-500 p-3'>
          Halaman khusus{' '}
          <span className='text-xl font-bold text-black'>SELLER</span>.
          <br />
          Kalo bisa lihat ini berarti kamu{' '}
          <span className='text-xl font-bold text-black'>SELLER</span>
        </div>
      ) : (
        <div className='text-white bg-red-500 p-3'>
          Kamu bukan{' '}
          <span className='text-xl font-bold text-black'>SELLER</span> bodo.
          <br />
          Kalo kau lihat ini berarti kamu bukan{' '}
          <span className='text-xl font-bold text-black'>SELLER</span>
        </div>
      )}
    </div>
  )
}
