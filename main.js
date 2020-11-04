const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path')
const DataStore = require('./DataStore.js');

const store = new DataStore({name: "questions"});

console.log(store.getEntries());

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile(path.join('renderer', 'index.html'));

  ipcMain.on('get-entries', (event) => {
    win.send('entries', store.entries);
  });

  ipcMain.on('add-entry', (event, entry) => {
    const updatedEntries = store.addEntry(entry).entries;
    console.log(store.getEntries());

    win.send('entries', updatedEntries);
  });
  //win.webContents.openDevTools()
  ipcMain.on('delete-entry', (event, entry) => {
    const updatedEntries = store.deleteEntry(entry).entries;
    win.send('entries', updatedEntries);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
