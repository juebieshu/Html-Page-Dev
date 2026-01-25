const { app, BrowserWindow, Menu, ipcMain } = require("electron");

let mainWindow;
const windows = new Set();

function createMainWindow() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    title: "Main Window",

    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    app.quit();
  });
}

function createChildWindow(name, file) {
  const win = new BrowserWindow({
    width: 600,
    height: 400,
    title: name,
    parent: mainWindow,

    webPreferences: {
      preload: __dirname + "/preload.js",
    },
  });

  win.loadFile(file);

  win.on("closed", () => {
    windows.delete(win);
  });

  windows.add(win);
}

/* ===== IPC ===== */

ipcMain.handle("open-window", (_event, type) => {
  if (type === "A") {
    createChildWindow("Window A", "window-a.html");
  }

  if (type === "B") {
    createChildWindow("Window B", "window-b.html");
  }
});

app.whenReady().then(createMainWindow);
