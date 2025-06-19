const db = require("../../db");
const { ipcMain } = require("electron");



async function atualizarRoupaDb(event, id, nome, cor, saldo, preço){
    console.log(event);
    const result = await db.query('UPDATE public.roupa SET nome= $2, cor= $3, saldo=$4, "preço"= $5 WHERE id = $1',[id,nome,cor,saldo,preço])
    return result.rows;
};


async function excluirRoupaDb(event, id) {
  console.log(event);
  const result = await db.query("DELETE FROM public.roupa WHERE id = $1",[id]);
  return result.rows;
}

async function adicionarRoupasDb(event, nome, cor, saldo, preço) {
  console.log(event);
  const result = await db.query(
    "insert into public.roupa (nome, cor, saldo, preço) values ($1, $2, $3, $4)",
    [nome, cor, saldo, preço]
  );
  return result.rows;
}

async function buscarRoupasDb() {
  const result = await db.query("select * from public.roupa order by id");

  return result.rows;
}

async function buscarRoupasPorNomeDb(event, nome) {
  const result = await db.query(`SELECT * FROM public.roupa WHERE nome ILIKE $1 ORDER BY id`,[`%${nome}%`] // usa % para buscar qualquer parte do texto
  );
  return result.rows;
}

module.exports = {
  adicionarRoupasDb,
  buscarRoupasDb,
  excluirRoupaDb,
  atualizarRoupaDb,
  buscarRoupasPorNomeDb
};
