import { app, BrowserWindow, ipcMain, Menu, shell } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  const preloadScriptPath = path.join(__dirname, "preload.js");

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: preloadScriptPath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html")).catch((err) => {});

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("http:") || url.startsWith("https:")) {
      shell.openExternal(url);
    }
    return { action: "deny" };
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL, isMainFrame) => {}
  );

  mainWindow.webContents.on("did-finish-load", () => {});
}

function createMenu() {
  const menuTemplate = [
    {
      label: "Navigation",
      submenu: [
        {
          label: "Main Page",
          accelerator: "CmdOrCtrl+H",
          click: () => {
            if (mainWindow) {
              mainWindow
                .loadFile(path.join(__dirname, "index.html"))
                .catch((err) => {});
            }
          },
        },
        { type: "separator" },
        {
          label: "Back",
          accelerator: "CmdOrCtrl+Left",
          click: () => {
            if (mainWindow && mainWindow.webContents.canGoBack())
              mainWindow.webContents.goBack();
          },
        },
        {
          label: "Forward",
          accelerator: "CmdOrCtrl+Right",
          click: () => {
            if (mainWindow && mainWindow.webContents.canGoForward())
              mainWindow.webContents.goForward();
          },
        },
        {
          label: "Refresh",
          accelerator: "CmdOrCtrl+R",
          click: () => {
            if (mainWindow) mainWindow.webContents.reload();
          },
        },
      ],
    },
    {
      label: "Layout",
      submenu: [
        { role: "reload", label: "Reload" },
        { role: "forceReload", label: "Force Reload" },
        { role: "toggleDevTools", label: "Dev Tools" },
        { type: "separator" },
        { role: "resetZoom", label: "Reset Zoom" },
        { role: "zoomIn", label: "Zoom In" },
        { role: "zoomOut", label: "Zoom Out" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Fullscreen" },
      ],
    },
  ];
  if (process.platform === "darwin") {
    menuTemplate.unshift({
      label: app.name,
      submenu: [
        { role: "about", label: `${app.name} About` },
        { type: "separator" },
        { role: "services", label: "Services" },
        { type: "separator" },
        { role: "hide", label: `Hide ${app.name}` },
        { role: "hideOthers", label: "Hide Others" },
        { role: "unhide", label: "Unhide" },
        { type: "separator" },
        { role: "quit", label: `Quit ${app.name}` },
      ],
    });
  }
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("load-url", (event, url) => {
  if (mainWindow && url) {
    mainWindow.loadURL(url).catch((err) => {});
  } else {
  }
});

ipcMain.on("go-home", () => {
  if (mainWindow) {
    mainWindow.loadFile(path.join(__dirname, "index.html")).catch((err) => {});
  }
});
