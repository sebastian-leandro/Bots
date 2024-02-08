'use client'
import { useState, useEffect } from 'react'

import { Login } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        const res = await fetch('http://localhost:1234/logged')
        const data = await res.json()
        if (data?.logged === true) setLogged(true)
      } catch (err) {
        console.error(err)
      }
    }
    checkLogin().catch(err => { console.error(err) })
  }, [])

  return (
    <>
      {!logged && <Login logged={setLogged} />}
    </>
  )
}

export default Main
