const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true, // Hide menu bar
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // For easier IPC initially, can be secured later
        },
    });

    // Remove the menu bar completely
    mainWindow.setMenu(null);

    // In development, load the local Vite dev server
    mainWindow.loadURL('http://localhost:5173');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
