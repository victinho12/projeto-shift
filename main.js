const {
  app,
  BrowserWindow,
  Notification,
  nativeTheme,
  Menu,
  shell,
} = require("electron");
const path = require("path");
const { creatLoginWindow } = require("./src/mainWindor.js");
const { registrarListner } = require("./src/appListiners.js");

app.setAppUserModelId("com.shiftstore.app"); // ESSENCIAL!!!

if (process.env.NODE_ENV !== 'production') {
  try {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
  } catch (err) {
    console.error('electron-reload não foi carregado:', err);
  }
}

console.log("Processo Principal");

app.whenReady().then(function () {
  creatLoginWindow();
  // teste2();
  registrarListner();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      creatLoginWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
