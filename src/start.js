const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');


let mainWindow;

async function createWindow() {
  let name;
  try {
    name = await installExtension(REACT_DEVELOPER_TOOLS, true)
    console.log('successfully loaded extension:', name);
  }
  catch (err) {
    console.log( 'error loading extension: ', err);
  }
  

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