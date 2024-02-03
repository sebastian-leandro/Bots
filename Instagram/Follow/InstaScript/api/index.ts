import puppeteer, { type Browser, type Page, Puppeteer } from 'puppeteer'
import express from 'express'
import bodyParser from 'body-parser'
import existsSync from 'fs'
import { readFile, writeFile } from 'fs/promises'

const app = express()
const port = 3001

app.use(bodyParser.json())

app.post()

const username = 'sebasdsf'
const password = 'random555'

async function init (): Promise<object> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  if (existsSync('./cookies/cookies.json')) {
    const cookies = await readFile('./cookies/cookies.json', 'utf8')
    const deserializedCookies = JSON.parse(cookies)
    for (const cookie of deserializedCookies) {
      await page.setCookie(cookie)
    }
  }
  return { browser, page }
}

async function isLoggedIn (page: Page): Promise<boolean> {
  await page.goto('https://www.instagram.com/')
  await new Promise((resolve) => setTimeout(resolve, 5000))
  if (existsSync('./cookies/cookies.json')) {
    return true
  } else {
    return false
  }
}

async function login (browser, page): Promise<void> {
  const isLogged = await isLoggedIn(page)
  if (!isLogged) {
    try {
      await page.type('#username', username)
      await page.type('#password', password)
      await page.click('button[type="submit"]')
      await new Promise((resolve) => setTimeout(resolve, 5000))
      try {
        const cookies = await page.cookies()
        await writeFile('./cookies/cookies.json', JSON.stringify(cookies))
      } catch (err) { console.error(err) }
    } catch (err) { await browser.close() }
  }
}

(async () => {
  const { browser, page } = await init()
  await login(browser, page)
})().catch((err) => { console.error(err) })
