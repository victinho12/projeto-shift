const { app, BrowserWindow, nativeTheme, Menu, shell } = require("electron");
const path = require("path");

let mainWindow;
let windowLogin;

function createMainWindow() {
  nativeTheme.themeSource = "dark";
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname,  'public', 'img', 'img.goku.jpg'),
    resizable: true,
    autoHideMenuBar: false,
    //titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  //Menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  mainWindow.loadFile(path.join(__dirname, "views", "index.html"));

  if (windowLogin) {
    windowLogin.close();
    windowLogin = null;
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  return mainWindow;
}

function getMainWindow() {
  return mainWindow;
}

function creatLoginWindow() {
  windowLogin = new BrowserWindow({
    width: 600,
    height: 500,
        icon: path.join(__dirname,  'public', 'img', 'img.goku.jpg'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  windowLogin.loadFile(path.join(__dirname, "public", "login", "login.html"));

  windowLogin.on("closed", () => {
    windowLogin = null;
  });
}

function getWindowLogin() {
  return creatLoginWindow;
}

module.exports = {
  getMainWindow,
  getWindowLogin,
  createMainWindow,
  creatLoginWindow,
};

// template menu
const template = [
  {
    label: "Menu",
    submenu: [
      {
        label: "Sair",
        click: () => app.quit(),
        accelerator: "Alt+F4",
      },
    ],
  },
  {
    label: "Exibir",
    submenu: [
      {
        label: "Recarregar",
        role: "reload",
      },
      {
        label: "Ferramentas do desenvolvedor",
        role: "toggleDevTools",
      },
      {
        type: "separator",
      },
      {
        label: "Aplicar zoom",
        role: "zoomIn",
      },
      {
        label: "Reduzir",
        role: "zoomOut",
      },
      {
        label: "Restaurar zoom",
        role: "resetZoom",
      },
    ],
  },
  {
    label: "Ajuda",
    submenu: [
      {
        label: "docs",
        click: () =>
          shell.openExternal("https://www.electronjs.org/pt/docs/latest/"),
      },
      {
        type: "separator",
      },
      {
        label: "Sobre",
        click: () => janelaSobre(),
      },
    ],
  },
];
