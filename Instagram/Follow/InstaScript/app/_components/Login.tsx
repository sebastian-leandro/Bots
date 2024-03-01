'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Modal, Loader } from '.'

import type { LoginProps } from '@/types/types'

function Login ({ logged, setProfile }: LoginProps): React.ReactNode {
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')

  const errorHandler = (message: string): void => {
    setLoading(false)
    setError(true)
    setErrorMessage(message)
  }

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>): void => { setUsername(event.target.value) }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => { setPassword(event.target.value) }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (username.length < 3 || password.length < 3) {
      errorHandler('Username and password must at least 3 characters long')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:1234/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok && data.logged as boolean) {
        setSuccess(true)
        setSuccessMessage(typeof data.message !== 'string' ? 'Login Successfully' : data.message as string)
        setProfile(username)
        logged(true)
      } else {
        errorHandler(typeof data.message === 'string' ? data.message as string : 'Login failed. Please try again')
      }
    } catch (err) {
      errorHandler(`There was a problem. Please try again. ${err as string}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className='w-full h-full flex flex-col z-10'>
        <div className='flex flex-col w-full h-fit mb-1 items-center absolute top-0 left-0 right-0 justify-center mt-10'>
          <h1 className='text-3xl font-semibold'>InstaScript</h1>
          <p className='text-base text-pretty mt-2'>Automatize Your Instagram Account</p>
        </div>
        <div className='grid place-items-center w-full h-full'>
            <form onSubmit={handleSubmit} className='max-w-[430px] mt-10 bg py-16 w-full h-auto px-6 rounded-lg flex flex-col'>
            <h2 className='text-2xl font-semibold mb-4'>Login</h2>
            <div className='w-full h-full flex flex-col gap-y-6 items-center justify-center'>
              <div className='relative inline-block h-fit w-full'>
                <Input
                required
                type='text'
                placeholder='Username'
                onChange={handleUser}
                className='focus:border focus:border-violet-400/90 border-solid duration-300'
                style={{ boxShadow: 'none', color: '#333' }}
                />
              </div>
              <div className='relative inline-block h-fit w-full'>
                <Input
                type={visible ? 'text' : 'password'}
                required
                placeholder='Password'
                onChange={handlePassword}
                className='focus:border focus:border-violet-400/90 border-solid duration-300'
                style={{ boxShadow: 'none', color: '#333' }}
                />
                <button
                type='button'
                onClick={() => { setVisible(!visible) }}
                className='absolute right-0 top-0 bottom-0 my-auto mr-2 cursor-pointer'
                >
                  {<Image src={visible ? 'visible.svg' : 'invisible.svg'} alt={visible ? 'Hide password image' : 'Show password image'} width={20} height={20} className='object-fit' />}
                </button>
              </div>
            </div>
            <Button type='submit' variant={'default'} className='mt-8 transition-colors duration-300'>Login </Button>
          </form>
        </div>
        { loading && <Loader text='Loading ...' /> }
        { (error || success) &&
          <Modal
          message={error ? errorMessage : successMessage}
          onClose={ error ? () => { setError(false) } : () => { setSuccess(false) }}
          />
        }
      </section>
    </>
  )
}

export default Login
