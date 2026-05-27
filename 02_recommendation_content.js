db.Users.aggregate([
  { $match: { _id: "u1" } },
  {
    $lookup: {
      from: "Purchases",
      localField: "_id",
      foreignField: "user_id",
      as: "compras"
    }
  },
  {
    $addFields: {
      produtosComprados: "$compras.produto_id"
    }
  },
  {
    $lookup: {
      from: "Products",
      let: {
        comprados: { $ifNull: ["$produtosComprados", []] },
        preferenciasUser: { $ifNull: ["$preferencias", []] }
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$categoria", "$$preferenciasUser"] },
                { $eq: [false, { $in: ["$_id", "$$comprados"] }] },
                { $gt: ["$quantidade_estoque", 0] }
              ]
            }
          }
        },
        { $sort: { avaliacao_media: -1, numero_avaliacoes: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 1,
            nome: 1,
            categoria: 1,
            preco: 1,
            marca: 1,
            quantidade_estoque: 1,
            avaliacao_media: 1,
            numero_avaliacoes: 1
          }
        }
      ],
      as: "recomendacoes"
    }
  },
  {
    $project: {
      _id: 1,
      nome: 1,
      preferencias: 1,
      produtosComprados: 1,
      recomendacoes: 1
    }
  }
]).pretty();
