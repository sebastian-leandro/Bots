import { timer, triggerFunction } from './timers.js'
import { selectors } from '../constants/variables.js'

export async function handleScroll (browser, page) {
  const scrollSelector = selectors.scrollPath
  if (scrollSelector) {
    try {
      await page.evaluate(selector => {
        const element = document.querySelector(selector)
        if (element) {
          element.scrollTop += 250
        }
      }, scrollSelector)
      await timer(1000, 4000)
    } catch (err) {
      console.error('There was a problem trying to scroll. Error: ', err)
      await browser.close()
      process.exit(1)
    }
  }
}

export async function handleWarning (browser, page) {
  await timer(2000, 1000)
  const warning = await page.$(selectors.warningPath)
  if (warning) {
    console.error('Warning message detected. Closing...')
    await browser.close()
    process.exit(1)
  }
}

export async function handleModal (browser, page) {
  const modal = await page.$(selectors.modalPath)
  if (modal) {
    const followersList = await page.$$(selectors.linkPath)
    if (followersList) {
      followersList[0].click()
      await timer()
    } else {
      console.error('Followers Link not founded. Check the selector')
      await browser.close()
      process.exit(1)
    }
  }
}

let trigger = 0
let triggerValue = triggerFunction()

export async function handleWait (number, user) {
  if (trigger !== 0 && trigger !== 1 && trigger % triggerValue === 0) {
    await timer(1000000, 500000, user, number)
    trigger = 0
    triggerValue = triggerFunction()
  } else {
    await timer(110000, 50000, user, number)
    trigger++
  }
}

export async function handleFinish (browser, number) {
  if (number === 200) {
    console.log('Already follow 200 users. Closing...')
    await browser.close()
    process.exit(0)
  }
}

export async function handleError (browser, error) {
  console.error(`There was a problem. Error: ${error}`)
  await browser.close()
  process.exit(1)
}
