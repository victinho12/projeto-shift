const { error } = require("jquery");
const db = require("../../db");
const { ReceiptPoundSterling, Award } = require("lucide-static");

async function buscarRoupaArea() {
  const result = await db.query(
    "select roupas_expostas.id, roupas_expostas.id_roupa ,roupas_estoque.nome as nome, quantidade, roupas_expostas.tamanho, roupas_expostas.preco, roupas_estoque.cor from public.roupas_expostas join public.roupas_estoque on roupas_expostas.id_roupa = roupas_estoque.id order by quantidade asc;"
  );
  return result.rows;
}

async function mandarParaEstoque(event, id, quantidade) {
  try {
    await db.query(`BEGIN`);
    const selectExistEstoque = await db.query(`
      SELECT * FROM PUBLIC.roupas_estoque WHERE id = $1
      `,[id]
    );
    const selectExistExpostas = await db.query(
      `SELECT * FROM PUBLIC.roupas_expostas WHERE id_roupa = $1`,
      [id]
    );
    if(selectExistExpostas.rows.length === 0){
      throw new Error("roupa inexistente");
    };
    if(selectExistExpostas.rows[0].quantidade < quantidade){
      throw new Error("selecione uma quantidade valida para mando de volta para o estoque")
    }

    const resultUpdate = await db.query(
      `UPDATE PUBLIC.roupas_expostas SET quantidade = quantidade - $2 WHERE id_roupa = $1`,
      [id, quantidade]
    );
    const resultUpdate2 = await db.query(
      `UPDATE PUBLIC.roupas_estoque SET saldo = saldo + $2 WHERE id = $1`,
      [id, quantidade]
    );


    await db.query(`COMMIT`);
    return{success: true, menssage: "Operação feita com succeso."}
  } catch (error) {
    await db.query(`ROLLBACK`);
    return {
      success: false,
      menssage: `não foi possivel efetuar a operação ${error}`,
    };
  }
}

async function venderRoupa(params) {}

module.exports = {
  buscarRoupaArea,
  mandarParaEstoque,
};
