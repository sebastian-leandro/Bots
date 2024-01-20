import { app, BrowserWindow, ipcMain } from 'electron'
import { handleInvitation } from './handlers/invitation.js'
import { handleMessage } from './handlers/message.js'

function createWindow () {
  const window = new BrowserWindow({
    width: 640,
    height: 480,
    minWidth: 480,
    minHeight: 320,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  window.loadFile('./app/index.html')
}

ipcMain.on('option1', handleInvitation)
ipcMain.on('option2', handleMessage)

app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
