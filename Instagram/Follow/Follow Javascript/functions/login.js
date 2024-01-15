import { credentials, selectors, paths } from '../constants/variables.js'
import { timer } from './timers.js'
import { writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

// If exist load the cookies.

export async function loadCookies (page) {
  if (existsSync(paths.cookies)) {
    const cookiesStr = await readFile(paths.cookies, 'utf-8')
    const cookies = JSON.parse(cookiesStr)
    for await (const cookie of cookies) {
      await page.setCookie(cookie)
    }
  }
}

// Checking if we are logged in the page.

async function isLoggedIn (page) {
  try {
    await page.goto(paths.main)
    await timer()
    await page.waitForSelector(selectors.loginModalPath, { timeout: 5000, visible: true })
    return true
  } catch (e) { return false }
}

// In case we are not logged we login and save the cookies for the next time.

export async function login (browser, page) {
  const isLogged = await isLoggedIn(page)
  if (!isLogged) {
    if (credentials.username && credentials.password && credentials.username.length > 0 && credentials.password.length > 0) {
      try {
        await page.type(selectors.usernamePath, credentials.username)
        await page.type(selectors.passwordPath, credentials.password)
        await page.keyboard.press('Enter')
        await timer()
        try {
          const cookiesStr = await page.cookies()
          const cookies = JSON.stringify(cookiesStr)
          await writeFile(paths.cookies, cookies, 'utf-8')
        } catch (error) {
          console.error(`Error trying to save the cookies. Error: ${error}`)
        }
      } catch (error) {
        console.error(`It was a problem trying to login, closing the browser. Error: ${error}`)
        await browser.close()
        process.exit(1)
      }
    } else {
      console.error('Unable to login, the credentials are empty or are invalid.')
      await browser.close()
      process.exit(1)
    }
  }
}

// Go to the followers list.

export async function getFollowList (browser, page) {
  if (credentials.account && credentials.account.length > 0) {
    try {
      await page.goto(`${paths.main}/${credentials.account}/`)
      await timer()
      const followersList = await page.$$(selectors.linkPath)
      if (followersList) {
        followersList[0].click()
        await timer()
      } else {
        console.error('Followers Link not founded. Check the selector')
        await browser.close()
        process.exit(1)
      }
    } catch (error) {
      console.error(`It was a problem trying to go to the user account: ${error}`)
      await browser.close()
      process.exit(1)
    }
  }
}
