/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'
import { Modal } from '.'

function Search ({ setSearch }: { setSearch: (value: boolean) => void }): React.ReactNode {
  const [account, setAccount] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>): void => { setAccount(event.target.value) }

  const handleSearch = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:3001/src/api/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ account })
      })
      if (response.ok) {
        setSearch(true)
      } else {
        const errorData = await response.json()
        setError(true)
        setMessage(errorData.message as string)
      }
    } catch (err) {
      setError(true)
      setMessage('There was an error. Please try again.')
      console.error(err)
    }
  }

  return (
    <>
      <form
      className='flex flex-col w-[360px] h-[420px] rounded-lg bg-black/20  backdrop-blur-lg px-4 py-8 justify-start items-center shadow-md shadow-black/10'
      onSubmit={handleSearch}
      >
        <h3 className='text-3xl text-black font-semibold'>Account to follow</h3>
        <div className='flex flex-col w-full h-full items-center justify-center gap-y-4'>
          <input placeholder='Account' className='input' onChange={handleAccount} type='text' required />
          <button type='submit' className='button'>Search</button>
        </div>
      </form>
      {error && <Modal message={message} fn={() => { setError(false) }} /> }
    </>
  )
}

export default Search
