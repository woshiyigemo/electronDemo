const { contextBridge, ipcRenderer } = require('electron')


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  count: '我是一个变量',
  // 能暴露的不仅仅是函数，我们还可以暴露变量
  ping: () => ipcRenderer.invoke('versions.ping')
})

contextBridge.exposeInMainWorld('fileManager', {
  open: () => ipcRenderer.invoke('open')
})