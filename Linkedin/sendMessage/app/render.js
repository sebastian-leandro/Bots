const { ipcRenderer } = require('electron')

document.getElementById('option-1').addEventListener('click', () => {
  ipcRenderer.send('option1')
})

document.getElementById('option-2').addEventListener('click', () => {
  ipcRenderer.send('option2')
})
