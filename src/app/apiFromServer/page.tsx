import { headers } from 'next/headers'

export default async function APIFromServer () {
  const resp = await fetch('http://localhost:3005/api/whoami', {
    method: 'GET',
    headers: headers()
  }).then(res => res.json())

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div>
        <div>
          API Route From <span className='font-bold underline'>Server</span>
        </div>
        <div>Name: {resp?.name}</div>
      </div>
    </div>
  )
}
