const { error } = require("jquery");
const db = require("../../db");
const { ReceiptPoundSterling } = require("lucide-static");

async function buscarRoupaArea() {
  const result = await db.query(
    "select roupas_expostas.id, roupas_expostas.id_roupa ,roupas_estoque.nome as nome, quantidade, roupas_expostas.tamanho, roupas_expostas.preco, roupas_estoque.cor from public.roupas_expostas join public.roupas_estoque on roupas_expostas.id_roupa = roupas_estoque.id order by quantidade asc "
  );
  return result.rows;
}

async function mandarParaEstoque(event, id, quantidade) {
  try {
    await db.query("BEGIN");

    // 1. Subtrai da área de vendas
    const res1 = await db.query(
      `UPDATE public.roupas_expostas
       SET quantidade = quantidade - $2
       WHERE id_roupa = $1 AND quantidade >= $2;`,
      [id, quantidade]
    );

    if (res1.rowCount === 0) {
      throw new Error("Quantidade insuficiente na área de vendas ou item não encontrado.");
    }

    // 2. Adiciona no estoque (insere ou atualiza)
    await db.query(
      `INSERT INTO public.roupas_estoque (id, nome, cor, saldo, preco, tamanho)
       SELECT 
         e.id_roupa, 
         r.nome, 
         r.cor, 
         $2, 
         r.preco, 
         e.tamanho
       FROM public.roupas_expostas e
       JOIN public.roupas_estoque r ON r.id = e.id_roupa
       WHERE e.id_roupa = $1
       ON CONFLICT (id)
       DO UPDATE SET saldo = public.roupas_estoque.saldo + EXCLUDED.saldo;`,
      [id, quantidade]
    );

    await db.query("COMMIT");
    return { success: true };
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Erro ao mandar para estoque:", error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  buscarRoupaArea,
  mandarParaEstoque,
};
