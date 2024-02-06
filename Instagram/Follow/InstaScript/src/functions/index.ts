import puppeteer, { type Browser, type Page } from 'puppeteer'

async function init (): Promise<{ browser: Browser, page: Page }> {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  const page = await browser.newPage()
  await page.goto('https://instagram.com')
  return { browser, page }
}

async function login (browser: Browser, page: Page, username: string, password: string): Promise<void> {
  try {
    await page.type('input[name="username"]', username)
    await page.type('input[name="password"]', password)
    await page.click('button[type="submit"]')
  } catch (err) {
    await browser.close()
    throw new Error('Error during login')
  }
}

export async function start (USER: string, PASSWD: string, ACCOUNT: string): Promise<void> {
  const { browser, page } = await init()
  await login(browser, page, USER, PASSWD)
  console.log(ACCOUNT)
}
