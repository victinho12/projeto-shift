const { app, contextBridge, ipcRenderer } = require("electron");

console.log("Processo de renderização");

///////////////////////////////
//espaço para entrada
///////////////////////////////

function buscarEntradaPreload() {
  return ipcRenderer.invoke("buscar-entrada");
}

function adicionarEntradaPreload(id_roupa, quantidade, data_entrega){
  return ipcRenderer.invoke("adicionar-entrada", id_roupa, quantidade, data_entrega);
}

function atualizarEntradaPreload(id, id_roupa, quantidade, data_entrega){
  return ipcRenderer.invoke("atualizar-entrada", id, id_roupa, quantidade, data_entrega);
}

function deletarEntradaPreload(id){
  return ipcRenderer.invoke("deletar-entrada",id);
}

function buscarEtradaNomePreload(nome){
  return ipcRenderer.invoke("buscar-nome-entrada", nome);
}

///////////////////////////////
//espaço para roupa
///////////////////////////////

function atualizarRoupaPreload(id, nome, cor, saldo, preço, tamanho) {
  return ipcRenderer.invoke("atualizar-roupa", id, nome, cor, saldo, preço, tamanho);
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

function adicionarRoupasPreload(nome, cor, saldo, preço, tamanho) {
  return ipcRenderer.invoke("adicionar-roupa", nome, cor, saldo, preço, tamanho);
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

  // entrada
  buscarEntradaPreload: buscarEntradaPreload,
  adicionarEntradaPreload:adicionarEntradaPreload,
  atualizarEntradaPreload: atualizarEntradaPreload,
  deletarEntradaPreload:deletarEntradaPreload,
  buscarEtradaNomePreload: buscarEtradaNomePreload,

  // login
  validarLoginPreload: validarLoginPreload,
});

///////////////////////////////
//espaço para janelas
///////////////////////////////

function abrirJanelaRoupa() {
  ipcRenderer.send("janela-roupa");
}
function abrirJanelaEntrada() {
  ipcRenderer.send("janela-entrada");
}
function abrirJanelaPrincipal() {
  ipcRenderer.send("janela-principal");
}
function abrirJanelaPrincipalUser(){
  ipcRenderer.send("janela-user")
}

contextBridge.exposeInMainWorld("abrirJanela", {
  abrirJanelaRoupa: abrirJanelaRoupa,
  abrirJanelaPrincipal: abrirJanelaPrincipal,
  abrirJanelaEntrada: abrirJanelaEntrada,
  abrirJanelaPrincipalUser:abrirJanelaPrincipalUser,
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