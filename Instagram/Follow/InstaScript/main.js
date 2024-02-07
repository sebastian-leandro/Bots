import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as isDev from 'electron-is-dev'
import express from 'express'
import attachRoutes from './api/server.js'

app.allowRendererProcessReuse = false

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
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(startUrl).catch(err => { console.error(err) })
  mainWindow.on('closed', () => { mainWindow = null })
}

const expressApp = express()

expressApp.use(express.json())
attachRoutes(expressApp)

const server = expressApp.listen(3001, () => {
  console.log('Server running on port 3001')
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (mainWindow === null) createWindow()
  })
}).catch(err => { console.error(err) })

app.on('window-all-closed', () => {
  server.close()
  if (process.platform !== 'darwin') app.quit()
})
