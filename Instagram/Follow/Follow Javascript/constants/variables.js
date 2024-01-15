import { config } from 'dotenv'

// DOTENV

config()

export const credentials = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  account: process.env.ACCOUNT
}

// Selectors

export const selectors = {
  loginModalPath: 'div._a9-v', // Check login
  usernamePath: "input._aa4b._add6._ac4d[aria-label='Phone number, username, or email']", // Username to login
  passwordPath: "input._aa4b._add6._ac4d[aria-label='Password']", // Password to login
  linkPath: 'a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz._alvs._a6hd', // Link to the followers
  btnsPath: "//button[contains(@class, '_acan') and contains(@class, '_acap') and contains(@class, '_acas') and contains(@class, '_aj1-')][./div//div[text()='Follow']][not(./div//div[text()='Following'])]", // Follow button
  profilePath: '../../../div[2]/div/div/div/div/div/a/div/div/span', // User name path
  scrollPath: '._aano', // Scroll path
  warningPath: 'div._a9-v'
}

export const paths = {
  cookies: './cookies/cookies.json',
  users: './users/users.json',
  main: 'https://instagram.com/'
}
