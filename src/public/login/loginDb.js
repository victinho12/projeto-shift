const db = require('../../db')

async function validarLogin(event,nome, senha) {
    console.log(event)
    const result = await db.query('select * from usuario where nome = $1 and senha = $2', [nome, senha])

    if(result.rows.length > 0 ){
        return true
    }
        return false
    
}

module.exports = {
    validarLogin
}