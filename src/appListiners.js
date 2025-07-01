const { ipcMain } = require("electron");

const { modalAbrirRoupa, modalAbrirEntrada } = require("./windowModal");
// importação de roupas
const {
  adicionarRoupasDb,
  buscarRoupasDb,
  excluirRoupaDb,
  atualizarRoupaDb,
  buscarRoupasPorNomeDb,
} = require("./public/roupa/roupaDb");

// importação de entrada 
const {
  buscarEntradaDb,
  adicionarEntradaDb,
  atualizarEntradaDb,
  deletarEntradaDb,
  buscarPorNomeEntradaDb,

} = require("./public/entrada/entradaDb")

//login validar //
const { validarLogin } = require("./public/login/loginDb");

// cria janela principal do menu apos a confirmação dos dados
const { createMainWindow, createMainWindowUser } = require("./mainWindor");

// janela de dialogo
const {mostrarAlert, mostrarConfirm} = require('./public/dialog/dialog')

//////////////////////////////////////////////////////////////////////
// AQUI SEPARA AS IMPORTAÇÃO, DAS FUNÇÕES DE CHAMADA DO SISTEMA NO BACK AND
/////////////////////////////////////////////////////////////////////


//registro de entrada
function registrarEntrada(){
  ipcMain.handle("buscar-entrada", buscarEntradaDb);
  ipcMain.handle("adicionar-entrada", adicionarEntradaDb);
  ipcMain.handle("atualizar-entrada", atualizarEntradaDb);
  ipcMain.handle("deletar-entrada", deletarEntradaDb);
  ipcMain.handle("buscar-nome-entrada", buscarPorNomeEntradaDb);


}

// registro de roupas
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
  ipcMain.on("janela-user", createMainWindowUser);
  ipcMain.on("janela-principal", createMainWindow);
  ipcMain.on("janela-entrada", modalAbrirEntrada);
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
  registrarEntrada();
  registrarRoupa();
  registrarModal();
  registrarvalidarLogin();
  registrarJanelaPrincipal();
  registrarDialog();
}

module.exports = {
  registrarListner,
};
