import { init, login, search } from './functions/login'
import { loadUsers, saveUsers } from './functions/users'

async function start () {
  const { browser, page } = await init()
  await login(browser, page)
  await search(browser, page)
  const users = await loadUsers()
}

start()
