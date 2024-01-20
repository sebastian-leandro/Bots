import puppeteer from 'puppeteer'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

import { wait } from './timers.js'
import { credentials, directions, globalSelectors, paths, messageSelectors } from '../../constants/variables.js'

const options = {
  headless: false,
  slowMo: 50,
  width: 1280,
  height: 720,
  lang: 'en'
}

export async function init () {
  const browser = await puppeteer.launch({
    headless: options.headless,
    slowMo: options.slowMo,
    args: [
      `--window-size=${options.width},${options.height}`,
      '--lang=en-US'
    ]
  })
  const page = await browser.newPage()
  await page.setViewport({ width: options.width, height: options.height })
  if (existsSync(paths.cookies)) {
    try {
      const cookiesStr = await readFile(paths.cookies, 'utf-8')
      const cookies = JSON.parse(cookiesStr)
      for (const cookie of cookies) {
        await page.setCookie(cookie)
      }
    } catch (err) { console.error(`There was an error loading the cookies. Error: ${err}`) }
  }
  return { browser, page }
}

async function isLoggedIn (page) {
  try {
    await page.goto(directions.main)
    await page.waitForSelector(globalSelectors.isLogged, { timeout: 5000, visible: true })
    return true
  } catch (err) { return false }
}

export async function login (browser, page) {
  const isLogged = await isLoggedIn(page)
  if (!isLogged) {
    if (credentials.username && credentials.password) {
      try {
        await page.type(globalSelectors.login, credentials.username)
        await page.type(globalSelectors.password, credentials.password)
        await page.keyboard.press('Enter')
        await wait()
        try {
          const cookiesStr = await page.cookies()
          const cookies = JSON.stringify(cookiesStr)
          await writeFile(paths.cookies, cookies, 'utf-8')
        } catch (err) { console.error(`Could't save the cookies. Error: ${err}`) }
      } catch (err) {
        console.error(`There was a problem trying to login. Error: ${err}`)
        await browser.close()
        process.exit(1)
      }
    } else {
      console.error("Username or password doesn't found inside the .env file")
      await browser.close()
      process.exit(1)
    }
  }
}

export async function search (browser, page) {
  try {
    await page.goto(directions.search)
    await wait()
  } catch (err) {
    console.error(`There was a problem trying to search. Error: ${err}`)
    await browser.close()
    process.exit(1)
  }
}

export async function searchMessages (browser, page) {
  try {
    await page.goto(directions.messages)
    await wait(2000, 1000)
    await page.click(messageSelectors.btnFilter)
    await wait(2000, 1000)
  } catch (err) {
    console.error(`There was a problem trying to search messages. Error: ${err}`)
    await browser.close()
    process.exit(1)
  }
}
