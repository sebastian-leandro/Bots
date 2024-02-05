import { useState } from 'react'

import { Login, Search, Info } from '.'

function Main (): React.ReactNode {
  const [logged, setLogged] = useState<boolean>(false)
  const [search, setSearch] = useState<boolean>(false)

  return (
    <>
      {!logged && <Login setLogged={setLogged} />}
      {logged && !search && <Search setSearch={setSearch} />}
      {search && <Info />}
    </>
  )
}

export default Main
