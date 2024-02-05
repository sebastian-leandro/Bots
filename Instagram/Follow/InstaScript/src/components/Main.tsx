import { useState } from 'react'

import { Login, Info } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean>(false)

  return (
    <>
      {!logged && <Login setLogged={setLogged} />}
      {logged && <Info />}
    </>
  )
}

export default Main
