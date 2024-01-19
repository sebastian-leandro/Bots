import { selectors } from '../constants/variables.js'

let counter = 0

export async function * main (usersSet, page) {
  while (counter < 100) {
    try {
      const btns = await page.$$(selectors.btns)
      for (const btn of btns) {
        const profile = await btn.$x()
        let flag = false
        if (profile) {
          const name = await page.evaluate(el => el.innerText, profile[0])
          if (name && !usersSet.has(name) && counter < 200) {
            try {
              await btn.click()
              yield { action: 'handleWarning' }
              yield { action: 'handleMessage', user: name }
              yield { action: 'handleUser', user: name }
              flag = true
              counter++
              yield { action: 'handlePagination' }
              yield { action: 'handleFinish', number: counter }
              yield { action: 'handleWait', user: name, number: counter }
            } catch (err) { yield { action: 'handleError', error: err.message } }
          }
        }
        const newBtn = await page.$$(selectors.btns)
        if (!newBtn || !flag) yield { action: 'handlePagination' }
      }
    } catch (err) { yield { action: 'handleError', error: err.message } }
  }
}
