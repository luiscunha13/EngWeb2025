# TPC4

## 16/03/2024

## Autor
- Luís Cunha
- a104613

## Informações sobre o TPC4

O TPC4 consistia em desenvolver uma rest API (com node express relativa) a filmes que conseguia realizar várias operações:

+ GET : leitura de dados
+ PUT : atualizar dados
+ DELETE : apagar dados

Para isto foi usado um ficheiro JSON para servir de API, foi desenvolvido um servidor e foram criados templates para as diferentes páginas usando Pug.
Inicialmente foi também criado um formatador em python que modificava o ficheiro JSON. Associa um id a cada filme e para cada ator associa a lista dos filmes em que ele participou. O JSON formatado tem o nome cinemaFormat.json.


## Execução

Formatar ficheiro JSON: `python3 format.py`

Gerar API json-server: `json-server --watch alunos.json`

Executar servidor: `npm start`
