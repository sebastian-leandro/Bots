import { config } from 'dotenv'

config()
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWD,
  search: process.env.SEARCH,
  message: process.env.MESSAGE
}

export const directions = {
  main: '',
  search: ''
}

export const selectors = {
  isLogged: '',
  login: '',
  password: '',
  searchInput: ''
}

export const paths = {
  cookies: '',
  users: ''
}
