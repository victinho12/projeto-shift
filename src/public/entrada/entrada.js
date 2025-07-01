// tabela
const tabela = document.getElementById("entradaTableDados");

// modais
const entradaId = document.getElementById("entrada-id");
const nomeRoupa = document.getElementById("roupa-nome");
const quantidadeRoupa = document.getElementById("roupa-quantidade");
const dataEntrada = document.getElementById("data-entrada");
const inputFiltro = document.getElementById("filtro-nome");
// botões
const limparTudo = document.getElementById("limpar-tudo");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoExcluir = document.getElementById("btn-excluir");
const btnBuscar = document.getElementById("btn-buscar");

// eventos de click
botaoExcluir.addEventListener("click", deletarEntrada);
botaoSalvar.addEventListener("click", verificarSalvar);
limparTudo.addEventListener("click", limparEntrada);
btnBuscar.addEventListener("click", buscarNome);

function mostrarDetalhes(id, nome, quantidade, data_entrada) {
  entradaId.value = id;
  nomeRoupa.value = nome;
  quantidadeRoupa.value = quantidade;
  dataEntrada.value = data_entrada;
}

function limparEntrada() {
  nomeRoupa.value = "";
  entradaId.value = "";
  quantidadeRoupa.value = "";
  dataEntrada.value = "";
}

function verificarSalvar() {
  const id = entradaId.value;
  if (id) {
    atualizarEntrada();
  } else {
    adicionarEntrada();
  }
}

async function buscarNome() {
  const roupa = inputFiltro.value.trim();
  if (!roupa) {
    carregarLinhaEntrada();
    return;
  }
  const retorno = await window.shiftAPI.buscarEtradaNomePreload(roupa);
  tabela.innerHTML = "";
  if (retorno.length === 0) {
    tabela.textContent = "nenhuma roupa encontrada";
    return;
  }
  retorno.forEach(CriarLinhaEntrada);
}

async function adicionarEntrada() {
  const nome = nomeRoupa.value;
  const quantidade = quantidadeRoupa.value;
  const data_entrega = dataEntrada.value;

  if (await window.dialog.confirm(`Deseja adicionar ${nome} no sistema?`)) {
    await window.shiftAPI.adicionarEntradaPreload(
      nome,
      quantidade,
      data_entrega
    );
    carregarLinhaEntrada();
    await window.dialog.alert(`${nome} adicionado com sucesso.`);
  }
}

async function atualizarEntrada() {
  const id = entradaId.value;
  const nome = nomeRoupa.value;
  const quantidade = quantidadeRoupa.value;
  const data_entrega = dataEntrada.value;

  if (await window.dialog.confirm(`Deseja adicionar ${nome} ao sistema?`)) {
    const retorno = await window.shiftAPI.atualizarEntradaPreload(
      id,
      nome,
      quantidade,
      data_entrega
    );
    carregarLinhaEntrada();
    await window.dialog.alert(`item ${nome} adicionado com sucesso.`)
  }
}

async function deletarEntrada() {
  const id = entradaId.value;

  const retorno = await window.shiftAPI.deletarEntradaPreload(id);
  carregarLinhaEntrada();
}

async function carregarOptionRoupa() {
  const linhaRoupa = await window.shiftAPI.buscarRoupasPreload();
  nomeRoupa.innerHTML = "";

  linhaRoupa.forEach(optionSelectRoupa);

  if (!linhaRoupa.length > 0) {
    nomeRoupa.textContent = "sem dados";
  }
}

function optionSelectRoupa(roupa_id) {
  console.log(roupa_id);
  const calcularOption = document.createElement("option");
  calcularOption.value = roupa_id.id;
  calcularOption.textContent = roupa_id.nome;
  nomeRoupa.appendChild(calcularOption);
  // nomeRoupa.value = "";
}

function CriarLinhaEntrada(entrada) {
  const linha = document.createElement("tr");

  const calcularNome = document.createElement("td");
  calcularNome.textContent = entrada.nome;
  linha.appendChild(calcularNome);

  const calcularQuantidade = document.createElement("td");
  calcularQuantidade.textContent = entrada.quantidade;
  linha.appendChild(calcularQuantidade);

  const calcularData_Entrada = document.createElement("td");
  calcularData_Entrada.textContent = entrada.data_entrega.toLocaleDateString();
  linha.appendChild(calcularData_Entrada);

  const calcularBotao = document.createElement("td");
  const botao = document.createElement("button");
  console.log(entrada.id);
  botao.addEventListener("click", function () {
    mostrarDetalhes(
      entrada.id,
      entrada.nome,
      entrada.quantidade,
      entrada.data_entrega.toLocaleDateString()
    );
  });

  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  calcularBotao.appendChild(botao);
  linha.appendChild(calcularBotao);

  tabela.appendChild(linha);
}

async function carregarLinhaEntrada() {
  const listaEntrada = await window.shiftAPI.buscarEntradaPreload();
  tabela.innerHTML = "";
  listaEntrada.forEach(CriarLinhaEntrada);

  if (!listaEntrada.length > 0) {
    listaEntrada.textContent = "sem dados";
  }
  carregarOptionRoupa();
  lucide.createIcons();
  const tipoUser = localStorage.getItem("perfil");
  if (tipoUser !== "adm") {
    botaoExcluir.disabled = true;
    botaoExcluir.style.opacity = '0.4';
    botaoExcluir.style.cursor = 'not-allowed';
    botaoExcluir.title = "Você não tem permissão para excluir.";
    botaoExcluir.disabled = true;
    botaoSalvar.disabled = true;
  }
}

carregarLinhaEntrada();
