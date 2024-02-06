import { useState, useEffect } from 'react'

import { Modal } from '.'

interface InfoProps {
  src: string
  alt: string
  name: string
  username: string
  update: () => void
  edit: () => void
}

function Info ({ src, alt, name, username, update, edit }: InfoProps): React.ReactNode {
  const [active, setActive] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    const handleStart = async (): Promise<void> => {
      try {
        const response = await fetch('http://localhost:3001/src/api/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ active })
        })
        if (!response.ok) {
          setError(true)
          setMessage('An error occurred')
        } else {
          const data = await response.json()
          console.log(data)
        }
      } catch (err: any) {
        setError(true)
        setMessage(err.message as string)
        console.error(err)
      }
    }
    handleStart().catch((error) => { console.error(error) })
  }, [active])

  return (
    <>
      <section className='w-screen h-screen px-8 py-4'>
        <h3 className='title'>Info Panel</h3>
        <div className='grid grid-cols-5 gap-6'>
          <div className='card user'>
            <div className='flex flex-col gap-x-6 w-full h-full'>
              <h4 className='subtitle'>Latest Users Follow</h4>
              <p>Card 1 Content</ p>
            </div>
          </div>
          <div className='card counter'>
            <h4>Card 2</h4>
            <p>Card 2 Content</p>
          </div>
          <div className='card wait'>
            <h4>Card 3</h4>
            <p>Card 3 Content</p>
          </div>
          <div className='card config'>
            <h4 className='subtitle px-6'>Config</h4>
            <div className='flex flex-col px-6 gap-y-4 h-full mt-4'>
              <div className='flex gap-x-8 items-center justify-between'>
                <img src={src} alt={alt} className='w-12 h-12 rounded-full object-cover' />
                <h4 className='text-lg font-medium text-black'>{name}</h4>
                <button className='button' onClick={update}>Edit</button>
              </div>
              <div className='flex gap-x-8 items-center w-full h-full justify-between'>
                <img className='w-12 h-12 rounded-full object-cover' />
                <h4 className='text-lg font-medium text-black'>{username}</h4>
                <button className='button' onClick={edit}>Edit</button>
              </div>
            </div>
            <button onClick={() => { setActive(!active) }} className='button mx-auto'>{active ? 'Stop' : 'Run'}</button>
          </div>
        </div>
        {error && <Modal message={message} fn={(): void => { setError(false) }} />}
      </section>
    </>
  )
}

export default Info
