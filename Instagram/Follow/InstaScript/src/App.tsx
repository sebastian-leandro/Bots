import { useState } from 'react'

function App (): React.ReactNode {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault()
    if (username.length < 5 || password.length < 5) {
      setError(true)
      return
    }
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className='w-full h-full grid place-content-center'>
        <h1 className='text-3xl text-center leading-8 font-bold'>InstaScript</h1>
        <p className='text-center mt-3 font-normal text-lg text-gray-400'>A simple way to follow throught Instagram platform</p>
        <div className='flex flex-col'>
          <form className='flex flex-col w-[450px] h-[480px] rounded-lg bg-white px-4 py-8 justify-start items-center border border-solid border-gray-950'>
            <div className='flex flex-col w-full h-full'>
              <input type="text" placeholder='Username' required className={`w-full h-[24px] rounded-lg ${error ? 'text-red-700' : 'text-gray-400'}`} onChange={handleUsername} aria-placeholder={error ? 'Username is required' : 'Username'} />
              <input type="password" placeholder='Password' required className={`w-full h-[24px] rounded-lg ${error ? 'text-red-700' : 'text-gray-400'}`} onChange={handlePassword} aria-placeholder={error ? 'Password is required' : 'Password'} />
            </div>
            <button className='bg-blue-500 text-white rounded-lg py-3 mt-3' onClick={handleSubmit}>Login</button>
          </form>
          {error && <div className='flex flex-col w-[220px] h-[140px] items-center justify-center'><p className='text-lg text-red-600'>Username and password is required</p></div>}
        </div>
      </div>
    </>
  )
}

export default App
