import { init, login, search } from './functions/login.js'
import { loadUsers, saveUsers } from './functions/users.js'
import { handleWarning, handleMessage, handlePagination, handleWait, handleFinish, handleError } from './functions/utils.js'
import { main } from './functions/main.js'

async function start () {
  const { browser, page } = await init()
  await login(browser, page)
  await search(browser, page)
  const usersSet = await loadUsers()
  const messages = main(usersSet, page)

  for await (const state of messages) {
    switch (state) {
      case 'handleWarning':
        await handleWarning(page)
        break
      case 'handleMessage':
        await handleMessage(browser, page, state.user)
        break
      case 'handleUser':
        await saveUsers(browser, state.user, usersSet)
        break
      case 'handlePagination':
        await handlePagination(browser, page)
        break
      case 'handleWait':
        await handleWait(state.user, state.number)
        break
      case 'handleFinish':
        await handleFinish(browser, state.number)
        break
      case 'handleError':
        await handleError(browser, state.error)
        return
    }
  }
}

start()
