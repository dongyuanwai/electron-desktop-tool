import { contextBridge, ipcRenderer } from "electron";


contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, ...args) => {
      if (args?.length > 0) {
          ipcRenderer.send(channel, ...args)
      } else {
          ipcRenderer.send(channel)
      }
  },
  on: (channel, func) => {
      ipcRenderer.on(channel, func)
  },
  once: (channel, func) => {
      ipcRenderer.once(channel, func)
  },
  removeListener: (channel, func) => {
      ipcRenderer.removeListener(channel, func)
  },
  sendSync: (channel, ...args) => {
      if (args?.length > 0) {
          return ipcRenderer.sendSync(channel, ...args)
      } else {
          return ipcRenderer.sendSync(channel)
      }
  },
  invoke: (channel, ...args) => {
      try {
          return ipcRenderer.invoke(channel, ...args)
      } catch (error) {
          console.error(`Error invoking API: ${channel}`, error)
      }
  },
})


