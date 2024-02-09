function centralTimer (max: number, min: number): number {
  let rand = 0
  for (let i = 0; i < 6; i++) {
    rand += Math.random()
  }
  return Math.floor(rand / 6 * (max - min) + min)
}

export async function randomTimer (max: number = 12000, min: number = 4000): Promise<void> {
  const delay = centralTimer(max, min)
  await new Promise((resolve) => setTimeout(resolve, delay))
}
