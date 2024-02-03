import { invitationSelectors, messageSelectors } from '../../../constants/variables.js'
import { wait, triggerFunction } from './timers.js'

// In case we have a modal warning window we close the browser and notify about it.
export async function handleWarning (page, modal, btn) {
  try {
    const modalWindow = await page.$(modal)
    if (modalWindow) {
      await page.click(btn)
      await wait(3000, 1000)
    }
  } catch (err) {}
}

// A wait function with random waits.

let trigger = 0
let triggerValue = triggerFunction()

export async function handleWait (event, user, counter) {
  if (trigger !== 0 && trigger !== 1 && trigger % triggerValue === 0) {
    await wait(event, 1000000, 500000, user, counter)
    triggerValue = triggerFunction()
    trigger = 0
  } else {
    await wait(event, 60000, 30000, user, counter)
    trigger++
  }
}

export async function sendInvitation (browser, page) {
  try {
    await wait(3000, 1000)
    const confirm = await page.$(invitationSelectors.confirmBtn)
    if (confirm) { await confirm.click() }
    await wait(1000, 500)
  } catch (err) {
    console.error('There was an error trying to send the invitation. Error: ', err)
    await browser.close()
    process.exit(1)
  }
}

// For the connect invitations to change the pagination.

export async function handlePagination (browser, page) {
  try {
    const paginationBtn = await page.$(invitationSelectors.paginationBtn)
    if (paginationBtn) {
      await paginationBtn.click()
    } else {
      try {
        await page.evaluate(() => {
          window.scrollBy(0, 300)
        })
        await wait(3000, 1000)
      } catch (err) {
        console.error('There was an error trying to scroll down. Error: ', err)
        await browser.close()
        process.exit(1)
      }
    }
  } catch (err) {
    console.error('There was an error. Error: ', err)
    await browser.close()
    process.exit(1)
  }
}

export async function handleInput (browser, page) {
  try {
    await wait(3000, 1000)
    const users = await page.$$(messageSelectors.usersBtn)
    await users[0].click()
  } catch (err) {
    console.error('There was an error trying to click the user. Error: ', err)
    await browser.close()
    process.exit(1)
  }
  await wait(3000, 1000)
}

// For the Message function.

export async function handleSendMessage (browser, page, user, message) {
  try {
    const input = await page.$(messageSelectors.inputMessage)
    const username = user.split(' ', 1)
    const firstName = username[0]
    await input.type(`Hola buenos días ${firstName}. ${message}`)
    await wait(30000, 10000)
    try {
      const btn = await page.$(messageSelectors.btnMessage)
      await btn.click()
      await wait(50000, 30000)
    } catch (err) {
      console.error('There was an error trying to send the message. Error: ', err)
      await browser.close()
      process.exit(1)
    }
  } catch (err) {
    console.error('There was an error trying to send the message. Error: ', err)
    await browser.close()
    process.exit(1)
  }
}

// TO stop the bot in case we reach the the one hundred Connections or messages.

export async function handleFinish (browser, counter) {
  if (counter === 100) {
    console.log('Already send 100 invitations. Closing...')
    await browser.close()
    process.exit(0)
  }
}

// We handle any other error that could happen
export async function handleError (browser, err) {
  console.error('There was an error. Error: ', err)
  await browser.close()
  process.exit(1)
}
