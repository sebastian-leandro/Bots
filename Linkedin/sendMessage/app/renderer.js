const { ipcRenderer } = require('electron')

document.getElementById('option-1').addEventListener('click', () => {
  ipcRenderer.send('invitations')
})

document.getElementById('option-2').addEventListener('click', () => {
  ipcRenderer.send('messages')
})
