import puppeteer from 'puppeteer'
import { selectors } from '../constants/variables.js'

export async function start () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50, args: ['--lang=en'] })
  const page = await browser.newPage()
  return { browser, page }
}

let counter = 0

export async function * main (page, usersSet) {
  while (counter < 200) {
    const btns = await page.$x(selectors.btnsPath)
    btns.shift()
    if (btns.length === 0) yield { action: 'scroll' }
    let flag = false
    for (const btn of btns) {
      const profileRaw = await btn.$x(selectors.profilePath)
      const profile = await page.evaluate(el => el.innerText, profileRaw[0])
      if (profile && !usersSet.has(profile)) {
        await btn.click()
        yield { action: 'warning' }
        counter++
        flag = true
        yield { action: 'saveUser', user: profile }
        yield { action: 'wait', number: counter, user: profile }
        yield { action: 'modal' }
        yield { action: 'finish', number: counter }
      }
    }
    const newBtns = await page.$x(selectors.btnsPath)
    if (!flag || newBtns.length < 2) yield { action: 'scroll' }
  }
}
