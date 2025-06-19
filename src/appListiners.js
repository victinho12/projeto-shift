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
const {buscarEntradaDb} = require("./public/entrada/entradaDb")

//login validar //
const { validarLogin } = require("./public/login/loginDb");

// cria janela principal do menu apos a confirmação dos dados
const { createMainWindow } = require("./mainWindor");

//////////////////////////////////////////////////////////////////////
// AQUI SEPARA AS IMPORTAÇÃO, DAS FUNÇÕES DE CHAMADA DO SISTEMA NO BACK AND
/////////////////////////////////////////////////////////////////////
//registro de entrada
function registrarEntrada(){
  ipcMain.handle("buscar-entrada", buscarEntradaDb);
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
  ipcMain.on("janela-principal", createMainWindow);
  ipcMain.on("janela-entrada", modalAbrirEntrada)
}

function registrarvalidarLogin() {
  ipcMain.handle("validar-login", validarLogin);
}

function registrarListner() {
  registrarEntrada();
  registrarRoupa();
  registrarModal();
  registrarvalidarLogin();
  registrarJanelaPrincipal();
}

module.exports = {
  registrarListner,
};
