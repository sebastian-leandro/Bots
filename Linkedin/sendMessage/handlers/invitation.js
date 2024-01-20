import { ipcMain } from 'electron'
import { init, login, search } from '../functions/static/login.js'
import { loadUsers, saveUsers } from '../functions/static/users.js'
import { handleWarning, handleMessage, handlePagination, handleWait, handleFinish, handleError } from '../functions/static/utils.js'
import { main } from '../functions/connection/main.js'

export async function handleInvitation () {
  ipcMain.on('option1', async () => {
    const { browser, page } = await init()
    await login(browser, page)
    await search(browser, page)
    const usersSet = await loadUsers()
    const messages = main(usersSet, page)

    for await (const state of messages) {
      switch (state.action) {
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
  })
}
