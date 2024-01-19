import { config } from 'dotenv'

config()
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWD,
  message: process.env.MESSAGE
}

export const directions = {
  main: 'https:linkedin.com',
  search: process.env.SEARCH
}

export const selectors = {
  isLogged: 'span.global-nav__primary-link-text',
  login: '#session_key',
  password: '#session_password',
  btns: "button[aria-label^='Invita a']:not([class*='msg-overlay'])",
  profile: '../../../div[2]/div[1]/div[1]/div/span/span/a/span/span[1]',
  modalBtn: "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1[aria-label='Añadir una nota']",
  message: 'textarea.ember-text-area.ember-view.connect-button-send-invite__custom-message.mb3',
  sendBtn: 'button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1',
  warningMessage: ".artdeco-button.ip-fuse-limit-alert__primary-action.artdeco-button--2.artdeco-button--primary.ember-view[aria-label='Entendido']",
  paginationBtn: 'button.artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view'
}

export const paths = {
  cookies: './cookies/cookies.json',
  users: './users/users.json'
}
