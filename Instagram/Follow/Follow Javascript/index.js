import { handleScroll, handleWarning, handleWait, handleFinish, handleError } from './functions/utils.js'
import { loadCookies, login, getFollowList } from './functions/login.js'
import { loadUsers, saveUsers } from './functions/users.js'
import { start, main } from './functions/main.js'

async function init () {
  const { browser, page } = await start()
  await loadCookies(page)
  await login(browser, page)
  await getFollowList(browser, page)
  const usersSet = await loadUsers()
  const followed = main(page, usersSet)

  for await (const state of followed) {
    switch (state.action) {
      case 'warning':
        await handleWarning(browser, page)
        break
      case 'saveUser':
        await saveUsers(browser, state.user, usersSet)
        break
      case 'wait':
        await handleWait(state.number, state.user)
        break
      case 'scroll':
        await handleScroll(browser, page)
        break
      case 'finish':
        await handleFinish(browser, state.number)
        break
      case 'error':
        await handleError(browser)
        break
    }
  }
}

init()
