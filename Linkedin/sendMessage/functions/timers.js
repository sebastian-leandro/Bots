function centralTimer (max = 15000, min = 3000) {
  let rand = 0
  for (let i = 0; i < 6; i++) {
    rand += Math.random()
  }
  return Math.floor(rand / 6 * (max - min) + min)
}

export function wait (max, min, user, counter) {
  const waitingTime = centralTimer(max, min)
  if (user !== undefined && counter !== undefined) {
    console.log(`- ${counter}, User: ${user}. Waiting for ${Math.floor(waitingTime / 60000)} minutes and ${Math.floor(waitingTime % 60000 / 1000)}`)
  }
  return new Promise((resolve) => setTimeout(resolve, waitingTime))
}
