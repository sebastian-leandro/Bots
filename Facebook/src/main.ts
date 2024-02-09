import { type Page } from 'puppeteer'
import { randomTimer } from './timers'
import { selectors } from '../constants/variables'
import { config } from 'dotenv'

config()
const message = process.env.MESSAGE ?? ''

export async function * main (page: Page): AsyncGenerator<{ action: string, message?: string }, void, void> {
  let counter = 0
  while (counter < 100) {
    try {
      const publications = await page.$$(selectors.publication)
      if (publications.length <= 0) { yield { action: 'handleScroll' } }
      for (const publication of publications) {
        await publication.click()
        await randomTimer(5000, 3000)
        const msgArr = await page.$$(selectors.message)
        const msg = msgArr[1]
        await msg.type(message)
        await randomTimer(5000, 3000)
        const btn = await page.$$(selectors.sendMessage)
        await btn[1].click()
        await randomTimer(5000, 3000)
        await page.click(selectors.close)
        await randomTimer(7000, 4000)
        yield { action: 'handleModal' }
        counter++
        console.log(counter)
        await randomTimer(5000, 3000)
      }
    } catch (err) {
      yield { action: 'handleError', message: err.message }
    }
  }
}
