import { type TimerProps } from '../../types/types'

const timer = (max: number, min: number): number => {
  let rand: number = 0
  for (let i = 0; i < 6; i++) {
    rand += Math.random()
  }
  return Math.floor(rand / 6 * (max - min) + min)
}

export const waitTime = async (props?: TimerProps): Promise<number> => {
  const { max = 8000, min = 4000, user, counter } = props ?? {}
  const wait = timer(max, min)
  if (typeof user === 'string' && typeof counter === 'number') { console.log('User: ', user, 'Number: ', counter) }
  return await new Promise((resolve) => setTimeout(resolve, wait))
}
