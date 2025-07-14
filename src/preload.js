const { app, contextBridge, ipcRenderer } = require("electron");

console.log("Processo de renderização");

///////////////////////////////
//espaço para roupa em area
///////////////////////////////

function buascarRoupasArea(){
  return ipcRenderer.invoke('buscar-roupas-area')
  
}

///////////////////////////////
//espaço para roupa
///////////////////////////////

function mandarParaAreaPreload(id, quantidade){
  return ipcRenderer.invoke("mandar-area", id, quantidade);
}

function atualizarRoupaPreload(id, nome, cor, saldo, preco, tamanho) {
  return ipcRenderer.invoke("atualizar-roupa", id, nome, cor, saldo, preco, tamanho);
}

function excluirRoupaPreload(id) {
  return ipcRenderer.invoke("excluir-roupa", id);
}

function buscarRoupasPorNomePreload(nome) {
  return ipcRenderer.invoke("buscar-nome", nome);
}

function buscarRoupasPreload() {
  return ipcRenderer.invoke("buscar-roupa");
}

function adicionarRoupasPreload(nome, cor, saldo, preco, tamanho) {
  return ipcRenderer.invoke("adicionar-roupa", nome, cor, saldo, preco, tamanho);
}
///////////////////////////////
//espaço para validar login de usuario
///////////////////////////////

function validarLoginPreload(nome, senha) {
  return ipcRenderer.invoke("validar-login", nome, senha);
}

contextBridge.exposeInMainWorld("shiftAPI", {
  // roupas
  buscarRoupasPreload: buscarRoupasPreload,
  adicionarRoupasPreload: adicionarRoupasPreload,
  excluirRoupaPreload: excluirRoupaPreload,
  atualizarRoupaPreload: atualizarRoupaPreload,
  buscarRoupasPorNomePreload: buscarRoupasPorNomePreload,
  mandarParaAreaPreload,

  // roupas em area
  
  buascarRoupasArea,

  // login
  validarLoginPreload: validarLoginPreload,
});

///////////////////////////////
//espaço para janelas
///////////////////////////////

function abrirJanelaRoupa() {
  ipcRenderer.send("janela-roupa");
}
function abrirJanelaPrincipal() {
  ipcRenderer.send("janela-principal");
}
function abrirJanelaPrincipalUser(){
  ipcRenderer.send("janela-user")
}
function abrirJanelaAreaRoupa(){
  ipcRenderer.send("janela-area");
}

contextBridge.exposeInMainWorld("abrirJanela", {
  abrirJanelaRoupa: abrirJanelaRoupa,
  abrirJanelaPrincipal: abrirJanelaPrincipal,
  abrirJanelaPrincipalUser:abrirJanelaPrincipalUser,
  abrirJanelaAreaRoupa: abrirJanelaAreaRoupa,
});


///////////////////////////////
//espaço para janelas de dialog
///////////////////////////////

function alert(mensagem){
 return ipcRenderer.invoke("abrir-dialog-alert", mensagem)
}

function confirm(mensagem){
 return ipcRenderer.invoke("abrir-dialog-confirm", mensagem)
}

contextBridge.exposeInMainWorld("dialog",{
  alert,
  confirm
})  