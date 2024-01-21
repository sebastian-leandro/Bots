import { messageSelectors } from '../../constants/variables.js'

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
            const warning = await page.$(messageSelectors.invitationNotAccept)
            if (warning === undefined || warning === null) {
              yield { action: 'handleWarning' }
              yield { action: 'handleMessage', user: invitation }
              yield { action: 'handleSave', user: invitation, invitationSet: invitationsSet, messageSet: messagesSet }
              yield { action: 'handleFinish', number: counter }
              yield { action: 'handleWait', user: invitation, number: counter }
              counter++
            }
          } catch (err) { yield { action: 'handleError', error: err.message } }
        }
      }
    } catch (err) { yield { action: 'handleError', error: err.message } }
  }
}
