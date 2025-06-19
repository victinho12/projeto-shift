const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron');
const path = require('path');
const { creatLoginWindow } = require('./src/mainWindor.js')
const { registrarListner } = require('./src/appListiners.js')

console.log("Processo Principal")

app.whenReady().then(function () {
    creatLoginWindow();
    registrarListner()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            creatLoginWindow();
        }
    });
}
);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});