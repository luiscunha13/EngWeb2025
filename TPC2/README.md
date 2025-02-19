# TPC2

## 19/02/2024

## Autor
- Luís Cunha
- a104613

## Informações sobre o TPC2

O TPC1 consistia em desenvolver um serviço em nodejs, que consumisse a API de dados servida pelo json-server da escola de música e servir um website com as seguintes funcionalidades:

- Página principal: Listar alunos, Listar Cursos, Listar Instrumentos;

- Página de alunos: Tabela com a informação dos alunos (clicando numa linha deve saltar-se para a página de aluno);

- Página de cursos: Tabela com a informação dos cursos (clicando numa linha deve saltar-se para a página do curso onde deverá aparecer a lista de alunos a frequentá-lo);

- Página de instrumentos: Tabela com a informação dos instrumentos (clicando numa linha deve saltar-se para a página do instrumento onde deverá aparecer a lista de alunos que o tocam).


Foi criado um servidor em javascript que lê os dados da API e invoca a geração páginas web que apresentam os dados do dataset de forma organizada. 
Foi também criado um ficheiro javascript com as funções responsáveis por gerar as páginas web em html usando a framework w3.css
O servidor é executado usando nodejs.

Servidor javascript: [escola-servidor.js](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC2/escola-servidor.js)
Gerador de páginas web: [mypages.js](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC2/mypages.js)


## Execução

Gerar API json-server: `json-server --watch db.json`

Executar servidor com nodejs: `node escola-servidor.js`