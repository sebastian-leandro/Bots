import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

const options = {
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true
  }
}

function createWindow (): void {
  const window = new BrowserWindow(options)
  window.loadURL(
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:3000'
      : url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file',
        slashes: true
      })
  ).catch(err => { console.error(err) })
}

app.whenReady().then(createWindow).catch(e => { console.error(e) })
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
