import { type Browser, type Page } from 'puppeteer'
import { init, handleLogin, handleSearch } from './login'
import { loadUser, saveUser } from './users'
import { handleModal, handleScroll, handleMessage } from './utils'
import { main } from './main'
import { paths } from '../constants/variables'
import { type AsyncGeneratorType } from '../types/types'

async function start (): Promise<void> {
  const { browser, page }: { browser: Browser, page: Page } = await init()
  await handleLogin(browser, page)
  await handleSearch(browser, page)
  const usersList: Set<string> = await loadUser(paths.usersPath)
  const titlesList: Set<string> = await loadUser(paths.titlesPath)

  const generator: AsyncGenerator<AsyncGeneratorType, void, void> = main(page, usersList, titlesList)

  for await (const state of generator) {
    switch (state.action) {
      case 'handleScroll': {
        await handleScroll(page)
        break
      }
      case 'handleModal': {
        await handleModal(page)
        break
      }
      case 'handleMessage': {
        await handleMessage(page)
        break
      }
      case 'saveUser' : {
        if (typeof state.user === 'string' && typeof state.titles === 'string') {
          await saveUser(paths.usersPath, usersList, state.user)
          await saveUser(paths.titlesPath, titlesList, state.titles)
        }
        break
      }
      case 'handleError' : {
        console.error(state.message)
        await browser.close()
        throw new Error(state.message)
      }
    }
  }
}

start().catch(err => { console.error(err) })
