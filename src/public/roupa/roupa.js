// tabela estrutura

const tabelaRoupa = document.getElementById("roupaTableDados");
// modais

const modalIdRoupa = document.getElementById("roupa-id");
const modalNomeRoupa = document.getElementById("roupa-nome");
const modalCorRoupa = document.getElementById("roupa-cor");
const modalSaldoRoupa = document.getElementById("roupa-saldo");
const modalPreço = document.getElementById("roupa-preço");
const inputFiltro = document.getElementById("filtro-nome");
// botões

const limparTudo = document.getElementById("limpar-tudo");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoExcluir = document.getElementById("btn-excluir");
const botaoLimpar = document.getElementById("btn-limpar");
const btnBuscar = document.getElementById("btn-buscar");
// variavel global que recebe lista de roupas

// eventos de click
limparTudo.addEventListener("click", limparRoupa);
botaoSalvar.addEventListener("click", verificarSalvar);
botaoExcluir.addEventListener("click", excluirRoupa);
btnBuscar.addEventListener("click", buscarPorNome);
// funções de usuario

async function atualizarRoupa() {
  const id = modalIdRoupa.value;
  const nome = modalNomeRoupa.value;
  const cor = modalCorRoupa.value;
  const saldo = modalSaldoRoupa.value;
  const preço = modalPreço.value;

  if (await window.dialog.confirm(`dejesa atualizar a ${nome}`)) {
      await window.shiftAPI.atualizarRoupaPreload(
      id,
      nome,
      cor,
      saldo,
      preço
    );
    modalIdRoupa.value = "";
    modalNomeRoupa.value = "";
    modalCorRoupa.value = "";
    modalSaldoRoupa.value = "";
    modalPreço.value = "";
    carregarLinhaRoupa();
    await window.dialog.alert(`${nome} atualizado com sucesso.`)
  }
}

async function excluirRoupa() {
  const nome = modalIdRoupa.value;
  const id = modalIdRoupa.value;
  console.log(id);

  if (await window.dialog.confirm(`Deseja deletar o item ${nome}`)) {
    await window.shiftAPI.excluirRoupaPreload(id);
    modalIdRoupa.value = "";
    modalNomeRoupa.value = "";
    modalCorRoupa.value = "";
    modalSaldoRoupa.value = "";
    modalPreço.value = "";
    carregarLinhaRoupa();
    await window.dialog.alert(`item ${id} deletado com sucesso.`);
  }
}

async function inserirRoupa() {
  const nome = modalNomeRoupa.value;
  const cor = modalCorRoupa.value;
  const saldo = modalSaldoRoupa.value;
  const preço = modalPreço.value;
  const returno = await window.shiftAPI.adicionarRoupasPreload(
    nome,
    cor,
    saldo,
    preço
  );
  carregarLinhaRoupa();
  await window.dialog.alert(`${nome} adicionado(a) com sucesso!`);
}

async function carregarLinhaRoupa() {
  const listaRoupa = await window.shiftAPI.buscarRoupasPreload();
  tabelaRoupa.innerHTML = "";
  listaRoupa.forEach(criarLinhaRoupa);

  if (!listaRoupa.length > 0) {
    tabelaRoupa.textContent = "sem dados";
  }

  const tipoUser = localStorage.getItem("perfil");
  if (tipoUser !== "adm") {
    botaoExcluir.disabled = true;
    botaoSalvar.disabled = true;
  }
  lucide.createIcons();
}

function criarLinhaRoupa(roupa) {
  const linha = document.createElement("tr");

  const calcularNome = document.createElement("td");
  calcularNome.textContent = roupa.nome;
  linha.appendChild(calcularNome);

  const calcularCor = document.createElement("td");
  calcularCor.textContent = roupa.cor;
  linha.appendChild(calcularCor);

  const calcularSaldo = document.createElement("td");
  calcularSaldo.textContent = roupa.saldo;
  linha.appendChild(calcularSaldo);

  const calcularPreço = document.createElement("td");
  calcularPreço.textContent = roupa.preço;
  linha.appendChild(calcularPreço);

  const calcularBotao = document.createElement("td");
  const botao = document.createElement("button");
  botao.addEventListener("click", function () {
    mostrarDetalhes(roupa.id, roupa.nome, roupa.cor, roupa.saldo, roupa.preço);
  });

  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  calcularBotao.appendChild(botao);
  linha.appendChild(calcularBotao);
  //final adiciono a linha criada com matricula,nome e botao à tabela
  tabelaRoupa.appendChild(linha);
}

function mostrarDetalhes(id, nome, cor, saldo, preço) {
  modalIdRoupa.value = id;
  modalNomeRoupa.value = nome;
  modalCorRoupa.value = cor;
  modalSaldoRoupa.value = saldo;
  modalPreço.value = preço;
}

function limparRoupa() {
  modalIdRoupa.value = "";
  modalNomeRoupa.value = "";
  modalCorRoupa.value = "";
  modalSaldoRoupa.value = "";
  modalPreço.value = "";
}

function verificarSalvar() {
  const id = modalIdRoupa.value;
  if (!id) {
    inserirRoupa();
  } else {
    atualizarRoupa();
  }
}

//filtrar por nome function
async function buscarPorNome() {
  const nomeBusca = inputFiltro.value.trim();
  if (!nomeBusca) {
    carregarLinhaRoupa();
    return;
  }
  const listaFiltrada = await window.shiftAPI.buscarRoupasPorNomePreload(
    nomeBusca
  );
  tabelaRoupa.innerHTML = "";
  if (listaFiltrada.length === 0) {
    tabelaRoupa.textContent = "Nenhuma roupa encontrada";
    return;
  }

  listaFiltrada.forEach(criarLinhaRoupa);
  lucide.createIcons();
}

carregarLinhaRoupa();
