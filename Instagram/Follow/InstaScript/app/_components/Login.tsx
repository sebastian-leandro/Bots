'use client'
import { useState } from 'react'

import { Button } from './ui/button'
import { Modal } from '.'

function Login ({ logged }: { logged: (value: boolean) => void }): React.ReactNode {
  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>): void => { setUser(event.target.value) }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => { setPassword(event.target.value) }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const submitForm = async (): Promise<void> => {
      if (user.length < 4 || password.length < 4) {
        setError(true)
        setErrorMessage('Username and password must be at least 4 characters long.')
        return
      }
      try {
        const res = await fetch('http://localhost:1234/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user, password })
        })
        if (res.ok) {
          setError(false)
          logged(true)
        } else {
          const data = await res.json()
          setError(true)
          setErrorMessage(data?.message)
        }
      } catch (err) {
        setError(true)
        setErrorMessage('An error occurred. Please try again later.')
      }
    }
    submitForm().catch(err => { console.error(err) })
  }

  return (
    <>
      <section className='w-full h-full flex flex-col'>
        <div className='flex flex-col w-full h-fit mb-2 items-center justify-center mt-16'>
          <h1 className='text-3xl font-semibold'>InstaScript</h1>
          <p className='text-base text-pretty mt-2'>Automatize Your Instagram Account</p>
        </div>
        <div className='grid place-items-center w-full h-full'>
            <form onSubmit={handleSubmit} className='max-w-[420px] w-full h-full px-6 py-8 rounded-lg flex flex-col  bg-white/50 backdrop-blur-3xl shadow-sm shadow-white/20'>
            <h2 className='text-2xl font-semibold mb-4'>Login</h2>
            <div className='w-full h-full flex flex-col gap-y-6 items-center justify-center'>
              <input
              type='text'
              required
              placeholder='Username'
              onChange={handleUser}
              className='input'
              />
              <input
              type='password'
              required
              placeholder='Password'
              onChange={handlePassword}
              className='input'
              />
            </div>
            <Button type='submit' variant={'default'} className='mt-8 transition-colors duration-300'>Login</Button> 
          </form>
        </div>
        { error && <Modal message={errorMessage} onClose={() => { setError(false) }} /> }
      </section>
    </>
  )
}

export default Login
