import { credentials, selectors } from '../constants/variables'
import { wait, triggerFunction } from './timers'

export async function handleWarning (page) {
  const modal = await page.$(selectors.warningMessage)
  if (modal) {
    await page.click(selectors.warningButton)
  }
}

export async function handleMessage (browser, page, user) {
  try {
    await page.click(selectors.modalBtn)
    await wait()
    await page.type(selectors.message, `Hola buenos días ${user}. ${credentials.message}`)
    await wait()
    await page.click(selectors.sendBtn)
  } catch (err) {
    console.error('There was a problem trying to send the message. Error: ', err)
    await browser.close()
    process.exit(1)
  }
}

export async function handlePagination (browser, page) {
  try {
    await page.click(selectors.paginationBtn)
    await wait()
  } catch (err) {
    console.error('There was an error trying to change the page. Error: ', err)
    await browser.close()
    process.exit(1)
  }
}

let trigger = 0
let triggerValue = triggerFunction()

export async function handleWait (user, counter) {
  if (trigger !== 0 && trigger !== 1 && trigger % triggerValue === 0) {
    await wait(1000000, 500000, user, counter)
    triggerValue = triggerFunction()
    trigger = 0
  } else {
    await wait(60000, 30000, user, counter)
    trigger++
  }
}

export async function handleFinish (browser, counter) {
  if (counter === 200) {
    console.log('Already send 200 messages. Closing...')
    await browser.close()
    process.exit(0)
  }
}

export async function handleError (browser, err) {
  console.error('There was an error. Error: ', err)
  await browser.close()
  process.exit(1)
}
