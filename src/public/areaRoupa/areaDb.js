const db = require('../../db')

async function buscarRoupaArea() {
    const result = await db.query('select roupas_expostas.id_roupa as nome, quantidade, roupas_expostas.tamanho, roupas_expostas.preco, roupas_estoque.cor from public.roupas_expostas join public.roupas_estoque on roupas_expostas.id_roupa = roupas_estoque.id order by quantidade asc ',)
    return result.rows
}


module.exports = {
    buscarRoupaArea,
}