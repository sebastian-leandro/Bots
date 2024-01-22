const { ipcRenderer } = require('electron')

const $ = selector => document.getElementById(selector)

let credentials = {}

$('login').addEventListener('click', () => {
  if ($('username').value === '' || $('password').value === '') {
    $('username').placeholder = 'Username Required'
    $('password').placeholder = 'Password Required'
    return
  }
  credentials = { username: $('username').value, password: $('password').value }

  $('form').classList.add('hide')
  $('choose').classList.remove('hide')
})

$('option-1').addEventListener('click', () => {
  ipcRenderer.send('invitations', credentials)
})

$('option-2').addEventListener('click', () => {
  ipcRenderer.send('messages', credentials)
})
