const { app, contextBridge, ipcRenderer } = require("electron");

console.log("Processo de renderização");

///////////////////////////////
//espaço para roupa
///////////////////////////////

function atualizarRoupaPreload(id, nome, cor, saldo, preço){
    return ipcRenderer.invoke('atualizar-roupa',id, nome, cor, saldo, preço);

}

function excluirRoupaPreload(id) {
  return ipcRenderer.invoke("excluir-roupa", id);
}

function buscarRoupasPorNomePreload(nome){
    return ipcRenderer.invoke('buscar-nome',nome)
}

function buscarRoupasPreload() {
  return ipcRenderer.invoke("buscar-roupa");
}

function adicionarRoupasPreload(nome, cor, saldo, preço) {
  return ipcRenderer.invoke("adicionar-roupa", nome, cor, saldo, preço);
}
///////////////////////////////
//espaço para validar login de usuario
///////////////////////////////

function validarLoginPreload(nome, senha) {
  return ipcRenderer.invoke("validar-login", nome, senha);
}

contextBridge.exposeInMainWorld("shiftAPI", {
  buscarRoupasPreload: buscarRoupasPreload,
  adicionarRoupasPreload: adicionarRoupasPreload,
  excluirRoupaPreload: excluirRoupaPreload,
  atualizarRoupaPreload: atualizarRoupaPreload,
  buscarRoupasPorNomePreload:buscarRoupasPorNomePreload,

  // login
  validarLoginPreload
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

contextBridge.exposeInMainWorld("abrirJanela", {
  abrirJanelaRoupa: abrirJanelaRoupa,
  abrirJanelaPrincipal: abrirJanelaPrincipal,
});
