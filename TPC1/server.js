const http = require('http');
const axios = require('axios');

http.createServer((req, res) => {
    console.log("Method: " + req.method);
    console.log("Url: " + req.url);
    
    switch(req.method){
        case "GET":
            if(req.url === "/"){    
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                res.write("<h1>Oficina</h1>");
                res.write("<ul>");
                res.write('<li><a href="/reparacoes">Reparações</a></li>');
                res.write('<li><a href="/viaturas">Viaturas</a></li>');
                res.write('<li><a href="/intervencoes">Intervenções</a></li>');
                res.write("</ul>");
                res.end();
            }
            else if(req.url === "/reparacoes"){
                axios.get('http://localhost:3000/reparacoes?_sort=nome')
                    .then(result => {
                        var reparacoes = result.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<h1>Reparações</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='reparacoes/${element.nif}'>${element.nome}</a></li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url.match(/\/reparacoes\/.+/)){
                var nif = req.url.split("/")[2]

                axios.get(`http://localhost:3000/reparacoes?nif=${nif}`)
                        .then(result => {
                            var reparacao = result.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<h1>Reparacao</h1>`)
                            res.write(`<pre>Nome: ${reparacao.nome}</pre>`)
                            res.write(`<pre>Nif: ${reparacao.nif}</pre>`)
                            res.write(`<pre>Data: ${reparacao.data}</pre>`)
                            res.write("<h6><a href='/intervencoes'>Voltar</a></h6>")
                            res.end()

                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()
                        })
            }
            else if(req.url === "/viaturas"){
                axios.get('http://localhost:3000/viaturas')
                    .then(response => {
                        var viaturas = response.data
                        const mapMarcas = new Map();
         
                        for (const viatura of viaturas) {
                            if (!mapMarcas.has(viatura.marca)) {
                                mapMarcas.set(viatura.marca, []);
                            }
                            mapMarcas.get(viatura.marca).push(viatura.modelo);
                        }

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(`<h1>Viaturas</h1>`)
                        map
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                    })
                    .catch(error => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url === "/intervencoes"){
                axios.get('http://localhost:3000/intervencoes?_sort=codigo')
                    .then(result => {
                        var reparacoes = result.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<h1>Intervenções</h1>")
                        res.write("<ul>")
                        reparacoes.forEach(element => {
                            res.write(`<li><a href='intervencoes/${element.codigo}'>${element.codigo}</a></li>`)
                        })
                        res.write("</ul>")
                        res.write("<h6><a href='/'>Voltar</a></h6>")
                        res.end()
                    })
                    .catch(err => {
                        res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                        console.log(err)
                        res.end()
                    });
            }
            else if(req.url.match(/\/intervencoes\/.+/)){
                var codigo = req.url.split("/")[2]

                axios.get(`http://localhost:3000/intervencoes?codigo=${codigo}`)
                        .then(result => {
                            var intervencao = result.data[0]
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<h1>${intervencao.codigo}</h1>`)
                            res.write(`<pre>Nome: ${intervencao.nome}</pre>`)
                            res.write(`<pre>Descrição: ${intervencao.descricao}</pre>`)
                            res.write("<h6><a href='/intervencoes'>Voltar</a></h6>")
                            res.end()

                        })
                        .catch(err => {
                            res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                            console.log(err)
                            res.end()
                        })
            }
            break;
        
        default : 
            res.writeHead(405, {'Content-Type': 'text/html;charset=utf-8'})
            res.end()
            break;    
    }



}).listen(1234);

console.log('Server running at http://localhost:1234/');