# Case Study MongoDB — E-commerce e Recomendações

Este repositório contém a solução para o case study de Administração da Informação sobre modelação de dados e recomendações em MongoDB.

## Objetivo
Implementar uma solução MongoDB para um cenário de e-commerce com produtos, utilizadores e compras, incluindo:
- recomendação personalizada baseada em preferências;
- recomendação por popularidade global;
- recomendação por segmento;
- criação de índices;
- análise com `explain("executionStats")`.

## Estrutura

```text
case-study-mongodb-ecommerce/
├── README.md
├── scripts/
│   ├── 01_create_indexes.js
│   ├── 02_recommendation_content.js
│   ├── 03_recommendation_popularity.js
│   ├── 04_recommendation_segment.js
│   └── 05_explain_queries.js
├── data/
│   ├── products-2.json
│   ├── users-4.json
│   └── purchases-3.json
└── docs/
    └── relatorio_case_study_mongodb.md
```

## Coleções

- `Products`
- `Users`
- `Purchases`

## Importação dos dados

```bash
mongoimport --db E-commerceDB --collection Products --file data/products-2.json --jsonArray
mongoimport --db E-commerceDB --collection Users --file data/users-4.json --jsonArray
mongoimport --db E-commerceDB --collection Purchases --file data/purchases-3.json --jsonArray
```

## Execução no mongosh

```bash
mongosh
use E-commerceDB
load("scripts/01_create_indexes.js")
load("scripts/02_recommendation_content.js")
load("scripts/03_recommendation_popularity.js")
load("scripts/04_recommendation_segment.js")
load("scripts/05_explain_queries.js")
```

## Ordem sugerida de execução

1. Importar os dados.
2. Criar os índices.
3. Testar a recomendação personalizada.
4. Testar a recomendação por popularidade global.
5. Testar a recomendação por segmento.
6. Executar as queries com `explain`.
7. Consultar o relatório em `docs/`.

## Resultados esperados

- A recomendação personalizada deve devolver produtos das preferências do utilizador, excluindo os já comprados.
- A recomendação por popularidade global deve devolver os produtos mais comprados em toda a plataforma.
- A recomendação por segmento deve devolver produtos populares entre utilizadores do mesmo segmento.

## Relatório

O relatório final encontra-se em `docs/relatorio_case_study_mongodb.md`.
