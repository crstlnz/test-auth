'use client'
import { useState, useEffect } from 'react'

export default function APITestPage () {
  const [name, setName] = useState<string>()

  useEffect(() => {
    fetch('/api/whoami')
      .then(res => res.json())
      .then(data => setName(data.name))
  }, [])

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div>
        <div>
          API Route From <span className='font-bold underline'>Client</span>
        </div>
        <div>Name: {name}</div>
      </div>
    </div>
  )
}
