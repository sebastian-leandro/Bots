import { type Page } from 'puppeteer'
import { randomTimer } from './timers'
import { selectors } from '../constants/variables'
import { handleRecover } from './utils'
import { type AsyncGeneratorType } from '../types/types'

export async function * main (page: Page, usersList: Set<string>, titlesList: Set<string>): AsyncGenerator< AsyncGeneratorType, void, void > {
  let counter = 0
  while (counter < 100) {
    try {
      const publications = await page.$$(selectors.publication)
      publications.splice(0, 4)
      if (publications.length <= 0) { yield { action: 'handleScroll' } }
      for (const publication of publications) {
        await publication.click()
        await randomTimer(5000, 3000)
        const recover = await handleRecover(page) ?? { title: null, name: null }
        const { title, name }: { title: string | null, name: string | null } = recover as { title: string | null, name: string | null }
        if (title !== null && name !== null) {
          if (!usersList.has(name) && !titlesList.has(title)) {
            yield { action: 'handleMessage' }
            yield { action: 'saveUser', usersList, titlesList, user: name, titles: title }
            counter++
            console.log(counter)
            await page.click(selectors.close)
            await randomTimer(5000, 3000)
            yield { action: 'handleModal' }
            await randomTimer(5000, 3000)
          } else {
            await page.click(selectors.close)
            await randomTimer(5000, 3000)
          }
        } else {
          await page.click(selectors.close)
          await randomTimer(5000, 3000)
        }
      }
    } catch (err) { yield { action: 'handleError', message: err.message } }
  }
}
