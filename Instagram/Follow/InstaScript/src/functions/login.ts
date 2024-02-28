import puppeteer, { type Page } from 'puppeteer'
import { existsSync } from 'node:fs'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

import { directions, selectors, paths } from '../variables/selectors.js'
import { waitTime } from './timers.js'
import { type CookiesProps } from '@/types/types'

async function saveCookies (page: Page): Promise<void> {
  try {
    if (!existsSync(paths.cookies)) {
      const dirPath = dirname(paths.cookies)
      await mkdir(dirPath, { recursive: true })
    }
    const cookiesStr = await page.cookies()
    await writeFile(paths.cookies, JSON.stringify(cookiesStr), 'utf-8')
  } catch (err) { console.error('There was a problem trying to save the cookies. Error: ', err) }
}

async function loadCookies (page: Page): Promise<boolean> {
  if (existsSync(paths.cookies)) {
    try {
      const cookies: CookiesProps[] = JSON.parse(await readFile(paths.cookies, 'utf-8'))
      for (const cookie of cookies) {
        await page.setCookie(cookie)
      }
      return true
    } catch (err) { console.error('There was a problem trying to set the cookies: ', err) }
  }
  return false
}

export async function login (user: string, password: string): Promise<boolean> {
  const browser = await puppeteer.launch({ slowMo: 50, args: ['--lang=en-US'] })
  const page = await browser.newPage()
  await page.goto(directions.mainUrl)
  await waitTime()
  const logged = await loadCookies(page)
  if (!logged) {
    try {
      await page.type(selectors.loginEmail, user)
      await page.type(selectors.loginPassword, password)
      await page.keyboard.press('Enter')
      await waitTime()
      const isLoggin = await page.waitForSelector(selectors.isLogin, { timeout: 3000, visible: true })
      if (isLoggin !== null) {
        await saveCookies(page)
        await browser.close()
        return true
      } else {
        await browser.close()
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }
  return true
}
