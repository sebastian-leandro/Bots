import { credentials, selectors } from '../../constants/variables.js'
import { wait, triggerFunction } from './timers.js'

export async function handleWarning (page) {
  try {
    const modal = await page.$(selectors.warningMessage)
    if (modal) {
      await page.click(selectors.warningMessage)
      await wait(3000, 1000)
    }
  } catch (err) {
    console.log('Modal Not Found')
  }
}

export async function handleMessage (browser, page, user) {
  try {
    await wait(2000, 1000)
    await page.click(selectors.modalBtn)
    await wait(2000, 1000)
    await page.type(selectors.message, `Hola buenos días ${user}. ${credentials.message}`)
    await wait(2000, 1000)
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
  if (counter === 99) {
    console.log('Already send 100 messages. Closing...')
    await browser.close()
    process.exit(0)
  }
}

export async function handleError (browser, err) {
  console.error('There was an error. Error: ', err)
  await browser.close()
  process.exit(1)
}
