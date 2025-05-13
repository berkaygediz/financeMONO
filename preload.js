// preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendLoadUrl: (url) => ipcRenderer.send("load-url", url),
  goHome: () => ipcRenderer.send("go-home"),
});
