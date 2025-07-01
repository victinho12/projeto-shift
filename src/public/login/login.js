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
    msg.textContent = "Senha ou nome de usuario incorreto";
    msg.style.color = "red";
  } else {
    if (retur.perfil === "adm") {
      localStorage.setItem("perfil", retur.perfil);
      await window.abrirJanela.abrirJanelaPrincipal();
    } else {
      localStorage.setItem("perfil", retur.perfil);
      await window.abrirJanela.abrirJanelaPrincipalUser();
    }
  }
}
