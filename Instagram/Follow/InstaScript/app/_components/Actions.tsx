'use client'
import { useState } from 'react'

import { Button } from './ui/button'
import Modal from './Modal'
import Input from './Input'

function Actions ({ setFollowOrUnfollow }: { setFollowOrUnfollow: (value: boolean) => void }): React.ReactNode {
  const [searchInput, setSearchInput] = useState<string>('')
  const [action, setAction] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [follow, setFollow] = useState<boolean | undefined>(undefined)

  const performAction = async (action: string): Promise<void> => {
    const res = await fetch('http://localhost:1234/actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, searchInput })
    })
    if (!res.ok) throw new Error('Failed to perform action')
    const data = await res.json()
    if (data?.follow === 'follow') {
      setFollow(true)
      setFollowOrUnfollow(true)
    } else if (data?.follow === 'unfollow') {
      setFollow(false)
      setFollowOrUnfollow(false)
    } else {
      setError(true)
      setErrorMessage('An error occured. Please try again.')
    }
  }

  const handleAction = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const target = event.currentTarget.dataset.action
    try {
      if (target !== null && typeof target === 'string') {
        setAction(true)
        await performAction(target)
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
        {follow !== null && <Input search={() => setSearchInput} handleFollow={setFollowOrUnfollow} setError={setError} setErrorMessage={setErrorMessage} />}
        {error && <Modal onClose={setError} message={errorMessage} />}
      </section>

    </>
  )
}

export default Actions
