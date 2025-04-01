# Prova de Aferição

## Persistência de Dados:

Com o ficheiro JSON dado foi necessário efetuar várias alterações para que ele pudesse ser usado no mongoDB: 
  - **Correção do JSON**: Foi necessário adicionar o caractere `]` no final do ficheiro, que estava faltando para completar a estrutura JSON.
- **Alteração do campo `bookId`**: O campo `bookId` foi alterado para `_id`, para que seja utilizado como identificador único no MongoDB.
- **Conversão de Listas**: Campos que contêm listas representadas como `string` foram convertidos para o formato JSON, garantindo a correta estrutura de dados.
- **Conversão de Tipos Numéricos**: Os números representados como `string` foram convertidos para os tipos `int` ou `float`, conforme apropriado.
- **Separação de Autores**: Os nomes dos autores foram separados por vírgulas, exceto nos casos onde as vírgulas estavam dentro de parênteses.

Essas modificações foram necessárias para que os dados fossem corretamente importados e manipulados no MongoDB.


## Setup da Base de Dados

Para configurar a base de dados MongoDB e importar o ficheiro JSON para a coleção, foram utilizados os seguintes comandos Docker:

```bash
  docker start mongoEW 
  docker cp books.json mongoEW:/tmp
  docker exec -it mongoEW sh
  mongoimport -d livros -c livros /tmp/books.json --jsonArray
  mongosh
  show dbs
  use livros
```

Estes comandos fazem o seguinte:

1. Iniciar o conteiner Docker que contém o MongoDB.
2. Copiar o ficheiro books.json para o contêiner.
3. Entrar no contêiner para rodar os comandos MongoDB.
4. Importar o JSON para a base de dados livros e coleção livros.
5. Verificar se a base de dados foi criada e selecionada.

## Executar Aplicações

#### Inicializar docker:
Primeiramente, é necessário garantir que o Docker esteja em execução. Usar o comando abaixo para iniciar o conteiner MongoDB:

```bash
  docker start mongoEW
```
#### Inicializar API:
Navegar até à pasta onde está o código da API.

```bash
  npm i #instalar as depêndências se for necessário
  npm start
```

Estes comandos fazem o seguinte:
1. Instalar as dependências se necessário
2. Iniciar a API

#### Inicializar Interface:
Navegar até à pasta onde está o código da API.

```bash
  npm i #instalar as depêndências se for necessário
  npm start
```
Estes comandos fazem o seguinte:
1. Instalar as dependências se necessário
2. Iniciar a API
