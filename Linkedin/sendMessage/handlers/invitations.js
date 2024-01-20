import { ipcMain } from 'electron'
import { init, login, search } from '../functions/static/login.js'
import { loadData, saveData } from '../functions/static/users.js'
import { handleWarning, handlePagination, handleWait, handleFinish, handleError } from '../functions/static/utils.js'
import { main } from '../functions/invitations/main.js'
import { paths, invitationSelectors } from '../constants/variables.js'

export async function handleInvitation () {
  ipcMain.on('invitations', async () => {
    const { browser, page } = await init()
    await login(browser, page)
    await search(browser, page)
    const invitationsSet = await loadData(paths.invitationsUsers)
    const invitations = main(invitationsSet, page)

    for await (const state of invitations) {
      switch (state.action) {
        case 'handleWarning':
          await handleWarning(page, invitationSelectors.warningMessage, invitationSelectors.warningMessage)
          break
        case 'handleUser':
          await saveData(browser, state.user, invitationsSet, paths.invitationsUsers)
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
