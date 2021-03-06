import { app, BrowserWindow, nativeTheme } from 'electron'
import path from 'path'
import os from 'os'

app.requestSingleInstanceLock({ key: '1qw2e3r4alnxls9o123ads23' })
app.on('second-instance', (e, argv, cwd) => {
  console.log(e, argv, cwd)
  dialog
    .showMessageBox({
      message: '중복 실행 오류',
      buttons: ['ok']
    })
    .then((r) => {
      console.log(r)
    })
  app.exit(0)
})

import { createMainMenu } from './menu'
import './ipc'

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    )
  }
} catch (_) {}

let mainWindow

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  createMainMenu()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  } else {
    app.quit(0)
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
