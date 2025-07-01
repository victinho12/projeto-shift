const db = require("../../db");

async function buscarEntradaDb() {
    const retorno = await db.query('SELECT entrada.id,roupa.nome AS nome, entrada.quantidade, entrada.data_entrega FROM public.entrada JOIN public.roupa ON entrada.id_roupa = roupa.id;');
    return retorno.rows;
}

async function buscarPorNomeEntradaDb(event, nome) {
    const retorno = await db.query('select roupa.nome as nome, entrada.quantidade, entrada.data_entrega from public.entrada  join public.roupa on entrada.id_roupa = roupa.id where nome ilike $1',[`%${nome}%`])
    return retorno.rows
    
}


async function adicionarEntradaDb(event, id_roupa, quantidade, data_entrega) {
    console.log(event)
    const retorno = await db.query('INSERT INTO public.entrada (id_roupa, quantidade, data_entrega) VALUES ($1, $2, $3)',[id_roupa,quantidade, data_entrega]);
    return retorno.rows;
}

async function atualizarEntradaDb(event, id, id_roupa, quantidade, data_entrada) {
    const retorno = await db.query('UPDATE public.entrada SET id_roupa= $2 , quantidade= $3, data_entrega= $4 WHERE id = $1;',[id, id_roupa, quantidade, data_entrada]);
    return retorno.rows
}

async function deletarEntradaDb(event, id) {
    const retorno = await db.query('delete from public.entrada where id = $1',[id]);
    return retorno.rows
}



module.exports = {
    buscarEntradaDb,
    adicionarEntradaDb,
    atualizarEntradaDb,
    deletarEntradaDb,
    buscarPorNomeEntradaDb,
}

