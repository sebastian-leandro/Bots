'use client'
import { useState, useEffect } from "react"

import { Login, Main } from "./_components"

export default function Home (): React.ReactNode {
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUser] = useState('')
  const [acc, setAcc] = useState('')
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch('http://localhost:3001/logged')
        const data = await response.json()
        if (data.logged) setIsLogged(true)
      } catch (err) { console.error(err) }
    }
    checkLogin()
  }, [])

  return (
    <>
      <main className='w-full h-full'>
        {!isLogged && <Login logged={setIsLogged} user={setUser} acc={setAcc} />}
        {isLogged && <Main user={username} account={acc} />}
      </main>
    </>
  )
}
