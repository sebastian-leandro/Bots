'use client'
import { useState, useEffect } from 'react'
import { io, type Socket } from 'socket.io-client'

import { Actions, Login } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean>(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      try {
        const res = await fetch('http://localhost:1234/logged')
        const data = await res.json()
        if (data?.logged === true) {
          setLogged(true)
        }
      } catch (err) {
        console.error(err)
      }
    }
    checkLogin().catch(err => { console.error(err) })
  }, [])

  useEffect(() => {
    if (logged && socket === null) {
      const newSocket = io('http://localhost:1234', { autoConnect: false })
      setSocket(newSocket)
      newSocket?.connect()
    }
  }, [logged])

  useEffect(() => {
    return () => {
      if (socket !== null) {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [socket])

  return (
    <>
      <div className='gradient-bg'>
        {!logged && <Login logged={setLogged} />}
        {logged && <Actions />}
      </div>
    </>
  )
}

export default Main
