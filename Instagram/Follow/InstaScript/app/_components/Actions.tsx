'use client'
import { useState } from 'react'

import { Button } from './ui/button'
import Modal from './Modal'

function Actions (): React.ReactNode {
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const performAction = async (action: string): Promise<void> => {
    const res = await fetch('http://localhost:1234/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
    if (!res.ok) throw new Error('Failed to perform action')
  }

  const handleAction = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const action = event.currentTarget.dataset.action
    try {
      if (action !== null && typeof action === 'string') {
        await performAction(action)
      } else {
        throw new Error('Invalid action')
      }
    } catch (err) {
      setError(true)
      setErrorMessage(`There was a problem trying to do the: ${action} action. Error: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  return (
    <>
      <section className='w-full h-full grid place-items-center'>
        <h1 className='text-3xl font-bold'>What do you want to do</h1>
        <div className='max-w-[570px] bg py-16 w-full h-auto px-6 rounded-lg flex flex-col sm:flex-row'>
          <div className='w-full h-full flex flex-col items-center text-center justify-center gap-4'>
            <h3 className='text-1xl font-semibold'>Follow people from a user</h3>
            <p className='text-pretty text-sm'>You can follow people from the user that you want</p>
            <Button data-action='follow' variant={'default'} onClick={handleAction} className='mt-8 transition-colors duration-300'>Follow</Button>
          </div>
          <div className='w-full h-full flex flex-col text-center items-center justify-center gap-4'>
            <h3 className='text-1xl font-semibold'>Unfollow from your follow list</h3>
            <p className='text-pretty text-sm'>You can unfollow people from your own followers list</p>
            <Button data-action='unfollow' variant={'default'} onClick={handleAction} className='mt-8 transition-colors duration-300'>Unfollow</Button>
          </div>
        </div>
        {error && <Modal onClose={setError} message={errorMessage} />}
      </section>

    </>
  )
}

export default Actions
