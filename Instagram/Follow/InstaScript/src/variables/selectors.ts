import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = dirname(fileURLToPath(import.meta.url))

export const paths = {
  cookies: resolve(dir, '../../../cookies/cookies.json'),
  users: resolve(dir, '../../../users/users.json')
}

export const selectors = {
  loginEmail: "input[aria-label='Phone number, username, or email']",
  loginPassword: "input[aria-label='Password']",
  isLogin: 'section._aa55'
}

export const directions = {
  mainUrl: 'https://instagram.com'
}
