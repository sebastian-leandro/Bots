const { ipcRenderer } = require('electron')
const { existsSync } = require('fs')
const fs = require('fs').promises

const $ = selector => document.getElementById(selector)
let credentials = {}
let input
let message

const folder = './cookies'

fs.readdir(folder)
  .catch((err) => {
    if (err.code === 'ENOENT') {
      return fs.mkdir(folder, { recursive: true })
    }
    throw err
  })
  .then(() => console.log('La carpeta existe o fue creada exitosamente.'))
  .catch((err) => console.error('Error:', err))

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
      ipcRenderer.send('invitations', credentials, input)
    }
  })
})

$('option-2').addEventListener('click', () => {
  $('choose').classList.add('hide')
  $('message').classList.remove('hide')
  $('messageBtn').addEventListener('click', () => {
    if ($('messageInput').value === '') {
      $('messageInput').placeholder = 'Message is required'
    } else {
      message = $('messageInput').value
      ipcRenderer.send('messages', credentials, message)
    }
  })
})
