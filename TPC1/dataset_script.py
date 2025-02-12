import json
import os
import shutil

def open_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data;

def new_file(filename, content):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(content, f, ensure_ascii=False, indent=4)


map_reparacoes = []
map_viaturas = []
map_intervencoes = []

map = {
    "reparacoes": map_reparacoes,
    "viaturas": map_viaturas,
    "intervencoes": map_intervencoes
}

json_obj = open_json('dataset_reparacoes.json')
for reparacao in json_obj['reparacoes']:
    map_reparacoes.append(reparacao)
    map_viaturas.append(reparacao['viatura'])

    for intervencao in reparacao['intervencoes']:
        if(intervencao not in map_intervencoes):
            map_intervencoes.append(intervencao)

new_file('dataset.json', map)