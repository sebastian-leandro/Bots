const { ipcRenderer } = require('electron')

document.getElementById('option1').addEventListener('click', () => {
  ipcRenderer.send('option1')
})

document.getElementById('option2').addEventListener('click', () => {
  ipcRenderer.send('option2')
})
