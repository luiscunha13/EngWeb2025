# TPC1

## 12/02/2024

## Autor
- Luís Cunha
- a104613

## Informações sobre o TPC1

O TPC1 consistia em desenvolver um serviço em nodejs, que consumisse a API de dados servida pelo json-server da oficina de reparações.

Foi criado um script em python com a funcionalidade de dividir o dataset json em reparaçoes, viaturas e intervenções. Ao ser executado é gerado o dataset.json.

Script python: [dataset_script.py](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC1/dataset_script.py)

A partir do json já dividido foi possível criar a API do dataset usando o json-server.

Foi também criado um servidor em javascript que lê os dados da API e gera várias páginas web que apresentam os dados do dataset de forma organizada. Este servidor é depois executado usando nodejs.

Servidor javascript: [server.js](https://github.com/luiscunha13/EngWeb2025/tree/main/TPC1/server.js)

## Execução

Dividir json: `python3 dataset_script.py`

Gerar API json-server: `json-server --watch dataset.json`

Executar servidor com nodejs: `node server.js`