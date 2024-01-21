import { config } from 'dotenv'

config()
export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWD,
  message: process.env.MESSAGE
}

export const paths = {
  cookies: './cookies/cookies.json',
  invitationsUsers: './users/invitation/users.json',
  messagesUsers: './users/message/users.json'
}

export const directions = {
  main: 'https:linkedin.com',
  search: process.env.SEARCH,
  messages: 'https://www.linkedin.com/messaging/?'
}

export const globalSelectors = {
  isLogged: 'span.global-nav__primary-link-text',
  login: '#session_key',
  password: '#session_password'
}

export const invitationSelectors = {
  btns: "button[aria-label^='Invita a']:not([class*='msg-overlay'])",
  confirmBtn: 'button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1',
  profile: '../../../div[2]/div[1]/div[1]/div/span/span/a/span/span[1]',
  warningMessage: ".artdeco-button.ip-fuse-limit-alert__primary-action.artdeco-button--2.artdeco-button--primary.ember-view[aria-label='Entendido']",
  paginationBtn: 'button.artdeco-pagination__button.artdeco-pagination__button--next.artdeco-button.artdeco-button--muted.artdeco-button--icon-right.artdeco-button--1.artdeco-button--tertiary.ember-view'
}

export const messageSelectors = {
  btnFilter: 'a.ember-view.msg-conversations-container__compose-btn.artdeco-button.artdeco-button--circle.artdeco-button--tertiary.mr2.artdeco-button--muted',
  inputFilter: 'input.msg-connections-typeahead__search-field.msg-connections-typeahead__search-field--no-recipients.ml1.mv1.ph2',
  usersBtn: 'button.display-flex.flex-row.align-items-center.msg-connections-typeahead__search-result',
  invitationNotAccept: 'a.app-aware-link.artdeco-button.artdeco-button--premium.artdeco-button--secondary.full-width.premium-upsell-link--long.card-upsell__cta-link',
  inputMessage: 'div.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate',
  btnMessage: 'button.msg-form__send-button.artdeco-button.artdeco-button--1'
}
