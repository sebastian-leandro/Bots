import { type Browser, type Page } from 'puppeteer'
import { init, handleLogin, handleSearch } from './login'
import { main } from './main'

async function start (): Promise<void> {
  const { browser, page }: { browser: Browser, page: Page } = await init()
  await handleLogin(browser, page)
  await handleSearch(browser, page)

  const generator: AsyncGenerator<{ action: string, message?: string }, void, void> = main(page)

  for await (const state of generator) {
    switch (state.action) {
      case 'handleScroll':
        await page.evaluate(() => { window.scrollBy(0, 300) })
        break
      case 'handleModal':
        try {
          const modal = await page.$("div[aria-label='Cerrar chat']")
          if (modal !== null) {
            await modal.click()
          }
        } catch (err) { console.error(err) }
        break
      case 'handleError':
        console.error(state.message)
        await browser.close()
        process.exit(1)
    }
  }
}

start().catch(err => { console.error(err) })
