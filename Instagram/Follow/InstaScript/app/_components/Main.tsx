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

  function parseJwt (token: string): { username: string, iat: number, exp: number } | null {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))

      return JSON.parse(jsonPayload)
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const decoded = parseJwt(token)
          if (typeof decoded === 'object') { setUsername(decoded?.username ?? 'Anonymous') }
          const res = await fetch('http://localhost:1234/logged', { headers: { Authorization: `Bearer ${token}` } })

          if (!res.ok) throw new Error('Failed to authenticate')

          const data = await res.json()
          if (data.logged) {
            setSuccess(true)
            setMessage(data.message as string)
            setLogged(true)
          }
        } else { setLogged(false) }
      } catch (err) {
        console.error(err)
        setLogged(false)
      }
    }
    checkLogin().catch((err) => { console.error('There was an error checking the login', err) })
  }, [])

  return (
    <>
      <section className='gradient-bg'>
        {(logged !== null && !logged) && (
        <Login
          username={username}
          password={password}
          error={error}
          msg={message}
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
