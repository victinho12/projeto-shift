const db = require("../../db");

async function buscarEntradaDb() {
    const retorno = await db.query('SELECT roupa.nome AS nome, entrada.quantidade, entrada.data_entrega FROM public.entrada JOIN public.roupa ON entrada.id_roupa = roupa.id;')
    return retorno.rows
}

module.exports = {
    buscarEntradaDb,
}

