const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function addEntry(){

    // Write
    storage.set('foobar', { foo: 'bar' }).then(function() {

        

    });
}

function loadEntries(){
    // Read
    storage.get('foobar').then(function(object) {
        console.log(object.foo);
      
    });
}
