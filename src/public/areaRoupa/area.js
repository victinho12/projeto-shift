// id da tabela
const tabelaArea = document.getElementById("areaTableDados");

//modais

const idArea = document.getElementById("id-area");
const nomeArea = document.getElementById("nome");
const quantidadeArea = document.getElementById("roupa-saldo");
const tamanhoArea = document.getElementById("tamanho");
const precoArea = document.getElementById("preço");
const corArea = document.getElementById("roupa-cor");
// botões
const botaoLimpar = document.getElementById("btn-limpar");
const botaoExcluir = document.getElementById("btn-excluir");
const botaoMandarEstoque = document.getElementById("btn-mandar-estoque");
// funções de click
botaoMandarEstoque.addEventListener("click", mandarParaEstoque);

// funções que registram as funcionabilidades do sistema

//funções que tem as funcionabilidades do sistema, aqui temos todo o crud

async function mandarParaEstoque() {
  const id = nomeArea.value;
  const result = id.length[0];
  const quantidade = quantidadeArea.value;

  await window.shiftAPI.mandarParaEstoque(result, quantidade);
  carregarLinhaArea();
}

// funções que adicionan os selects e a tabela de roupas que estão em area, o codigo desgraçado
function criarLinhaArea(area) {
  const linha = document.createElement("tr");

  const calcularNome = document.createElement("td");
  calcularNome.textContent = area.nome;
  linha.appendChild(calcularNome);

  const calcularQuantidade = document.createElement("td");
  calcularQuantidade.textContent = area.quantidade;
  linha.appendChild(calcularQuantidade);

  const calcularTamanho = document.createElement("td");
  calcularTamanho.textContent = area.tamanho;
  linha.appendChild(calcularTamanho);

  const calcularPreco = document.createElement("td");
  calcularPreco.textContent = area.preco;
  linha.appendChild(calcularPreco);

  const calcularCor = document.createElement("td");
  calcularCor.textContent = area.cor;
  linha.appendChild(calcularCor);

  const calcularBotao = document.createElement("td");
  const botao = document.createElement("button");
  botao.addEventListener("click", function () {
    mostrarDetalhes(
      area.id,
      area.nome,
      area.quantidade,
      area.tamanho,
      area.preco,
      area.cor
    );
  });
  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  calcularBotao.appendChild(botao);
  linha.appendChild(calcularBotao);

  tabelaArea.appendChild(linha);
}

async function carregarLinhaArea() {
  const linhaArea = await window.shiftAPI.buascarRoupasArea();
  tabelaArea.innerHTML = "";
  linhaArea.forEach(criarLinhaArea);

  if (linhaArea.length === 0) {
    const aviso = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5; // quantidade de colunas da tabela
    td.textContent = "Sem dados";
    aviso.appendChild(td);
    tabelaArea.appendChild(aviso);
  }
  const tipoUser = localStorage.getItem("perfil");
  if (tipoUser !== "adm") {
    botaoExcluir.disabled = true;
    botaoSalvar.disabled = true;
  }
  lucide.createIcons();
  carregarSelect();
}

function criarLinhaSelectNome(nomeRoupa) {
  const option = document.createElement("option");
  option.textContent = nomeRoupa.nome; // texto que aparece pro usuário
  option.value = nomeRoupa.id; // id numérico para enviar ao backend
  nomeArea.appendChild(option);
}
async function carregarSelect() {
  const listaAluno = await window.shiftAPI.buscarRoupasPreload();
  console.log(listaAluno);
  listaAluno.forEach(criarLinhaSelectNome);
  if (listaAluno.length < 0) {
    nomeArea.textContent = "sem dados";
  }
}

function mostrarDetalhes(id, nome, quantidade, tamanho, preco, cor) {
  idArea.value = id;
  nomeArea.value = nome;
  quantidadeArea.value = quantidade;
  tamanhoArea.value = tamanho;
  precoArea.value = preco;
  corArea.value = cor;
}

carregarLinhaArea();
