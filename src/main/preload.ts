import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  getBackendUrl: (): Promise<string> => {
    return ipcRenderer.invoke('getBackendUrl')
  },

  copyToClipboard: (text: string): void => {
    ipcRenderer.invoke('copyToClipboard', text)
  },

  onBackendReady: (callback: (url: string) => void): void => {
    ipcRenderer.on('backend-ready', (_event, url: string) => {
      callback(url)
    })
  },

  onBackendError: (callback: (error: string) => void): void => {
    ipcRenderer.on('backend-error', (_event, error: string) => {
      callback(error)
    })
  }
})
