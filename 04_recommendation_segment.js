db.Users.aggregate([
  { $match: { _id: "u1" } },
  {
    $lookup: {
      from: "Purchases",
      localField: "_id",
      foreignField: "user_id",
      as: "minhasCompras"
    }
  },
  {
    $addFields: {
      produtosComprados: "$minhasCompras.produto_id"
    }
  },
  {
    $lookup: {
      from: "Purchases",
      let: {
        segmentoUser: "$segmento",
        comprados: { $ifNull: ["$produtosComprados", []] }
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$user_segmento", "$$segmentoUser"] },
                { $eq: [false, { $in: ["$produto_id", "$$comprados"] }] }
              ]
            }
          }
        },
        {
          $group: {
            _id: "$produto_id",
            total_unidades: { $sum: "$quantidade" },
            numero_compras: { $sum: 1 },
            total_receita: { $sum: "$preco_total" }
          }
        },
        {
          $sort: {
            total_unidades: -1,
            numero_compras: -1,
            total_receita: -1
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
          $match: {
            "produto.quantidade_estoque": { $gt: 0 }
          }
        },
        {
          $project: {
            _id: 0,
            produto_id: "$_id",
            nome: "$produto.nome",
            categoria: "$produto.categoria",
            total_unidades: 1,
            numero_compras: 1,
            total_receita: 1
          }
        },
        { $limit: 5 }
      ],
      as: "recomendacoes_segmento"
    }
  },
  {
    $project: {
      _id: 1,
      nome: 1,
      segmento: 1,
      produtosComprados: 1,
      recomendacoes_segmento: 1
    }
  }
]);
