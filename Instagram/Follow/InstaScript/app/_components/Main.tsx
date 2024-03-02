'use client'
import { useState, useEffect } from 'react'

import { Login, Actions } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean | null>(null)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        const res = await fetch('http://localhost:1234/logged')
        const data = await res.json()
        if (data?.logged === true) {
          setLogged(true)
        } else {
          setLogged(false)
        }
      } catch (err) { console.error(err) }
    }
    checkLogin().catch(err => { console.error(err) })
  }, [])

  return (
    <>
      <section className='gradient-bg'>
        {(logged !== null && !logged) && (
        <Login
          username={username}
          password={password}
          error={error}
          message={message}
          success={success}
          loading={loading}
          setMessage={setMessage}
          setLoader={setLoading}
          setUsername={setUsername}
          setPassword={setPassword}
          logged={setLogged}
          setError={setError}
          setSuccess={setSuccess}
        />
        )}
        {(logged !== null && logged) && (
        <Actions
          logged={setLogged}
          profile={username}
        />
        )}
      </section>
    </>
  )
}

export default Main
