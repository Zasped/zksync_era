const {app, BrowserWindow} = require('electron')
const path = require('path')
const electronIsDev = require('electron-is-dev');

require('@electron/remote/main').initialize()

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 940,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: true,
        },
    })

    !electronIsDev && win.setMenu(null);

    win.setMinimumSize(800, 750)

    win.loadURL(
        electronIsDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})