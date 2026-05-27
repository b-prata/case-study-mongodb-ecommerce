db.Purchases.aggregate([
  {
    $group: {
      _id: "$produto_id",
      total_unidades_vendidas: { $sum: "$quantidade" },
      total_receita: { $sum: "$preco_total" },
      numero_compras: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "Products",
      localField: "_id",
      foreignField: "_id",
      as: "produto"
    }
  },
  { $unwind: "$produto" },
  {
    $sort: {
      total_unidades_vendidas: -1,
      total_receita: -1
    }
  },
  {
    $project: {
      _id: 0,
      produto_id: "$_id",
      nome: "$produto.nome",
      categoria: "$produto.categoria",
      total_unidades_vendidas: 1,
      total_receita: 1,
      numero_compras: 1
    }
  },
  { $limit: 5 }
]);
