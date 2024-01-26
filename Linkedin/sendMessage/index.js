import { handleInvitation } from './api/handlers/invitations.js'
import { handleMessage } from './api/handlers/messages.js'
import { app, BrowserWindow, ipcMain } from 'electron'

function createWindow () {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 480,
    minHeight: 320,
    minimizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  window.loadFile('./electron/index.html')
}

ipcMain.on('invitations', handleInvitation)
ipcMain.on('messages', handleMessage)

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
