'use client'
import { useState, useEffect } from 'react'

import { Login, Actions } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean | undefined>(undefined)
  const [profileInfo, setProfileInfo] = useState<string>('')

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
        {(logged !== undefined && !logged) && <Login logged={setLogged} setProfile={setProfileInfo} />}
        {(logged !== undefined && logged) && <Actions logged={setLogged} profile={profileInfo} />}
      </section>
    </>
  )
}

export default Main
