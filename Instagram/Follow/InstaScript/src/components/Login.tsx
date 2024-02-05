/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react'

import Modal from './Modal'

function Login ({ setLogged }: { setLogged: (value: boolean) => void }): React.ReactNode {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:3001/src/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        setLogged(true)
      } else {
        const errorData = await response.json()
        setError(true)
        setMessage(errorData.message as string)
      }
    } catch (err) {
      console.error('Error sending data to the backend:', err)
      setError(true)
      setMessage('Error logging in. Please try again.')
    }
  }

  return (
        <>
        <div className='w-full h-full grid place-items-center'>
          <div className='flex flex-col'>
            <form className='flex flex-col w-[360px] h-[420px] rounded-lg bg-black/20  backdrop-blur-lg px-4 py-8 justify-start items-center shadow-md shadow-black/10'
            onSubmit={handleSubmit}
            >
              <div className='flex flex-col h-fit mx-auto'>
                <h1 className='text-3xl text-center text-black font-semibold'>InstaScript</h1>
                <p className='text-center font-normal text-small text-black'>A simple way to follow throught Instagram platform</p>
              </div>
              <div className='flex flex-col w-full h-full justify-center items-center gap-y-4'>
                <input type="text" placeholder={error ? 'Username is required' : 'Username'} required className={`input ${error ? 'error' : ''}`} onChange={handleUsername} />
                <input type="password" placeholder={error ? 'Password is required' : 'Password'} required className={`input ${error ? 'error' : ''}`} onChange={handlePassword} aria-placeholder={error ? 'Password is required' : 'Password'} />
              </div>
              <button className='button' type='submit' >Login</button>
            </form>
          </div>
          {error && <Modal message={message} fn={() => { setError(false) }} />}
        </div>
      </>
  )
}

export default Login
