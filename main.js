const { app, BrowserWindow } = require('electron');
const storage = require('electron-json-storage');
const Store = require('./store.js');

const store = new Store({
    // We'll call our data file 'user-preferences'
    configName: 'questions',
    defaults: {
      questions: [{ question: 'test', answer: '600' },]
    }
  });

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');
  //win.webContents.openDevTools()
}

app.whenReady().then(createWindow);

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
