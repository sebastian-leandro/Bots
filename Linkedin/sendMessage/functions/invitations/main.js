import { invitationSelectors } from '../../constants/variables.js'

export async function * main (usersSet, page) {
  let counter = 0
  while (counter < 100) {
    try {
      const btns = await page.$$(invitationSelectors.btns)
      if (btns.length === 0) { yield { action: 'handlePagination' } }
      for (const btn of btns) {
        const profile = await btn.$x(invitationSelectors.profile)
        const name = await page.evaluate(el => el.innerText, profile[0])
        let flag = false
        if (name && !usersSet.has(name) && counter < 100) {
          try {
            await btn.click()
            yield { action: 'handleInvitation' }
            yield { action: 'handleWarning' }
            yield { action: 'handleUser', user: name }
            counter++
            flag = true
            yield { action: 'handleFinish', number: counter }
            yield { action: 'handleWait', user: name, number: counter }
          } catch (err) { yield { action: 'handleError', error: err.message } }
        }
        const newbtns = await page.$$(invitationSelectors.btns)
        if (newbtns.length === 0 || !flag) yield { action: 'handlePagination' }
      }
    } catch (err) { yield { action: 'handleError', error: err.message } }
  }
}
