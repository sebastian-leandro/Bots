function centralTimer (max = 15000, min = 3000) {
  let rand = 0
  for (let i = 0; i < 6; i++) {
    rand += Math.random()
  }
  return Math.floor(rand / 6 * (max - min) + min)
}

export function wait (event, max, min, user, counter) {
  const waitingTime = centralTimer(max, min)
  if (user !== undefined && counter !== undefined) {
    const minutes = Math.floor(waitingTime / 60000)
    const seconds = Math.floor(waitingTime % 60000 / 1000)
    event.sender.send('invitations-data', { user, counter, minutes, seconds })
  }
  return new Promise((resolve) => setTimeout(resolve, waitingTime))
}

export function triggerFunction () { return Math.floor(Math.random() * 6) + 7 }
