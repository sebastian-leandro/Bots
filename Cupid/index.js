  import { config } from 'dotenv'
  import { selectors, paths } from './selectors.js'
  import { existsSync } from 'fs'
  import { readFile, writeFile } from 'fs/promises'
  import puppeteer from 'puppeteer'

  config()
  const username = process.env.USERNAME
  const password = process.env.PASSWORD
  const message = process.env.MESSAGE

  const timer = () => new Promise((resolve) => setTimeout(resolve, 10000))
  const options = {
    headless: false,
    slowMo: 100,
    args: ['--lang=en-US', '--window-size=1280,720'],
    defaultViewport: { width: 1280, height: 720 }
  }


  async function Init () {
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()
    if (existsSync(paths.cookies)) {
      try {
        const cookies = await readFile(paths.cookies, 'utf-8')
        const parse = await JSON.parse(cookies)
        for (const cookie of parse) {
          await page.setCookie(cookie)
        }
      } catch (err) { console.error(err) }
    }
    return { browser, page }
  }

  async function isLoggedIn (page) {
    await page.goto('https://www.okcupid.com')
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      await page.click(selectors.modal) 
      await page.waitForSelector(selectors.isLogged, { timeout: 5000, visible: true })
      return true
    } catch (err) { return false }
  }

  async function login (browser, page){
    const logged = await isLoggedIn(page)
    if (!logged) {
      try {
        await page.click(selectors.login)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.type(selectors.usernameInput, username)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.type(selectors.passwordInput, password)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.evaluate(() => {
          const button = document.querySelectorAll('button.login-actions-button')
          button[0].click()
        }, selectors.loginButton)
        await timer()
        try {
          const cookies = await page.cookies()
          const json = JSON.stringify(cookies)
          await writeFile(paths.cookies, json, 'utf-8')
        } catch (err) { console.error(err) }
      } catch (err) {
        console.error(err)
        await browser.close()
        process.exit(1)
      }
    }
  }

  async function main (browser, page) {
    let counter = 0
    while (counter < 100) {
      try {  
        const btn = await page.$(selectors.profileButton)
        await btn.click()
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const like = await page.$(selectors.like)
        await like.click()
        await new Promise((resolve) => setTimeout(resolve, 3000))
        const messageBtn = await page.$(selectors.message)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await messageBtn.click()
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.type('#messenger-composer', message)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.click(selectors.sendMessage)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.click(selectors.close)
        await new Promise((resolve) => setTimeout(resolve, 3000))
        await page.click(selectors.back)
        counter++
        await timer()
      } catch (err) {
        console.error(err)
        await browser.close()
        process.exit(1)
      }
    }
  }

  async function start () {
    const { browser, page } = await Init()
    await login(browser, page)
    await main(browser, page)
  }

  start()
