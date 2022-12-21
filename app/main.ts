import {app, BrowserWindow, ipcMain, IpcMainEvent, screen} from 'electron';
import * as path from 'path';
import { fileManager } from './fileSystem/FileManager';
import { httpListener } from './http/HttpListener';


let mainWindow: BrowserWindow | null = null;
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;
 
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      contextIsolation: true,
      preload: __dirname+"/preload.js",
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    require('electron-reloader')(module);
    mainWindow.loadURL('http://localhost:4200');
  } else {
    const pathIndex = '../dist/index.html';
    const url = new URL(path.join('file:', __dirname, pathIndex));
    mainWindow.loadURL(url.href);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

try {
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {
    ipcInit();
    setTimeout(createWindow, 400);
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

function ipcInit(): void {
  httpListener.listen();
  ipcMain.handle('saveUserPhoto', fileManager.saveUserPhoto.bind(fileManager));
  ipcMain.handle('registerUserFile', fileManager.createUserInfos.bind(fileManager));
  ipcMain.handle('saveContactInfo', fileManager.saveContactInfo.bind(fileManager));
  ipcMain.on('message', (message: any)=> console.log("from main :", message))
}
