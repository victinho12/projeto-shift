const { Award } = require("lucide-static");
const db = require("../../db");

async function mandarParaArea(event, id, quantidade, tamanho, preco, cor) {
  try {
    await db.query(`BEGIN`);
    const resultExist = await db.query(
      `SELECT id_roupa, quantidade FROM PUBLIC.roupas_expostas where id_roupa = $1`,
      [id]
    );
    const resultExistEstoque = await db.query(
      `SELECT * FROM PUBLIC.roupas_estoque WHERE id = $1`,
      [id]
    );
    if (resultExistEstoque.rows.length === 0) {
      throw new Error("Roupa não encontrada");
    }
    if (quantidade > resultExistEstoque.rows[0].saldo) {
      throw new Error("limite atingido");
    }

    if (resultExist.rows.length === 0) {
      const resultInsert = await db.query(
        `INSERT INTO PUBLIC.roupas_expostas (id_roupa, quantidade, tamanho, preco, cor) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [id, quantidade, tamanho, preco, cor]
      );

      const resultEstoque = await db.query(
        `UPDATE PUBLIC.roupas_estoque SET saldo = saldo - $1 WHERE id = $2`,
        [quantidade, id]
      );

      await db.query(`COMMIT`);
      return { success: true, menssage: "operação feita com sucesso" };
    } else {
      const resultUpdate2 = await db.query(
        `UPDATE PUBLIC.roupas_estoque SET saldo = saldo - $2 WHERE id = $1`,
        [id, quantidade]
      );

      const resultUpdate3 = await db.query(
        `UPDATE PUBLIC.roupas_expostas SET quantidade = quantidade + $2 WHERE id_roupa = $1`,
        [id, quantidade]
      );
      await db.query(`COMMIT`);
      return { success: true, menssage: "Operação efetuada" };
    }
  } catch (error) {
    await db.query(`ROLLBACK`);
    return { success: false, menssage: `error ao realizar operação ${error}` };
  }
}

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
    "SELECT * FROM PUBLIC.roupas_estoque ORDER BY nome ASC, cor ASC, CASE tamanho WHEN 'P' THEN 1 WHEN 'M' THEN 2 WHEN 'G' THEN 3 WHEN 'GG' THEN 4 END ASC;"
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
