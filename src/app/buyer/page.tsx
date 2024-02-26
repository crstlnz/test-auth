import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function ProtectedRoute () {
  const session = await getServerSession(authOptions)
  console.log('Halaman buyer', session?.user)
  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }
  const isBuyer = session?.user?.role === 'buyer'
  return (
    <div className='flex items-center justify-center min-h-screen'>
      {isBuyer ? (
        <div className='text-white bg-green-500 p-3'>
          Halaman khusus{' '}
          <span className='text-xl text-black font-bold'>BUYER</span>.
          <br />
          Kalo bisa lihat ini berarti kamu{' '}
          <span className='text-xl text-black font-bold'>BUYER</span>
        </div>
      ) : (
        <div className='text-white bg-red-500 p-3'>
          Kamu bukan <span className='text-xl text-black font-bold'>BUYER</span>{' '}
          bodo.
          <br />
          Kalo kau lihat ini berarti kamu bukan{' '}
          <span className='text-xl text-black font-bold'>BUYER</span>
        </div>
      )}
    </div>
  )
}
