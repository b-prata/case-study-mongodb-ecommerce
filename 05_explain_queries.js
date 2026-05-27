db.Products.find({ categoria: "Roupas" })
  .sort({ avaliacao_media: -1, numero_avaliacoes: -1 })
  .explain("executionStats");

db.Purchases.find({ user_id: "u1" })
  .sort({ data_compra: -1 })
  .explain("executionStats");
