const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const server = require('./server')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  // Certifique-se de que contextIsolation está habilitado
      nodeIntegration: false,  // Desabilite nodeIntegration para aumentar a segurança
    }
  })

  // win.loadFile('index.html')
  win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

server.listen('3000',() => {
  console.log('teste')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})