import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { startServer } from './api/server.js'

const options = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true
  }
}

let mainWindow: BrowserWindow | null

function createWindow (): void {
  mainWindow = new BrowserWindow(options)
  const startUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `file://${path.join(fileURLToPath(import.meta.url), '../build/index.html')}`
  mainWindow.loadURL(startUrl).catch(err => { console.error(err) })
  mainWindow.on('closed', () => { mainWindow = null })
}

app.whenReady().then(() => {
  startServer()
  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}).catch(err => { console.error(err) })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', createWindow)
