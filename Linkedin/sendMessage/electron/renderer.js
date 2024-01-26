const { ipcRenderer } = require('electron')
const { existsSync } = require('fs')

const $ = selector => document.getElementById(selector)
let credentials = {}
let input

if (existsSync('./cookies/cookies.json')) {
  $('form').classList.add('hide')
  $('choose').classList.remove('hide')
} else {
  $('login').addEventListener('click', () => {
    const username = $('username').value
    const password = $('password').value

    if (!username || !password) {
      $('username').placeholder = 'Username is required'
      $('password').placeholder = 'Password is required'
    } else {
      credentials = { username, password }
      $('form').classList.add('hide')
      $('choose').classList.remove('hide')
    }
  })
}

$('option-1').addEventListener('click', () => {
  $('choose').classList.add('hide')
  $('inputSearch').classList.remove('hide')
  $('searchBtn').addEventListener('click', () => {
    if ($('search').value === '') {
      $('search').placeholder = 'Search is required'
    } else {
      input = $('search').value
      window.localStorage.setItem('search', input)
      ipcRenderer.send('invitations', credentials, input)
    }
  })
})

$('option-2').addEventListener('click', () => {
  ipcRenderer.send('messages', credentials)
})
