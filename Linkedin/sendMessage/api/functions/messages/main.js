import { messageSelectors } from '../../../constants/variables.js'
import { wait } from '../static/timers.js'

let counter = 0

export async function * main (invitationsSet, messagesSet, page) {
  const search = await page.$(messageSelectors.inputFilter)
  while (counter < 100) {
    try {
      for (const invitation of invitationsSet) {
        if (!messagesSet.has(invitation) && counter < 100) {
          try {
            await search.type(invitation)
            yield { action: 'handleInput' }
            await wait(2000, 1000)
            const warning = await page.$(messageSelectors.invitationNotAccept)
            if (warning === undefined || warning === null) {
              yield { action: 'handleWarning' }
              yield { action: 'handleMessage', user: invitation }
              yield { action: 'handleSave', user: invitation, invitationSet: invitationsSet, messageSet: messagesSet }
              yield { action: 'handleFinish', number: counter }
              yield { action: 'handleWait', user: invitation, number: counter }
              counter++
            } else {
              const newMessage = await page.$(messageSelectors.btnFilter)
              if (newMessage) { await newMessage.click() }
            }
          } catch (err) { yield { action: 'handleError', error: err.message } }
        }
      }
    } catch (err) { yield { action: 'handleError', error: err.message } }
  }
}
