
// id da tabela
const tabelaArea = document.getElementById("areaTableDados")

//modais
const idArea = document.getElementById("id-area");
const nomeArea = document.getElementById("nome");
const quantidadeArea = document.getElementeById("roupa-saldo");
const tamanhoArea = document.getElementeById("tamanho");
const precoArea = document.getElementeById("preço");
const corArea = document.getElementById("cor");
// botões
const botaoLimpar = document.getElementById("btn-limpar");
const botaoExcluir = document.getElementeById("btn-excluir");
const botaoMandarEstoque = document.getElementById("btn-mandar-estoque");
// funções de click

// funções que registram as funcionabilidades do sistema

function criarLinhaArea(area) {
  const linha = createElement("tr");
  const calcularNome = createElement("td");
  calcularNome.textContent = area.nome;
  linha.appendChild(calcularNome);

  const calcularQuantidade = createElement("td");
  calcularQuantidade.textContent = area.quantidade;
  linha.appendChild(calcularQuantidade);

  const calcularTamanho = createElement("td");
  calcularTamanho.textContent = area.tamanho;
  linha.appendChild(calcularTamanho);

  const calcularPreco = createElement("td");
  calcularPreco.textContent = area.preco;
  linha.appendChild(calcularPreco);

  const calcularCor = createElement("td");
  calcularCor.textContent = area.cor;
  linha.appendChild(calcularCor);

  const calcularBotao = document.createElement("td");
  const botao = createElement("button");
  botao.addEventListener("click", function () {
    mostrarDetalhes(
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

async function carregarLinhaArea(){
    const linhaArea = await window.shiftAPI.buascarRoupasArea();
    tabelaArea.innerHTML = "";
    linhaArea.forEach(criarLinhaArea);

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

function mostrarDetalhes(id, nome, quantidade, tamanho, preco, cor) {
  idArea.value = id;
  nomeArea.value = nome;
  quantidadeArea.value = quantidade;
  tamanhoArea.value = tamanho;
  precoArea.value = preco;
  corArea.value = cor;
}
