'use client'
import { useState } from "react"

import Modal from "./Modal"

interface LoginProps {
  logged: (value: boolean) => void
  user: (value: string) => void
  acc: (value: string) => void
}


function Login ({logged, user, acc}: LoginProps): React.ReactNode {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [account, setAccount] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
  const handleAccount = (event: React.ChangeEvent<HTMLInputElement>) => setAccount(event.target.value)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, account })
      })
      if (res.ok) {
        user(username)
        acc(account)
        setError(false)
        logged(true)
        
      } else {
        setError(true)
        setErrorMessage('Invalid username or password')
      }

    } catch (err: any) {
      setError(true)
      setErrorMessage(err.message)
    }
  }

  return (
    <>
      <section className='w-full h-full'>
        <div className='flex flex-col w-full h-full sm:gap-y-8 items-center justify-center gap-y-4'>
          <div className='text-center'>
            <h1 className='text-3xl mb-1 text-white font-bold'>InstaScript</h1>
            <p className='text-base font-light text-pretty text-gray-200'>A simple way to follow on Instagram</p>
          </div>
          <form onSubmit={handleSubmit} className='max-w-[420px] h-fit rounded-lg  gap-y-8 flex flex-col py-20 px-6 w-full justify-center items-center bg-[rgba(255,255,255,0.5)] backdrop-blur-2xl'>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
              <input placeholder='Username' className='input' type='text' required onChange={handleEmail} />
              <input placeholder='Password' className='input' type='password' required onChange={handlePassword} />
              <input placeholder='Accout to follow' className='input' type='text' required  onChange={handleAccount}/>
            </div>
            <div className='flex w-full h-fit mb-4 items-center justify-center'>
              <button type='submit' className='btn'>Login</button>
            </div>
          </form>
        </div>
        {error && <Modal error={errorMessage} fn={setError} value={error} />}
      </section>
    </>
  )
}

export default Login
