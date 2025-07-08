const nome = localStorage.getItem('nome')
const perfil = localStorage.getItem('perfil')
new Notification ('SHIFT STORY', {
    body: `Seja bem vindo ${nome} vc está como ${perfil}`
})