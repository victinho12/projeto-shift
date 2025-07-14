const { ipcMain } = require("electron");
// janela principaç do meu index
const { modalAbrirRoupa, modalAbrirJanelaArea} = require("./windowModal");

// importação de roupas
const {
  adicionarRoupasDb,
  buscarRoupasDb,
  excluirRoupaDb,
  atualizarRoupaDb,
  buscarRoupasPorNomeDb,
  mandarParaArea,
} = require("./public/roupa/roupaDb");

//importação de area de vendas || roupas que estão expostas

const {buscarRoupaArea} = require('./public/areaRoupa/areaDb')


//login validar //
const { validarLogin } = require("./public/login/loginDb");

// cria janela principal do menu apos a confirmação dos dados
const { createMainWindow, createMainWindowUser } = require("./mainWindor");

// janela de dialogo
const {mostrarAlert, mostrarConfirm} = require('./public/dialog/dialog')

//////////////////////////////////////////////////////////////////////
// AQUI SEPARA AS IMPORTAÇÃO, DAS FUNÇÕES DE CHAMADA DO SISTEMA NO BACK AND
/////////////////////////////////////////////////////////////////////

function registarRoupasArea(){
  ipcMain.handle('buscar-roupa-area', buscarRoupaArea);
}

// registro de roupas
function registrarRoupa() {
  ipcMain.handle("buscar-roupa", buscarRoupasDb);
  ipcMain.handle("adicionar-roupa", adicionarRoupasDb);
  ipcMain.handle("excluir-roupa", excluirRoupaDb);
  ipcMain.handle("atualizar-roupa", atualizarRoupaDb);
  ipcMain.handle("buscar-nome",buscarRoupasPorNomeDb);
  ipcMain.handle("mandar-area", mandarParaArea);
}

function registrarModal() {
  ipcMain.on("janela-roupa", modalAbrirRoupa);
  ipcMain.on("janela-area", modalAbrirJanelaArea);
}

function registrarJanelaPrincipal() {
  ipcMain.on("janela-user", createMainWindowUser);
  ipcMain.on("janela-principal", createMainWindow);
}

function registrarvalidarLogin() {
  ipcMain.handle("validar-login", validarLogin);
}

// registro de dialog
function registrarDialog(){
  ipcMain.handle("abrir-dialog-alert", mostrarAlert);
  ipcMain.handle("abrir-dialog-confirm", mostrarConfirm);
}

function registrarListner() {
  registrarRoupa();
  registrarModal();
  registrarvalidarLogin();
  registrarJanelaPrincipal();
  registrarDialog();
  registarRoupasArea();
}

module.exports = {
  registrarListner,
};
