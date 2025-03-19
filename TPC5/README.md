# TPC5

## 19/03/2024

## Autor
- Luís Cunha
- a104613

## Informações sobre o TPC5

O TPC5 consistia em desenvolver uma app web com 3 servidores:

    - MongoDB com a base de dados (alunos.json);
    - API de dados feita em Javascript usando o mongoose;
    - Interface web gerada com o express e usando templates PUG (apenas operações CRUD).

Operações CRUD:

    + GET : ler dados
    + POST : adicionar dados
    + PUT : atualizar dados
    + DELETE : apagar dados


## Execução

Executar container do docker: `docker start mongoEW`

Executar servidor: `npm start`
