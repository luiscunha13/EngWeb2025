import json

with open('cinema.json') as f:
    data = json.load(f)

acc=0

map_filmes = []
map_atores = {}

map = {
    "filmes": map_filmes,
    "atores": []
}

for filme in data["filmes"]:
    filme['id'] = acc
    map_filmes.append(filme)
    acc+=1

    for ator in filme["cast"]:
        if ator not in map_atores:
            map_atores[ator] = []
        map_atores[ator].append(filme["title"])

for ator, filmes in map_atores.items():
    map["atores"].append({
        "nome": ator,
        "filmes": filmes
    })
        

with open('cinemaFormat.json', 'w') as f:
    json.dump(map, f, indent=4,ensure_ascii=False)
