import { wait } from '../static/timers.js'
import { messageSelectors } from '../../constants/variables.js'

let counter = 0

export async function * main (invitationsSet, messagesSet, page) {
  const search = await page.$(messageSelectors.inputFilter)
  while (counter < 100) {
    try {
      if (search && invitationsSet.size > 0) {
        for (const invitation of invitationsSet) {
          if (!messagesSet.has(invitation)) {
            try {
              const user = await page.type(search, invitation)
              if (user) {
                try {
                  await wait()
                  user[0].click()
                  yield { action: 'handleWarning' }
                  yield { action: 'handleMessage', user: invitation }
                  yield { action: 'handleSave', user: invitation }
                  yield { action: 'handleFinish', number: counter }
                  counter++
                  yield { action: 'handleWait', user: invitation, number: counter }
                } catch (err) { yield { action: 'handleError', message: err.message } }
              }
            } catch (err) { yield { action: 'handleError', message: err.message } }
          }
        }
      }
    } catch (err) { yield { action: 'handleError', message: err.message } }
  }
}
