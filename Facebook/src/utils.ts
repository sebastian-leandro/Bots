import { type Page } from 'puppeteer'
import { config } from 'dotenv'

import { randomTimer } from './timers'
import { selectors } from '../constants/variables'

config()
const message = process.env.MESSAGE ?? ''

export async function handleModal (page: Page): Promise<undefined | boolean> {
  try {
    const modal = await page.$("div[aria-label='Cerrar chat']")
    if (modal !== null) {
      await modal.click()
    }
  } catch (err) { return false }
}

export async function handleScroll (page: Page): Promise<void> {
  await page.evaluate(() => {
    window.scrollBy(0, 300)
  })
  await randomTimer(5000, 3000)
}

export async function handleRecover (page: Page): Promise<object | null> {
  await randomTimer(2000, 1000)

  const titles = await page.evaluate((selector) => {
    const publicationTitle = document.querySelectorAll(selector)
    const publicationsTitlesArr = Array.from(publicationTitle)
    return publicationsTitlesArr[3]?.textContent ?? null
  }, selectors.title)

  const names = await page.evaluate((selector) => {
    const publicationName = document.querySelectorAll(selector)
    const publicationNameArr = Array.from(publicationName)
    return publicationNameArr[17]?.textContent ?? null
  }, selectors.name)

  return { title: titles, name: names }
}

export async function handleMessage (page: Page): Promise<void> {
  try {
    const msgArr = await page.$$(selectors.message)
    const msg = msgArr[1]
    await msg.type(message)
    await randomTimer(5000, 3000)
    const btn = await page.$$(selectors.sendMessage)
    await btn[1].click()
    await randomTimer(5000, 3000)
  } catch (err) {
    console.error(err)
  }
}
