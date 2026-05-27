db.Purchases.createIndex({ user_id: 1, data_compra: -1 });
db.Purchases.createIndex({ produto_id: 1 });
db.Purchases.createIndex({ user_segmento: 1, produto_id: 1 });

db.Products.createIndex({ categoria: 1, avaliacao_media: -1, numero_avaliacoes: -1 });
db.Products.createIndex({ tags: 1 });

db.Users.createIndex({ preferencias: 1 });
db.Users.createIndex({ segmento: 1 });
