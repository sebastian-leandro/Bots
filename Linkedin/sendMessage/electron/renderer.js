const { ipcRenderer } = require('electron')
const { existsSync } = require('fs')
const fs = require('fs').promises

const $ = selector => document.getElementById(selector)
let credentials = {}
let input
let message

const folders = ['./cookies', './users', './users/invitation', './users/message']

async function createFolders () {
  for (const folder of folders) {
    if (!existsSync(folder)) {
      await fs.mkdir(folder)
    }
  }
}

async function displayLastTenUsers () {
  const filePath = './users/invitation/users.json'
  if (existsSync(filePath)) {
    try {
      const data = await fs.readFile(filePath, 'utf8')
      if (data) {
        const users = JSON.parse(data)
        const lastTenUsers = users.slice(-10)
        for (const user of lastTenUsers) {
          const li = document.createElement('li')
          const p = document.createElement('p')
          p.classList.add('username')
          p.textContent = user
          li.appendChild(p)
          $('users-list').appendChild(li)
        }
      }
    } catch (error) { console.error('Error reading or parsing the file:', error) }
  }
}

function setupLogin () {
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
}

function setupOption1 () {
  $('option-1').addEventListener('click', () => {
    $('choose').classList.add('hide')
    $('inputSearch').classList.remove('hide')
    $('searchBtn').addEventListener('click', () => {
      if ($('search').value === '') {
        $('search').placeholder = 'Search is required'
      } else {
        input = $('search').value
        $('inputSearch').classList.add('hide')
        $('grid-invitations').classList.remove('hide')
        displayLastTenUsers()
        ipcRenderer.send('invitations', credentials, input)
      }
    })
  })
}

function setupOption2 () {
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
}

createFolders()
setupLogin()
setupOption1()
setupOption2()
