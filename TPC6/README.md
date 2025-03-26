# TPC6

## 26/03/2024

## Autor
- Luís Cunha
- a104613

## Informações sobre o TPC6

O TPC6 consistia em desenvolver uma API de dados que responda aos seguintes pedidos:

    - GET /contratos: devolve uma lista com todos os registos;
    - GET /contratos/:id: devolve o registo com identificador id (corresponde ao idcontrato);
    - GET /contratos?entidade=EEEE: devolve a lista dos contratos correspondentes à entidade EEEE;
    - GET /contratos?tipo=AAA: devolve a lista dos contratos com tipo de procedimento igual a AAA;
    - GET /contratos/entidades: devolve a lista de entidades comunicantes ordenadaalfabeticamente e sem repetições;
    - GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
    - POST /contratos: acrescenta um registo novo à BD;
    - DELETE /contratos/:id: elimina da BD o registo com o identificador id;
    - PUT /contratos/:id: altera o registo com o identificador id.

Com a API desenvolvida era necessário desenvolver uma interface com as seguintes características:

    No endereço http://localhost:16001 deve-se obter a página principal constituída por:
        - Um cabeçalho com metainformação à tua escolha;
        - Uma tabela contendo a lista de registos, um por linha, com os campos: idcontrato, objectoContrato, dataCelebracaoContrato, precoContratual, NIPC_entidade_comunicante, entidade_comunicante;
        - O campo idcontrato deverá ser um link para a página do contrato com esse identificador;
        - O campo NIPC_entidade_comunicante deverá ser um link para a página dessa entidade.

    No endereço http://localhost:16001/:id deverás obter a página do contrato cujo identificador foi passado na rota:
        - Esta página deverá conter todos os campos do contrato e um link para voltar à página principal.

    No endereço http://localhost:16001/entidades/:nipc deve-se obter a página da entidade cujo NIPC_entidade_comunicante corresponde ao parâmetro passado na rota :
        - Na página de cada entidade deverá constar este identificador e o respetivo nome da entidade;
        - Uma tabela com a lista de contratos dessa entidade (tabela com estrutura semelhante à da página principal);
        - O somatório do valor dos contratos;
        - E um link para voltar à página principal.

API de dados: [apiContratos](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC6/apiContratos)
Interface: [interfaceContratos](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC6/interfaceContratos)

## Execução

Executar container do docker: `docker start mongoEW`

Executar API: `npm start`

Executar interface: `npm start`
