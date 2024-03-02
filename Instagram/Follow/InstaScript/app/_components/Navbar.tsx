'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Button } from './ui/button'

function Navbar ({ username, logged }: { username: string, logged: (value: boolean) => void }): React.ReactNode {
  const [src, setSrc] = useState<string>('/assets/profile.jpg')
  const handleLogout = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:1234/logout')
      if (res.ok) { logged(false) }
      console.error(res.status)
    } catch (err) { console.error(err) }
  }

  return (
      <nav className='fixed top-0 left-0 w-full py-2 px-4 flex items-center justify-between bg-black/40'>
        <div className='w-full flex items-center h-full justify-center'>
          <h3 className='text-2xl font-medium'>InstaScript</h3>
        </div>
        <div className='flex w-full justify-end mr-8 gap-x-4 items-center h-full'>
          <Image src={src} onError={() => { setSrc('/random.svg') }} alt='Profile picture' className='rounded-full object-contain' width={48} height={48} />
          <span className='text-1xl font-medium'>{username}</span>
        </div>
        <div className='w-fit flex items-center h-full justify-center'>
          <Button variant={'default'} onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
  )
}

export default Navbar
