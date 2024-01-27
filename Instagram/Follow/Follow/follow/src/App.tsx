import { useState } from 'react'

import classes from './App.module.scss'

function App (): React.ReactNode {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value)
  }
  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }
  const handleLogin = async (): Promise<void> => {
    if (username === '' || password === '') {
      alert('Please fill in all fields')
      return
    }
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      setSuccess(true)
      console.log(data)
    } catch (error: any) {
      setError(`There was an error ${error}`)
      console.log(error)
    }
  }

  return (
    <>
      <section className={classes.wrapper}>
        <h1 className={classes.title}>Instagram Automation Tool</h1>
        <div className={classes.container}>
          <form>
            <input type="text" placeholder="Username" className={classes.input} onChange={handleUserChange} />
            <input type="password" placeholder="Password" className={classes.input} onChange={handlePassChange} />
            <button type='button' className={classes.btn} onClick={handleLogin}>Login</button>
          </form>
        </div>
        {success && <p className={classes.success}>Success</p>}
        {error !== null && <p className={classes.error}>{error}</p>}
      </section>
    </>
  )
}

export default App
