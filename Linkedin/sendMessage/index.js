import { init, login, search } from './functions/login'

async function start () {
  const { browser, page } = await init()
  await login(browser, page)
  await search(browser, page)
}

start()
