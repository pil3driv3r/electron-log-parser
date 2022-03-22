const {app, BrowserWindow, session} = require('electron');
const path = require('path');
const url = require('url');

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const os = require('os')

// on macOS
const reactDevToolsPath = path.join(
  os.homedir(),
  '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.0_0'
)

app.whenReady().then(async () => {
  await session.defaultSession.loadExtension(reactDevToolsPath)
})

let mainWindow;

async function createWindow() {
  let name;
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule : true
    }
  });

  const appURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './index.html'),
    protocol: 'file',
    slashes: true
  });

  mainWindow.loadURL(appURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if(mainWindow === null) {
    createWindow();
  }
})