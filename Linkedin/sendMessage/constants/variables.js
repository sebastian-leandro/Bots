import { config } from 'dotenv'

config()
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWD,
  search: process.env.SEARCH,
  message: process.env.MESSAGE
}

export const directions = {
  main: 'https:linkedin.com'
}

export const selectors = {
  isLogged: '',
  login: '#session_key',
  password: '#session_password',
  btns: 'button.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view',
  profile: '../../../div[2]/div[1]/div[1]/div/span/span/a/span/span[1]',
  modalBtn: 'button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view mr1',
  message: 'textarea.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3',
  sendBtn: 'button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1',
  warningMessage: '',
  warningButton: '',
  paginationBtn: 'button.artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view'
}

export const paths = {
  cookies: './cookies/cookies.json',
  users: './users/users.json'
}
