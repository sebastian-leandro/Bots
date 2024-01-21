import { ipcMain } from 'electron'

import { paths } from '../constants/variables.js'
import { init, login, searchMessages } from '../functions/static/login.js'
import { loadData, saveData } from '../functions/static/users.js'
import { handleInput, handleWarning, handleSendMessage, handleWait, handleFinish, handleError } from '../functions/static/utils.js'
import { main } from '../functions/messages/main.js'

export async function handleMessage () {
  ipcMain.on('messages', async () => {
    const { browser, page } = await init()
    await login(browser, page)
    await searchMessages(browser, page)
    const invitationsSet = await loadData(paths.invitationsUsers)
    const messagesSet = await loadData(paths.messagesUsers)
    const messages = main(invitationsSet, messagesSet, page)

    for await (const state of messages) {
      switch (state.action) {
        case 'handleInput':
          await handleInput(page)
          break
        case 'handleWarning':
          await handleWarning(page)
          break
        case 'handleSendMessage':
          await handleSendMessage(browser, page, state.user)
          break
        case 'handleSave':
          await saveData(browser, state.user, messagesSet, paths.messagesUsers)
          break
        case 'handleFinish':
          await handleFinish(browser, state.number)
          break
        case 'handleWait':
          await handleWait(state.user, state.number)
          break
        case 'handleError':
          await handleError(browser, state.error)
          return
      }
    }
  })
}
