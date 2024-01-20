import { ipcMain } from 'electron'

export async function handleMessage () {
  ipcMain.on('option2', async () => {
    console.log('Hello world')
  })
}
