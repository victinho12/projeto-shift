const db = require("../../db");

async function mandarParaArea(event, id, quantidade) {
  const limiteArea = 20;
  const resultado = await db.query(
    `select COALESCE(sum(quantidade), 0) as total from public.roupas_expostas where id_roupa = $1`,
    [id]
  );

  // if (resultado.rows[0].total + quantidade <= limiteArea) {
  try {
    await db.query("BEGIN");

    // 1. Subtrai do estoque
    const res1 = await db.query(
      `UPDATE public.roupas_estoque
       SET saldo = saldo - $2
       WHERE id = $1 AND saldo >= $2;`,
      [id, quantidade]
    );

    if (res1.rowCount === 0) {
      throw new Error("Estoque insuficiente ou item não encontrado.");
    }

    // 2. Atualiza quantidade na área de vendas
    await db.query(
      `UPDATE public.roupas_expostas
       SET quantidade = quantidade + $2
       WHERE id_roupa = $1;`,
      [id, quantidade]
    );

    // 3. Insere se ainda não existe
    await db.query(
      `INSERT INTO public.roupas_expostas (id_roupa, quantidade, tamanho, preco, cor)
       SELECT e.id, $2, e.tamanho, e.preco, e.cor
       FROM public.roupas_estoque e
       WHERE e.id = $1
         AND NOT EXISTS (
           SELECT 1 FROM public.roupas_expostas r WHERE r.id_roupa = e.id
         );`,
      [id, quantidade]
    );

    await db.query("COMMIT");
    return { success: true };
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Erro ao transferir:", error.message);
    return { success: false, error: error.message };
  }
} //else {
//   return { success: false, error: "limite de roupas em area atingida" };
//}


async function atualizarRoupaDb(event, id, nome, cor, saldo, preço, tamanho) {
  console.log(event);
  const result = await db.query(
    "UPDATE public.roupas_estoque SET nome= $2, cor= $3, saldo=$4, preco= $5, tamanho = $6 WHERE id = $1",
    [id, nome, cor, saldo, preço, tamanho]
  );
  return result.rows;
}

async function excluirRoupaDb(event, id) {
  console.log(event);
  const result = await db.query(
    "DELETE FROM public.roupas_estoque WHERE id = $1",
    [id]
  );
  return result.rows;
}

async function adicionarRoupasDb(event, nome, cor, saldo, preço, tamanho) {
  console.log(event);
  const result = await db.query(
    "insert into public.roupas_estoque (nome, cor, saldo, preco, tamanho) values ($1, $2, $3, $4, $5)",
    [nome, cor, saldo, preço, tamanho]
  );
  return result.rows;
}

async function buscarRoupasDb() {
  const result = await db.query(
    "select * from public.roupas_estoque order by id"
  );

  return result.rows;
}
async function buscarAreaDbRoupas() {
  const result = await db.query(
    "select * from public.roupas_estoque order by id"
  );

  return result.rows;
}

async function buscarRoupasPorNomeDb(event, nome) {
  const result = await db.query(
    `SELECT * FROM public.roupas_estoque WHERE nome ILIKE $1 ORDER BY id`,
    [`%${nome}%`] // usa % para buscar qualquer parte do texto
  );
  return result.rows;
}

module.exports = {
  adicionarRoupasDb,
  buscarRoupasDb,
  excluirRoupaDb,
  atualizarRoupaDb,
  buscarRoupasPorNomeDb,
  mandarParaArea,
  buscarAreaDbRoupas,
};
