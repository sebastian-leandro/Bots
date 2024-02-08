var _a;
import express from 'express';
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { attachRoutes } from './api/server.js';
const options = {
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true
    }
};
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 1234;
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow(options);
    const startUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : `file://${path.join(fileURLToPath(import.meta.url), '../build/index.html')}`;
    mainWindow.loadURL(startUrl).catch(err => { console.error(err); });
    mainWindow.on('closed', () => { mainWindow = null; });
}
const expressApp = express();
expressApp.use(express.json());
attachRoutes(expressApp);
const server = expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.whenReady().then(() => {
    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}).catch(err => { console.error(err); });
app.on('window-all-closed', () => {
    server.close();
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('ready', createWindow);
