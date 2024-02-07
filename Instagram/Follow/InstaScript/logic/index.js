import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import puppeteer, { Browser, Page } from "puppeteer";

const options = {
  headless: false,
  defaultViewport: null,
  slowMo: 125,
  args: ['--lang=en-US']
}

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time || 3000))

async function init () {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  if (existsSync('./cookies/cookies.json')) {
    const cookies = await readFile('./cookies/cookies.json', 'utf-8')
    const cookiesJSON = JSON.parse(cookies)
    for (const cookie of cookiesJSON) {
      await page.setCookie(cookie)
    }
  }
  return { browser, page }
}

async function isLoggedIn (page) {
  try {
    await page.waitForSelector('a[href="/accounts/logout/"]', { timeout: 1000 })
    return true
  } catch (err) { return false }
}

async function login (browser, page, username, password, account) {
  if (!isLoggedIn) {
    try {
      await page.type('input[name="username"]', username)
      await page.type('input[name="password"]', password)
      await page.click('button[type="submit"]')
      await wait(5000)
      try {
        const cookies = await page.cookies()
        await writeFile('./cookies/cookies.json', JSON.stringify(cookies, null, 2))
        await wait()
      } catch (err) { console.error('There was a problem trying to save the cookies. Error: ', err) }
      await page.goto('https://www.instagram.com/' + account)
      await wait(90000)
    } catch (err) {
      console.error(err)
      await browser.close()
      process.exit(1)
    }
  }
}

export async function handleInit (username, password, account) {
  const { browser, page } = await init()
  await login(browser, page, username, password, account)

}
