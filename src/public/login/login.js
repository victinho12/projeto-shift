const nome = document.getElementById("nome");
const senha = document.getElementById("senha");
const botao = document.getElementById("btn-entrar");
const msg = document.getElementById("msg");

botao.addEventListener("click", verificarlogin);

async function verificarlogin() {
  const retur = await window.shiftAPI.validarLoginPreload(
    nome.value,
    senha.value
  );
  if (!retur) {
    await window.dialog.alert("Preencha todas as informações");
  } else {
    if (retur.perfil === "adm") {
      localStorage.setItem("perfil", retur.perfil);
      localStorage.setItem("nome", retur.nome);
      await window.dialog.alert("Entrando");
      await window.abrirJanela.abrirJanelaPrincipal();
    } else {
      localStorage.setItem("perfil", retur.perfil);
      localStorage.setItem("nome", retur.nome);
      await window.abrirJanela.abrirJanelaPrincipalUser();
    }
  }
}
