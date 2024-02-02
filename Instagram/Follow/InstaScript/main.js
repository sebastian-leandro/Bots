/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import isDev from 'electron-is-dev'

let mainWindow

const options = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
}

function createWindow () {
  mainWindow = new BrowserWindow(options)
  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(startUrl).catch(err => { console.error(err) })
  mainWindow.on('closed', () => { mainWindow = null })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (mainWindow === null) createWindow() })
