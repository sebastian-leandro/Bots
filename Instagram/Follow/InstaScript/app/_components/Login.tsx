'use client'
import { useState } from 'react'
import Image from 'next/image'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Loader, Modal } from '.'

import type { LoginProps } from '@/types/types'

function Login ({ ...props }: LoginProps): React.ReactNode {
  const [visible, setVisible] = useState<boolean>(false)

  const {
    username,
    password,
    error,
    success,
    msg,
    loading,
    logged,
    setSuccess,
    setLoader,
    setError,
    setMessage,
    setUsername,
    setPassword
  } = props

  const errorHandler = (message: string): void => {
    setLoader(false)
    setError(true)
    setMessage(message)
  }

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>): void => { setUsername(event.target.value) }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => { setPassword(event.target.value) }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (username.length < 3 || password.length < 3) {
      errorHandler('Username and password must at least 3 characters long')
      return
    }
    setLoader(true)
    try {
      const res = await fetch('http://localhost:1234/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (res.headers.get('Content-type')?.includes('application/json')) {
        const data = await res.json()

        if (res.ok && data.logged) {
          const { token } = data
          localStorage.setItem('token', token as string)
          logged(true)
        } else {
          errorHandler(data.message as string ?? 'Login failed. Please try again.')
        }
      } else { errorHandler('Login failed. Please try again') }
    } catch (err) {
      errorHandler(`There was a problem. Please try again. ${err as string}`)
    } finally { setLoader(false) }
  }

  return (
    <>
      <section className='w-full h-full flex flex-col z-10'>
        <div className='flex flex-col w-full h-fit mb-1 items-center absolute top-0 left-0 right-0 justify-center mt-10'>
          <h1 className='title' style={{ fontSize: '1.6rem', fontWeight: '700' }}>InstaScript</h1>
          <p className='paragraph text-pretty mt-2'>Automatize Your Instagram Account</p>
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
            <Button type='submit' variant={'default'} className='mt-8 transition-colors duration-300'>Login</Button>
          </form>
        </div>
        { loading && (
          <Loader text='Login...' />
        )}
        { (error || success) && (
          <Modal
          message={msg}
          onErrorClose={setError}
          onSuccessClose={setSuccess}
          />
        )}
      </section>
    </>
  )
}

export default Login
