import { useState } from 'react'

function Login (): React.ReactNode {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [confirm, setConfirm] = useState<boolean>(false)

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault()

    if (username === '' || password === '') {
      setError(true)
      setMessage('Username and Password are required')
    } else {
      try {
        const response = await fetch('http://localhost:3001/src/components/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })

        if (response.ok) {
          setSuccess(true)
          setError(false)
        } else {
          const errorData = await response.json()
          console.log('Error:', errorData)
          setError(true)
          setMessage('Error logging in. Please try again.')
        }
      } catch (err) {
        console.error('Error sending data to the backend:', err)
        setError(true)
        setMessage('Error logging in. Please try again.')
      }
    }
  }

  return success
    ? (
        !confirm
          ? (
          <>
          <div className='grid w-full h-full bg-black/20 place-items-center absolute top-0 left-0'>
            <div className='w-80 h-56 flex items-center flex-col gap-y-4 justify-center rounded-lg shadow-sm shadow-black/50 bg-white/80 backdrop-blur-lg'>
              <p className='text-base text-black font-normal text-pretty'>Succesfully Login</p>
              <button className='button' onClick={(): void => { setConfirm(true) }}>Close</button>
            </div>
          </div>
        </>
            )
          : (
          <>
          </>
            )
      )
    : (
    <>
    <div className='w-full h-full grid place-content-center'>
      <h1 className='text-3xl text-center text-white font-bold mt-4'>InstaScript</h1>
      <p className='text-center mb-4 font-normal text-base text-white'>A simple way to follow throught Instagram platform</p>
      <div className='flex flex-col'>
        <form className='flex flex-col w-[360px] h-[420px] rounded-lg bg-white/55 backdrop-blur-lg px-4 py-8 justify-start items-center shadow-md shadow-white/80' >
          <div className='flex flex-col w-full h-full justify-center items-center gap-y-4'>
            <input type="text" placeholder={error ? 'Username is required' : 'Username'} required className={`input ${error ? 'error' : ''}`} onChange={handleUsername} />
            <input type="password" placeholder={error ? 'Password is required' : 'Password'} required className={`input ${error ? 'error' : ''}`} onChange={handlePassword} aria-placeholder={error ? 'Password is required' : 'Password'} />
          </div>
          <button className='button' onClick={handleSubmit}>Login</button>
        </form>
        {error && (
          <div className='w-screen h-screen absolute top-0 left-0 z-50 bg-black/20 grid place-items-center'>
            <div className='w-80 h-56 flex items-center flex-col gap-y-4 justify-center rounded-lg shadow-sm shadow-black/50 bg-white/80 backdrop-blur-lg'>
              <p className='text-base text-black font-normal text-pretty'>{message}</p>
              <button className='button' onClick={(): void => { setError(false) }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
      )
}

export default Login
