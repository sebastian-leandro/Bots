const { ipcRenderer } = require('electron')
const { existsSync } = require('fs')

const $ = selector => document.getElementById(selector)
let credentials = {}
let search

if (!existsSync('../cookies/cookies.json')) {
  $('form').classList.add('hide')
  $('choose').classList.remove('hide')
  search = window.localStorage.getItem('search')
  credentials = { search }
} else {
  $('login').addEventListener('click', () => {
    const username = $('username').value
    const password = $('password').value
    search = $('search').value

    if (!username || !password || !search) {
      $('username').placeholder = 'Username is required'
      $('password').placeholder = 'Password is required'
      $('search').placeholder = 'Search is required'
    } else {
      window.localStorage.setItem('search', search || '')
      credentials = { username, password }
      $('form').classList.add('hide')
      $('choose').classList.remove('hide')
    }
  })
}

$('option-1').addEventListener('click', () => {
  ipcRenderer.send('invitations', credentials)
})

$('option-2').addEventListener('click', () => {
  ipcRenderer.send('messages', credentials)
})
