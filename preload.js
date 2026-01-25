const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  openWindow(type) {
    return ipcRenderer.invoke("open-window", type);
  },
});
