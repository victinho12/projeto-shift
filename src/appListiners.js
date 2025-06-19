const { ipcMain } = require("electron");

const { modalAbrirRoupa } = require("./windowModal");
const {
  adicionarRoupasDb,
  buscarRoupasDb,
  excluirRoupaDb,
  atualizarRoupaDb,
  buscarRoupasPorNomeDb,

} = require("./public/roupa/roupaDb");
const { validarLogin } = require("./public/login/loginDb");
const { createMainWindow } = require("./mainWindor");

function registrarRoupa() {
  ipcMain.handle("buscar-roupa", buscarRoupasDb);
  ipcMain.handle("adicionar-roupa", adicionarRoupasDb);
  ipcMain.handle("excluir-roupa", excluirRoupaDb);
  ipcMain.handle("atualizar-roupa", atualizarRoupaDb);
  ipcMain.handle("buscar-nome",buscarRoupasPorNomeDb)
}

function registrarModal() {
  ipcMain.on("janela-roupa", modalAbrirRoupa);
}

function registrarJanelaPrincipal() {
  ipcMain.on("janela-principal", createMainWindow);
}

function registrarvalidarLogin() {
  ipcMain.handle("validar-login", validarLogin);
}

function registrarListner() {
  registrarRoupa();
  registrarModal();
  registrarvalidarLogin();
  registrarJanelaPrincipal();
}

module.exports = {
  registrarListner,
};
