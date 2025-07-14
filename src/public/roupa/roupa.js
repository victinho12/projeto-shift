// tabela estrutura

const tabelaRoupa = document.getElementById("roupaTableDados");
// modais

const modalIdRoupa = document.getElementById("roupa-id");
const modalNomeRoupa = document.getElementById("roupa-nome");
const modalCorRoupa = document.getElementById("roupa-cor");
const modalSaldoRoupa = document.getElementById("roupa-saldo");
const modalPreco = document.getElementById("roupa-preço");
const inputFiltro = document.getElementById("filtro-nome");
const modalTamanho = document.getElementById("roupa-tamanho");
// botões

const limparTudo = document.getElementById("limpar-tudo");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoExcluir = document.getElementById("btn-excluir");
const botaoLimpar = document.getElementById("btn-limpar");
const btnBuscar = document.getElementById("btn-buscar");
const btnArea = document.getElementById("btn-mandar-area");

// eventos de click
limparTudo.addEventListener("click", limparRoupa);
botaoSalvar.addEventListener("click", verificarSalvar);
botaoExcluir.addEventListener("click", excluirRoupa);
btnBuscar.addEventListener("click", buscarPorNome);
btnArea.addEventListener("click", mandarParaArea);
// funções de usuario

async function mandarParaArea() {
  const id = modalIdRoupa.value;
  const saldo = modalSaldoRoupa.value;
  const nome = modalNomeRoupa.value;

  if (!id || !saldo || !nome) {
    await window.dialog.alert("insira todas as informações!!");
  } else {
    if (
      await window.dialog.confirm(
        `deseja adicionar ${saldo} ${nome} para a area de vendas? `
      )
    ) {
      const result = await window.shiftAPI.mandarParaAreaPreload(id, saldo);
      if (!result.success) {
        await window.dialog.alert(
          `Não foi possivel inserir, limite ja atingido`
        );
      } else {
        await window.dialog.alert("transição feita com sucesso!");
        carregarLinhaRoupa();
        return { success: true };
      }
    }
  }
}

async function atualizarRoupa() {
  const roupa = {
    id: modalIdRoupa.value,
    nome: modalNomeRoupa.value,
    cor: modalCorRoupa.value,
    saldo: modalSaldoRoupa.value,
    preco: modalPreco.value,
    tamanho: modalTamanho.value,
  };

  if (Object.values(roupa).some((valor) => !valor)) {
    await window.dialog.alert("Preencha todos os campos!");
  } else {
    if (await window.dialog.confirm(`Deseja atualizar a ${roupa.nome}?`)) {
      await window.shiftAPI.atualizarRoupaPreload(
        roupa.id,
        roupa.nome,
        roupa.cor,
        roupa.saldo,
        roupa.preco,
        roupa.tamanho
      );
      modalIdRoupa.value = "";
      modalNomeRoupa.value = "";
      modalCorRoupa.value = "";
      modalSaldoRoupa.value = "";
      modalPreco.value = "";
      modalTamanho.value = "";
      carregarLinhaRoupa();
      await window.dialog.alert(`${roupa.nome} atualizado com sucesso.`);
    }
  }
}

async function excluirRoupa() {
  const roupa = {
    nome: modalIdRoupa.value,
    id: modalIdRoupa.value,
  };
  console.log(roupa.id);

  if (await window.dialog.confirm(`Deseja deletar o item ${roupa.nome}`)) {
    await window.shiftAPI.excluirRoupaPreload(roupa.id);
    modalIdRoupa.value = "";
    modalNomeRoupa.value = "";
    modalCorRoupa.value = "";
    modalSaldoRoupa.value = "";
    modalPreco.value = "";
    modalTamanho.value = "";
    carregarLinhaRoupa();
    await window.dialog.alert(`item ${roupa.id} deletado com sucesso.`);
  }
}

async function inserirRoupa() {
  const roupa = {
    nome: modalNomeRoupa.value,
    cor: modalCorRoupa.value,
    saldo: modalSaldoRoupa.value,
    preco: modalPreco.value,
    tamanho: modalTamanho.value,
  };
  await window.shiftAPI.adicionarRoupasPreload(
    roupa.nome,
    roupa.cor,
    roupa.saldo,
    roupa.preco,
    roupa.tamanho
  );
  carregarLinhaRoupa();
  await window.dialog.alert(`${roupa.nome} adicionado(a) com sucesso!`);
}

async function carregarLinhaRoupa() {
  const listaRoupa = await window.buscarRoupasPreload();
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

  const calcularPreco = document.createElement("td");
  calcularPreco.textContent = roupa.preco;
  linha.appendChild(calcularPreco);

  const calcularTamanho = document.createElement("td");
  calcularTamanho.textContent = roupa.tamanho;
  linha.appendChild(calcularTamanho);

  const calcularBotao = document.createElement("td");
  const botao = document.createElement("button");
  botao.addEventListener("click", function () {
    mostrarDetalhes(
      roupa.id,
      roupa.nome,
      roupa.cor,
      roupa.saldo,
      roupa.preco,
      roupa.tamanho
    );
  });

  const icone = document.createElement("i");
  icone.setAttribute("data-lucide", "edit");
  botao.appendChild(icone);
  calcularBotao.appendChild(botao);
  linha.appendChild(calcularBotao);
  //final adiciono a linha criada com matricula,nome e botao à tabela
  tabelaRoupa.appendChild(linha);
}

function mostrarDetalhes(id, nome, cor, saldo, preco, tamanho) {
  modalIdRoupa.value = id;
  modalNomeRoupa.value = nome;
  modalCorRoupa.value = cor;
  modalSaldoRoupa.value = saldo;
  modalPreco.value = preco;
  modalTamanho.value = tamanho;
}

function limparRoupa() {
  modalIdRoupa.value = "";
  modalNomeRoupa.value = "";
  modalCorRoupa.value = "";
  modalSaldoRoupa.value = "";
  modalPreco.value = "";
  modalTamanho.value = "";
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
