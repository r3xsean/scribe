import { app, BrowserWindow, ipcMain, clipboard, session } from 'electron'
import path from 'path'
import { startBackend, stopBackend } from './backend'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    },
    show: false,
    title: 'Scribe'
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // Set Content-Security-Policy to allow localhost connections
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "connect-src 'self' http://127.0.0.1:* ws://127.0.0.1:*; " +
          "img-src 'self' data:;"
        ]
      }
    })
  })

  // Load renderer
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// IPC Handlers
ipcMain.handle('getBackendUrl', async () => {
  return startBackend()
})

ipcMain.handle('copyToClipboard', (_event, text: string) => {
  clipboard.writeText(text)
})

// App lifecycle
app.whenReady().then(async () => {
  createWindow()

  // Start backend and notify renderer
  try {
    const url = await startBackend()
    mainWindow?.webContents.send('backend-ready', url)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Backend startup failed:', message)
    mainWindow?.webContents.send('backend-error', message)
  }
})

app.on('window-all-closed', () => {
  stopBackend()
  app.quit()
})

app.on('before-quit', () => {
  stopBackend()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
