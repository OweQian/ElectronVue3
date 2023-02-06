import {app, BrowserWindow} from 'electron';
import {CustomScheme} from "./CustomScheme";
import { Updater } from "./Updater";
import {CommonWindowEvent} from "./CommonWindowEvent";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
let mainWindow: BrowserWindow;
app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});
app.whenReady().then(() => {
  let config = {
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
      nativeWindowOpen: true,
    },
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({mode: 'undocked'});
  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL('app"//index.html');
    // Updater.check();
  }
  CommonWindowEvent.listen();
});
