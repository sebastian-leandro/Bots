import puppeteer, { type Browser, type Page } from 'puppeteer'
import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { selectors, paths } from '../constants/variables'
import { randomTimer } from './timers'
import { config } from 'dotenv'
import { type Init } from '../types/types'

config()
const EMAIL = process.env.EMAIL ?? ''
const PASSWORD = process.env.PASSWORD ?? ''
const SEARCH = process.env.SEARCH ?? ''

const options = {
  headless: false,
  defaultViewport: { width: 1280, height: 540 },
  slowMo: 100,
  args: ['--window-size=1360,760', '--lang=en-US']
}

export async function init (): Promise<Init> {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  if (existsSync(paths.cookiesPath)) {
    const cookies = JSON.parse(await readFile(paths.cookiesPath, 'utf-8'))
    for (const cookie of cookies) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await page.setCookie(cookie)
    }
  }
  return { browser, page }
}

async function isLoggedIn (page: Page): Promise<boolean> {
  await page.goto('https://www.facebook.com')
  await randomTimer(5000, 3000)
  try {
    await page.waitForSelector(selectors.isLogged, { timeout: 5000, visible: true })
    return true
  } catch (err) { return false }
}

export async function handleLogin (browser: Browser, page: Page): Promise<void> {
  const logged = await isLoggedIn(page)
  if (!logged) {
    try {
      await page.type(selectors.email, EMAIL)
      await page.type(selectors.password, PASSWORD)
      await page.click(selectors.loginButton)
      await randomTimer(5000, 3000)
      try {
        const cookies = await page.cookies()
        await writeFile(paths.cookiesPath, JSON.stringify(cookies, null, 2), 'utf-8')
        await randomTimer(5000, 3000)
      } catch (err) {
        console.error("Couldn't save cookies. Error: ", err)
      }
    } catch (err) {
      console.error(err)
      await browser.close()
      process.exit(1)
    }
  }
}

export async function handleSearch (browser: Browser, page: Page): Promise<void> {
  try {
    await page.goto(SEARCH)
    await randomTimer(5000, 3000)
  } catch (err) {
    console.error(err)
    await browser.close()
    process.exit(1)
  }
}
