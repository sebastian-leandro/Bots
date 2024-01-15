export const randomTime = (max = 17000, min = 3000) => {
  let rand = 0
  for (let i = 0; i < 6; i++) {
    rand += Math.random()
  }
  return Math.floor(rand / 6 * (max - min) + min)
}

export const timer = (max, min, user, number) => {
  const waitTime = randomTime(max, min)
  if (user !== undefined && number !== undefined) {
    console.log(`${number} - User: ${user}. Waiting for ${Math.floor(waitTime / 60000)} minutes and ${Math.floor(waitTime % 60000 / 1000)} seconds`)
  }
  return new Promise((resolve) => setTimeout(resolve, waitTime))
}

export const triggerFunction = () => Math.floor(Math.random() * 6) + 7
