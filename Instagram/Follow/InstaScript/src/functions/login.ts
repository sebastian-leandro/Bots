import puppeteer, { type Page } from 'puppeteer'

import https from 'https'
import { existsSync } from 'node:fs'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { directions, selectors, paths } from '../variables/selectors.js'
import { waitTime } from './timers.js'
import { type CookiesProps } from '../../types/types'

export const options = {
  slowMo: 50,
  args: ['--lang=en-US']
}

export async function login (user?: string, password?: string): Promise<boolean | { value: boolean, profile: string }> {
  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.goto(directions.mainUrl)
  await waitTime({ max: 2000, min: 1000 })
  const logged = await loadCookies(page)
  if (!logged) {
    try {
      if (user !== undefined && password !== undefined) {
        await page.type(selectors.loginEmail, user)
        await page.type(selectors.loginPassword, password)
        await page.keyboard.press('Enter')
        await waitTime({ max: 2000, min: 1000 })
        const isLoggin = await page.waitForSelector(selectors.isLogin, { timeout: 3000, visible: true })
        if (isLoggin !== null) {
          await getProfile(page, user)
          await saveCookies(page)
          await getProfile(page, user)
          await browser.close()
          return true
        } else {
          await browser.close()
          return false
        }
      } else {
        await browser.close()
        console.error('Username or password are undefined')
        return false
      }
    } catch (err) {
      console.error(err)
      return false
    }
  }
  return true
}

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

export async function getProfile (page: Page, user: string): Promise<void> {
  try {
    await page.goto(`${directions.mainUrl}/${user}`)
    await waitTime({ max: 3000, min: 2000 })
    const imgUrl = await page.evaluate((sel: string): string | undefined => {
      const img = document.querySelector(sel)
      if (img !== null && img instanceof HTMLImageElement) return img.src
      else return undefined
    }, selectors.profileImg)
    if (imgUrl) {
      await getImage(imgUrl)
    }
  } catch (err) { console.error('Could not get profile. Error: ', err) }
}

async function getImage (url: string | undefined): Promise<void> {
  const fileName = 'profile.jpg'
  try {
    const path = join(process.cwd(), 'public', 'assets')
    if (!existsSync(path)) await mkdir(path, { recursive: true })
    const filePath = join(path, fileName)

    if (typeof url === 'string') {
      await new Promise<void>((resolve, reject) => {
        https.get(url, (res) => {
          const data: Uint8Array[] = []
          res.on('data', (chunk: Uint8Array) => data.push(chunk))
          res.on('end', () => {
            writeFile(filePath, Buffer.concat(data)).then(resolve).catch((err) => { reject(err) })
          })
        }).on('error', (err) => { reject(err) })
      })
    }
  } catch (err) { console.error('Could not get profile image. Error: ', err) }
}
